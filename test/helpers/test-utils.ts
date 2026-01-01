/**
 * Test Utilities for Skills Controller Tests
 *
 * Common helper functions, assertions, and test data generators
 */

import { IntentType } from "../../src/skills-controller.js";

/**
 * Clean session state between tests
 */
export function cleanSessionState(sessionStates: Map<string, unknown>): void {
  sessionStates.clear();
}

/**
 * Create a mock session ID
 */
export function createMockSessionId(suffix: string = ""): string {
  return `test-session-${suffix}-${Date.now()}`;
}

/**
 * Assert that intent detection results are valid
 */
export function expectValidIntentDetection(
  results: { intent: IntentType; confidence: number }[],
  expectedIntent?: IntentType
): void {
  expect(results).toBeDefined();
  expect(results.length).toBeGreaterThan(0);

  if (expectedIntent) {
    expect(results[0].intent).toBe(expectedIntent);
  }

  // Check confidence is between 0 and some reasonable max
  expect(results[0].confidence).toBeGreaterThanOrEqual(0);
  expect(results[0].confidence).toBeLessThan(100);
}

/**
 * Assert that skill matching results are valid
 */
export function expectValidSkillMatching(
  analysis: {
    matches: unknown[];
    primaryIntent: IntentType;
    locale: "en" | "zh";
  }
): void {
  expect(analysis).toBeDefined();
  expect(analysis.matches).toBeInstanceOf(Array);
  expect(analysis.primaryIntent).toBeDefined();
  expect(analysis.locale).toMatch(/^(en|zh)$/);
}

/**
 * Generate test queries for a given intent
 */
export function generateTestQueries(
  intent: IntentType,
  locale: "zh" | "en" = "zh",
  count: number = 5
): string[] {
  const queryTemplates: Record<IntentType, { zh: string[]; en: string[] }> = {
    [IntentType.CREATE]: {
      zh: ["创建一个", "新建", "实现一个", "设计", "开发一个"],
      en: ["Create a", "Build a", "Implement a", "Design a", "Develop a"],
    },
    [IntentType.RESEARCH]: {
      zh: ["研究", "查看", "学习", "阅读", "了解"],
      en: ["Research", "Examine", "Study", "Read", "Learn about"],
    },
    [IntentType.DEBUG]: {
      zh: ["修复", "调试", "解决", "排错", "为什么"],
      en: ["Fix", "Debug", "Solve", "Troubleshoot", "Why"],
    },
    [IntentType.REFACTOR]: {
      zh: ["重构", "优化", "改进", "简化", "清理"],
      en: ["Refactor", "Optimize", "Improve", "Simplify", "Clean up"],
    },
    [IntentType.DOCUMENT]: {
      zh: ["写文档", "添加注释", "生成文档", "编写说明", "文档"],
      en: ["Write documentation", "Add comments", "Generate docs", "Document", "README"],
    },
    [IntentType.TEST]: {
      zh: ["测试", "编写测试", "添加测试", "单元测试", "集成测试"],
      en: ["Test", "Write tests", "Add tests", "Unit test", "Integration test"],
    },
    [IntentType.TEST_WRITE_UNIT]: {
      zh: ["写单元测试", "编写单元测试", "添加单元测试", "创建单元测试"],
      en: ["Write unit tests", "Create unit tests", "Add unit tests"],
    },
    [IntentType.TEST_WRITE_INTEGRATION]: {
      zh: ["写集成测试", "编写集成测试", "添加集成测试", "创建集成测试"],
      en: ["Write integration tests", "Create integration tests", "Add integration tests"],
    },
    [IntentType.TEST_WRITE_E2E]: {
      zh: ["写E2E测试", "编写端到端测试", "添加E2E测试", "创建端到端测试"],
      en: ["Write E2E tests", "Create end to end tests", "Add E2E tests"],
    },
    [IntentType.TEST_RUN]: {
      zh: ["运行测试", "执行测试", "跑测试", "运行测试套件"],
      en: ["Run tests", "Execute tests", "Run test suite"],
    },
    [IntentType.ANALYZE]: {
      zh: ["分析", "审查", "检查", "评估", "诊断"],
      en: ["Analyze", "Review", "Inspect", "Evaluate", "Assess"],
    },
    [IntentType.CONVERT]: {
      zh: ["转换", "导出", "转为", "格式化", "生成文件"],
      en: ["Convert", "Export", "Transform to", "Format as", "Generate file"],
    },
    [IntentType.DEPLOY]: {
      zh: ["部署", "发布", "上线", "打包", "构建发布"],
      en: ["Deploy", "Release", "Publish", "Ship", "Launch"],
    },
    [IntentType.CHAT]: {
      zh: ["你好", "谢谢", "是什么", "什么是", "解释"],
      en: ["Hello", "Thanks", "What is", "Explain", "Tell me about"],
    },
    [IntentType.UNKNOWN]: {
      zh: ["你好", "嗨", "谢谢"],
      en: ["Hello", "Hi", "Thanks"],
    },
  };

  const templates = queryTemplates[intent]?.[locale] || [];
  const queries: string[] = [];

  for (let i = 0; i < Math.min(count, templates.length); i++) {
    queries.push(templates[i]);
  }

  return queries;
}

/**
 * Create a mock skill meta object
 */
export function createMockSkill(
  name: string,
  overrides?: Partial<{
    description: string;
    triggers: string[];
    category: string;
    priority: number;
    path: string;
    loaded: boolean;
  }>
) {
  return {
    name,
    description: `${name} skill description`,
    triggers: [name, "test"],
    category: "test",
    priority: 5,
    path: `/test/skills/${name}/SKILL.md`,
    loaded: false,
    ...overrides,
  };
}

/**
 * Generate a batch of mock skills
 */
export function generateMockSkills(count: number): Array<{
  name: string;
  description: string;
  triggers: string[];
  category: string;
  priority: number;
  path: string;
  loaded: boolean;
}> {
  const skills = [];
  const categories = ["frontend", "backend", "testing", "devops", "general"];

  for (let i = 0; i < count; i++) {
    skills.push(
      createMockSkill(`skill-${i}`, {
        category: categories[i % categories.length],
        priority: (i % 5) + 3, // 3-7
        triggers: [`trigger-${i}`, `test-${i}`],
      })
    );
  }

  return skills;
}

/**
 * Parse intent type from string
 */
export function parseIntentType(intent: string): IntentType {
  return IntentType[intent as keyof typeof IntentType] || IntentType.UNKNOWN;
}

/**
 * Create a test result summary
 */
export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
}

export function createTestSummary(
  total: number,
  passed: number,
  failed: number = 0,
  skipped: number = 0,
  duration: number = 0
): TestSummary {
  return { total, passed, failed, skipped, duration };
}

/**
 * Format test results for display
 */
export function formatTestResults(summary: TestSummary): string {
  const passRate = ((summary.passed / summary.total) * 100).toFixed(1);
  return `
Test Results:
------------
Total:   ${summary.total}
Passed:  ${summary.passed} (${passRate}%)
Failed:  ${summary.failed}
Skipped: ${summary.skipped}
Duration: ${summary.duration}ms
`;
}

/**
 * Async delay helper
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry helper for flaky tests
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 100
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await delay(delayMs);
      }
    }
  }

  throw lastError;
}

/**
 * Measure execution time
 */
export async function measureTime<T>(
  fn: () => Promise<T>
): Promise<{ result: T; duration: number }> {
  const start = Date.now();
  const result = await fn();
  const duration = Date.now() - start;
  return { result, duration };
}

/**
 * Check if running in CI environment
 */
export function isCI(): boolean {
  return process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";
}

/**
 * Get test timeout based on environment
 */
export function getTestTimeout(defaultMs: number = 5000): number {
  // CI often runs slower, so increase timeout
  return isCI() ? defaultMs * 3 : defaultMs;
}
