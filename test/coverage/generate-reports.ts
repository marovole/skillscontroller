#!/usr/bin/env node
/**
 * Test Report Generator
 *
 * Runs all tests and generates comprehensive coverage reports:
 * - Skill activation matrix
 * - Intent detection accuracy
 * - Test execution summary
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { createMCPTestServer } from "../helpers/mcp-test-server.js";
import { IntentType, type IntentTypeValue } from "../fixtures/test-queries.js";
import { SKILL_TEST_DATA } from "../fixtures/skill-test-data.js";
import {
  generateSkillMatrixReport,
  formatSkillMatrixReport,
  formatSkillMatrixAsCSV,
} from "./skill-matrix-reporter.js";
import {
  generateIntentAccuracyReport,
  formatIntentAccuracyReport,
  formatIntentAccuracyAsCSV,
  type IntentTestResult,
} from "./intent-accuracy-reporter.js";

/**
 * Run comprehensive test suite and generate reports
 */
async function generateReports() {
  console.log("🧪 Running Skills Controller Test Suite...\n");

  const server = createMCPTestServer("report-generation");
  const testResults: Array<{
    query: string;
    detectedIntent: IntentTypeValue;
    activatedSkills: string[];
  }> = [];
  const intentResults: IntentTestResult[] = [];

  // Test all skill triggers
  console.log("📋 Testing skill triggers...");
  for (const [skillName, skillData] of Object.entries(SKILL_TEST_DATA)) {
    const allTriggers = [...skillData.triggers.zh, ...skillData.triggers.en];

    for (const trigger of allTriggers) {
      const response = await server.callTool({
        name: "analyze_and_route",
        arguments: {
          user_message: trigger,
          max_skills: 10,
        },
      });

      const result = JSON.parse(response.content[0].text);
      const locale = /[^\u0000-\u007F]/.test(trigger) ? "zh" : "en";

      testResults.push({
        query: trigger,
        detectedIntent: result.detected_intent,
        activatedSkills: result.activated_skills?.map((s: any) => s.name) || [],
      });

      intentResults.push({
        query: trigger,
        locale,
        expectedIntent: skillData.expectedIntent as IntentTypeValue,
        detectedIntent: result.detected_intent,
        correct: result.detected_intent === skillData.expectedIntent,
      });
    }

    // Clear session between tests
    server.clearSession();
  }

  // Test additional query patterns from test-queries
  console.log("📋 Testing intent patterns...");

  // Generate skill matrix report
  console.log("\n📊 Generating skill matrix report...");
  const skillMatrixReport = generateSkillMatrixReport(testResults);

  const reportDir = join(process.cwd(), "test-reports");
  mkdirSync(reportDir, { recursive: true });

  writeFileSync(
    join(reportDir, "skill-matrix.txt"),
    formatSkillMatrixReport(skillMatrixReport),
    "utf-8"
  );

  writeFileSync(
    join(reportDir, "skill-matrix.csv"),
    formatSkillMatrixAsCSV(skillMatrixReport),
    "utf-8"
  );

  console.log(`  ✅ Skill matrix: ${join(reportDir, "skill-matrix.txt")}`);
  console.log(`  ✅ Skill matrix CSV: ${join(reportDir, "skill-matrix.csv")}`);

  // Generate intent accuracy report
  console.log("\n📊 Generating intent accuracy report...");
  const intentAccuracyReport = generateIntentAccuracyReport(intentResults);

  writeFileSync(
    join(reportDir, "intent-accuracy.txt"),
    formatIntentAccuracyReport(intentAccuracyReport),
    "utf-8"
  );

  writeFileSync(
    join(reportDir, "intent-accuracy.csv"),
    formatIntentAccuracyAsCSV(intentAccuracyReport),
    "utf-8"
  );

  console.log(`  ✅ Intent accuracy: ${join(reportDir, "intent-accuracy.txt")}`);
  console.log(`  ✅ Intent accuracy CSV: ${join(reportDir, "intent-accuracy.csv")}`);

  // Print summary
  console.log("\n" + "=".repeat(80));
  console.log("TEST REPORT SUMMARY");
  console.log("=".repeat(80));
  console.log(`Total Test Cases: ${testResults.length}`);
  console.log(`Skills Tested: ${Object.keys(SKILL_TEST_DATA).length}`);
  console.log(`Skill Coverage: ${skillMatrixReport.overallCoverage.toFixed(2)}%`);
  console.log(`Intent Accuracy: ${intentAccuracyReport.overallAccuracy.toFixed(2)}%`);
  console.log(`Chinese Accuracy: ${intentAccuracyReport.byLanguage.zh.accuracy.toFixed(2)}%`);
  console.log(`English Accuracy: ${intentAccuracyReport.byLanguage.en.accuracy.toFixed(2)}%`);
  console.log("=".repeat(80));
  console.log(`\n📁 Reports saved to: ${reportDir}`);
}

// Run the report generation
generateReports().catch(console.error);
