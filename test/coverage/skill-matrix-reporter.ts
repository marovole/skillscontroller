/**
 * Skill Matrix Reporter
 *
 * Generates a comprehensive skill activation matrix showing:
 * - Which skills are triggered by which queries
 * - Trigger word coverage for each skill
 * - Intent matching accuracy
 * - Category-based grouping
 */

import type { IntentType } from "../fixtures/test-queries.js";
import { SKILL_TEST_DATA, getAllSkillNames, getSkillCategories } from "../fixtures/skill-test-data.js";

export interface SkillMatrixResult {
  skillName: string;
  category: string;
  triggerTests: {
    trigger: string;
    matched: boolean;
    intent: string;
  }[];
  coverage: number; // Percentage of triggers that matched
  totalTriggers: number;
  matchedTriggers: number;
}

export interface SkillMatrixReport {
  totalSkills: number;
  totalTestCases: number;
  overallCoverage: number;
  byCategory: {
    category: string;
    skills: SkillMatrixResult[];
    coverage: number;
  }[];
  timestamp: string;
}

/**
 * Generate skill activation matrix
 */
export function generateSkillMatrixReport(
  testResults: Array<{
    query: string;
    detectedIntent: IntentType;
    activatedSkills: string[];
  }>
): SkillMatrixReport {
  const allSkills = getAllSkillNames();
  const categories = getSkillCategories();

  const byCategory: SkillMatrixReport["byCategory"] = [];

  for (const category of categories) {
    const categorySkills = allSkills.filter(skill =>
      SKILL_TEST_DATA[skill]?.category === category
    );

    const skills: SkillMatrixResult[] = [];

    for (const skillName of categorySkills) {
      const skillData = SKILL_TEST_DATA[skillName];
      if (!skillData) continue;

      const allTriggers = [...skillData.triggers.zh, ...skillData.triggers.en];
      const triggerTests: SkillMatrixResult["triggerTests"] = [];

      let matchedCount = 0;

      for (const trigger of allTriggers) {
        // Find test results that match this trigger
        const matchingTest = testResults.find(r =>
          r.query.toLowerCase().includes(trigger.toLowerCase()) ||
          trigger.toLowerCase().includes(r.query.toLowerCase())
        );

        const matched = matchingTest?.activatedSkills.includes(skillName) || false;
        if (matched) matchedCount++;

        triggerTests.push({
          trigger,
          matched,
          intent: matchingTest?.detectedIntent || "unknown",
        });
      }

      skills.push({
        skillName,
        category,
        triggerTests,
        coverage: allTriggers.length > 0 ? (matchedCount / allTriggers.length) * 100 : 0,
        totalTriggers: allTriggers.length,
        matchedTriggers: matchedCount,
      });
    }

    const categoryTotal = skills.reduce((sum, s) => sum + s.totalTriggers, 0);
    const categoryMatched = skills.reduce((sum, s) => sum + s.matchedTriggers, 0);

    byCategory.push({
      category,
      skills,
      coverage: categoryTotal > 0 ? (categoryMatched / categoryTotal) * 100 : 0,
    });
  }

  const totalTestCases = testResults.length;
  const totalTriggers = byCategory.reduce((sum, cat) =>
    sum + cat.skills.reduce((s, skill) => s + skill.totalTriggers, 0), 0
  );
  const totalMatched = byCategory.reduce((sum, cat) =>
    sum + cat.skills.reduce((s, skill) => s + skill.matchedTriggers, 0), 0
  );

  return {
    totalSkills: allSkills.length,
    totalTestCases,
    overallCoverage: totalTriggers > 0 ? (totalMatched / totalTriggers) * 100 : 0,
    byCategory,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Format skill matrix report as text table
 */
export function formatSkillMatrixReport(report: SkillMatrixReport): string {
  const lines: string[] = [];

  lines.push("=".repeat(80));
  lines.push("SKILL ACTIVATION MATRIX REPORT");
  lines.push("=".repeat(80));
  lines.push(`Generated: ${report.timestamp}`);
  lines.push(`Total Skills: ${report.totalSkills}`);
  lines.push(`Total Test Cases: ${report.totalTestCases}`);
  lines.push(`Overall Coverage: ${report.overallCoverage.toFixed(2)}%`);
  lines.push("");

  for (const category of report.byCategory) {
    lines.push("-".repeat(80));
    lines.push(`Category: ${category.category} (${category.coverage.toFixed(2)}% coverage)`);
    lines.push("-".repeat(80));

    for (const skill of category.skills) {
      lines.push(`  ${skill.skillName}`);
      lines.push(`    Coverage: ${skill.coverage.toFixed(2)}% (${skill.matchedTriggers}/${skill.totalTriggers} triggers matched)`);

      // Show failed triggers
      const failed = skill.triggerTests.filter(t => !t.matched);
      if (failed.length > 0) {
        lines.push(`    Failed triggers: ${failed.map(t => t.trigger).join(", ")}`);
      }
      lines.push("");
    }
  }

  lines.push("=".repeat(80));
  return lines.join("\n");
}

/**
 * Format skill matrix report as CSV
 */
export function formatSkillMatrixAsCSV(report: SkillMatrixReport): string {
  const headers = ["Skill Name", "Category", "Coverage %", "Matched Triggers", "Total Triggers"];
  const rows: string[][] = [headers];

  for (const category of report.byCategory) {
    for (const skill of category.skills) {
      rows.push([
        skill.skillName,
        skill.category,
        skill.coverage.toFixed(2),
        skill.matchedTriggers.toString(),
        skill.totalTriggers.toString(),
      ]);
    }
  }

  return rows.map(row => row.join(",")).join("\n");
}
