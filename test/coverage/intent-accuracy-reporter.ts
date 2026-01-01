/**
 * Intent Accuracy Reporter
 *
 * Generates detailed reports on intent detection accuracy:
 * - Per-intent accuracy metrics
 * - Language-based accuracy (zh vs en)
 * - Confusion matrix showing misclassifications
 * - Precision, recall, and F1 scores
 */

import type { IntentType } from "../fixtures/test-queries.js";

export interface IntentTestResult {
  query: string;
  locale: "zh" | "en";
  expectedIntent: IntentType;
  detectedIntent: IntentType;
  confidence?: number;
  correct: boolean;
}

export interface IntentMetrics {
  intent: IntentType;
  total: number;
  correct: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  falsePositives: number;
  falseNegatives: number;
}

export interface IntentConfusionMatrix {
  expected: IntentType;
  detected: IntentType;
  count: number;
}

export interface IntentAccuracyReport {
  totalTests: number;
  totalCorrect: number;
  overallAccuracy: number;
  byLanguage: {
    locale: "zh" | "en";
    total: number;
    correct: number;
    accuracy: number;
  };
  byIntent: IntentMetrics[];
  confusionMatrix: IntentConfusionMatrix[];
  timestamp: string;
}

/**
 * Generate intent accuracy report
 */
export function generateIntentAccuracyReport(
  testResults: IntentTestResult[]
): IntentAccuracyReport {
  const allIntents = new Set<IntentType>();
  for (const result of testResults) {
    allIntents.add(result.expectedIntent);
  }

  const totalTests = testResults.length;
  const totalCorrect = testResults.filter(r => r.correct).length;

  // Calculate per-language metrics
  const zhTests = testResults.filter(r => r.locale === "zh");
  const enTests = testResults.filter(r => r.locale === "en");

  const byLanguage = {
    zh: {
      locale: "zh" as const,
      total: zhTests.length,
      correct: zhTests.filter(r => r.correct).length,
      accuracy: zhTests.length > 0 ? (zhTests.filter(r => r.correct).length / zhTests.length) * 100 : 0,
    },
    en: {
      locale: "en" as const,
      total: enTests.length,
      correct: enTests.filter(r => r.correct).length,
      accuracy: enTests.length > 0 ? (enTests.filter(r => r.correct).length / enTests.length) * 100 : 0,
    },
  };

  // Calculate per-intent metrics
  const byIntent: IntentMetrics[] = [];

  for (const intent of allIntents) {
    const intentTests = testResults.filter(r => r.expectedIntent === intent);
    const correct = intentTests.filter(r => r.correct).length;

    // True positives: correctly identified as this intent
    const truePositives = correct;

    // False positives: incorrectly identified as this intent
    const falsePositives = testResults.filter(
      r => r.detectedIntent === intent && r.expectedIntent !== intent
    ).length;

    // False negatives: this intent but identified as something else
    const falseNegatives = intentTests.filter(r => !r.correct).length;

    const precision = (truePositives + falsePositives) > 0
      ? (truePositives / (truePositives + falsePositives)) * 100
      : 0;

    const recall = (truePositives + falseNegatives) > 0
      ? (truePositives / (truePositives + falseNegatives)) * 100
      : 0;

    const f1Score = (precision + recall) > 0
      ? (2 * precision * recall) / (precision + recall)
      : 0;

    byIntent.push({
      intent,
      total: intentTests.length,
      correct,
      accuracy: intentTests.length > 0 ? (correct / intentTests.length) * 100 : 0,
      precision,
      recall,
      f1Score,
      falsePositives,
      falseNegatives,
    });
  }

  // Generate confusion matrix
  const confusionMap = new Map<string, number>();
  for (const result of testResults) {
    if (!result.correct) {
      const key = `${result.expectedIntent} -> ${result.detectedIntent}`;
      confusionMap.set(key, (confusionMap.get(key) || 0) + 1);
    }
  }

  const confusionMatrix: IntentConfusionMatrix[] = [];
  for (const [key, count] of confusionMap.entries()) {
    const [expected, detected] = key.split(" -> ") as [IntentType, IntentType];
    confusionMatrix.push({ expected, detected, count });
  }

  return {
    totalTests,
    totalCorrect,
    overallAccuracy: totalTests > 0 ? (totalCorrect / totalTests) * 100 : 0,
    byLanguage: {
      zh: byLanguage.zh,
      en: byLanguage.en,
    },
    byIntent,
    confusionMatrix,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Format intent accuracy report as text
 */
export function formatIntentAccuracyReport(report: IntentAccuracyReport): string {
  const lines: string[] = [];

  lines.push("=".repeat(80));
  lines.push("INTENT DETECTION ACCURACY REPORT");
  lines.push("=".repeat(80));
  lines.push(`Generated: ${report.timestamp}`);
  lines.push(`Total Tests: ${report.totalTests}`);
  lines.push(`Total Correct: ${report.totalCorrect}`);
  lines.push(`Overall Accuracy: ${report.overallAccuracy.toFixed(2)}%`);
  lines.push("");

  // Language breakdown
  lines.push("-".repeat(80));
  lines.push("Accuracy by Language");
  lines.push("-".repeat(80));
  lines.push(`Chinese (zh):  ${report.byLanguage.zh.accuracy.toFixed(2)}% (${report.byLanguage.zh.correct}/${report.byLanguage.zh.total})`);
  lines.push(`English (en):  ${report.byLanguage.en.accuracy.toFixed(2)}% (${report.byLanguage.en.correct}/${report.byLanguage.en.total})`);
  lines.push("");

  // Per-intent metrics
  lines.push("-".repeat(80));
  lines.push("Per-Intent Metrics");
  lines.push("-".repeat(80));
  lines.push(sprintf("%-20s %8s %8s %8s %8s %8s %8s",
    "Intent", "Total", "Correct", "Accuracy", "Precision", "Recall", "F1 Score"));
  lines.push("-".repeat(80));

  for (const metrics of report.byIntent.sort((a, b) => b.accuracy - a.accuracy)) {
    lines.push(sprintf("%-20s %8d %8d %7.2f%% %7.2f%% %7.2f%% %7.2f%%",
      metrics.intent,
      metrics.total,
      metrics.correct,
      metrics.accuracy,
      metrics.precision,
      metrics.recall,
      metrics.f1Score
    ));
  }
  lines.push("");

  // Confusion matrix
  if (report.confusionMatrix.length > 0) {
    lines.push("-".repeat(80));
    lines.push("Confusion Matrix (Misclassifications)");
    lines.push("-".repeat(80));

    for (const entry of report.confusionMatrix.sort((a, b) => b.count - a.count)) {
      lines.push(`  ${entry.expected} -> ${entry.detected}: ${entry.count} times`);
    }
    lines.push("");
  }

  lines.push("=".repeat(80));
  return lines.join("\n");
}

/**
 * Format intent accuracy report as CSV
 */
export function formatIntentAccuracyAsCSV(report: IntentAccuracyReport): string {
  const headers = ["Intent", "Total", "Correct", "Accuracy %", "Precision %", "Recall %", "F1 Score"];
  const rows: string[][] = [headers];

  for (const metrics of report.byIntent) {
    rows.push([
      metrics.intent,
      metrics.total.toString(),
      metrics.correct.toString(),
      metrics.accuracy.toFixed(2),
      metrics.precision.toFixed(2),
      metrics.recall.toFixed(2),
      metrics.f1Score.toFixed(2),
    ]);
  }

  return rows.map(row => row.join(",")).join("\n");
}

/**
 * Simple sprintf implementation for formatting
 */
function sprintf(format: string, ...args: (string | number)[]): string {
  return format.replace(/%[-+0-9]*\.?[0-9]*[sd%]/g, (match) => {
    const arg = args.shift();
    if (match === "%s") return String(arg);
    if (match === "%d") return String(Math.floor(Number(arg)));
    if (match.includes(".")) {
      const precision = parseInt(match.split(".")[1] || "0");
      return Number(arg).toFixed(precision);
    }
    return String(arg);
  });
}
