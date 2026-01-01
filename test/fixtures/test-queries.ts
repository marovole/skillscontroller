/**
 * Test Queries for Skills Controller
 *
 * Pre-defined test queries organized by intent type and locale (zh/en)
 */

// IntentType values as strings (since enum is not exported)
export type IntentType =
  | "create"
  | "research"
  | "debug"
  | "refactor"
  | "document"
  | "test"
  | "test_write_unit"
  | "test_write_integration"
  | "test_write_e2e"
  | "test_run"
  | "deploy"
  | "analyze"
  | "convert"
  | "chat"
  | "unknown";

export const IntentType = {
  CREATE: "create" as const,
  RESEARCH: "research" as const,
  DEBUG: "debug" as const,
  REFACTOR: "refactor" as const,
  DOCUMENT: "document" as const,
  TEST: "test" as const,
  TEST_WRITE_UNIT: "test_write_unit" as const,
  TEST_WRITE_INTEGRATION: "test_write_integration" as const,
  TEST_WRITE_E2E: "test_write_e2e" as const,
  TEST_RUN: "test_run" as const,
  DEPLOY: "deploy" as const,
  ANALYZE: "analyze" as const,
  CONVERT: "convert" as const,
  CHAT: "chat" as const,
  UNKNOWN: "unknown" as const,
};

export interface TestQuery {
  input: string;
  expectedIntent: IntentType;
  expectedSkills?: string[]; // Optional: specific skills expected to match
  locale?: "zh" | "en";
  description?: string;
}

/**
 * Test queries organized by intent type
 */
export const TEST_QUERIES: Record<IntentType, { zh: TestQuery[]; en: TestQuery[] }> = {
  [IntentType.CREATE]: {
    zh: [
      {
        input: "创建一个React组件",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["frontend-design", "frontend-development"],
        description: "Basic CREATE - React component",
      },
      {
        input: "新建登录页面",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["frontend-design"],
        description: "CREATE - login page",
      },
      {
        input: "帮我设计一个用户界面",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["frontend-design"],
        description: "CREATE - UI design",
      },
      {
        input: "开发一个REST API",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["backend-development"],
        description: "CREATE - REST API",
      },
      {
        input: "构建数据库模型",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["databases"],
        description: "CREATE - database model",
      },
      {
        input: "设计一个现代风格的页面",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["modern-frontend-design"],
        description: "CREATE - modern design",
      },
      {
        input: "实现JWT认证",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["better-auth"],
        description: "CREATE - authentication",
      },
      {
        input: "写一个Dockerfile",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["docker"],
        description: "CREATE - Docker",
      },
    ],
    en: [
      {
        input: "Create a React component",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["frontend-design", "frontend-development"],
        description: "Basic CREATE - React component",
      },
      {
        input: "Build a login page",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["frontend-design"],
        description: "CREATE - login page",
      },
      {
        input: "Design a user interface",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["frontend-design"],
        description: "CREATE - UI design",
      },
      {
        input: "Implement an API endpoint",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["backend-development"],
        description: "CREATE - API",
      },
      {
        input: "Construct database schema",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["databases"],
        description: "CREATE - database",
      },
      {
        input: "Create a modern design",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["modern-frontend-design"],
        description: "CREATE - modern design",
      },
      {
        input: "Implement JWT authentication",
        expectedIntent: IntentType.CREATE,
        expectedSkills: ["better-auth"],
        description: "CREATE - auth",
      },
    ],
  },

  [IntentType.RESEARCH]: {
    zh: [
      {
        input: "Vue响应式原理",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - Vue reactivity principle",
      },
      {
        input: "React虚拟DOM实现",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - React virtual DOM",
      },
      {
        input: "查看React源码",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - source code",
      },
      {
        input: "研究Node.js事件循环",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - event loop",
      },
      {
        input: "了解Next.js框架原理",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - framework internals",
      },
      {
        input: "阅读Vue3源码",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - Vue3 source",
      },
      {
        input: "怎么实现响应式系统",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - implementation",
      },
      {
        input: "如何工作：React Hooks",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - how it works",
      },
    ],
    en: [
      {
        input: "Vue reactivity principle",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - Vue reactivity",
      },
      {
        input: "React virtual DOM implementation",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - virtual DOM",
      },
      {
        input: "Read React source code",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - source code",
      },
      {
        input: "Study Node.js event loop",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - event loop",
      },
      {
        input: "How does React state work",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - how it works",
      },
      {
        input: "Explain framework internals",
        expectedIntent: IntentType.RESEARCH,
        expectedSkills: ["open-source-librarian"],
        description: "RESEARCH - internals",
      },
    ],
  },

  [IntentType.DEBUG]: {
    zh: [
      {
        input: "修复这个bug",
        expectedIntent: IntentType.DEBUG,
        expectedSkills: ["systematic-debugging"],
        description: "DEBUG - fix bug",
      },
      {
        input: "为什么页面报错",
        expectedIntent: IntentType.DEBUG,
        expectedSkills: ["systematic-debugging", "root-cause-tracing"],
        description: "DEBUG - error analysis",
      },
      {
        input: "调试API调用失败",
        expectedIntent: IntentType.DEBUG,
        expectedSkills: ["systematic-debugging"],
        description: "DEBUG - API failure",
      },
      {
        input: "解决登录不工作的问题",
        expectedIntent: IntentType.DEBUG,
        expectedSkills: ["systematic-debugging"],
        description: "DEBUG - not working",
      },
      {
        input: "为什么组件不渲染",
        expectedIntent: IntentType.DEBUG,
        expectedSkills: ["systematic-debugging", "root-cause-tracing"],
        description: "DEBUG - not rendering",
      },
    ],
    en: [
      {
        input: "Fix this bug",
        expectedIntent: IntentType.DEBUG,
        expectedSkills: ["systematic-debugging"],
        description: "DEBUG - fix bug",
      },
      {
        input: "Why is it throwing error",
        expectedIntent: IntentType.DEBUG,
        expectedSkills: ["systematic-debugging", "root-cause-tracing"],
        description: "DEBUG - error",
      },
      {
        input: "Debug page not displaying",
        expectedIntent: IntentType.DEBUG,
        expectedSkills: ["systematic-debugging"],
        description: "DEBUG - not displaying",
      },
      {
        input: "Troubleshoot API failure",
        expectedIntent: IntentType.DEBUG,
        expectedSkills: ["systematic-debugging"],
        description: "DEBUG - API",
      },
      {
        input: "Why doesn't login work",
        expectedIntent: IntentType.DEBUG,
        expectedSkills: ["systematic-debugging"],
        description: "DEBUG - not working",
      },
    ],
  },

  [IntentType.REFACTOR]: {
    zh: [
      {
        input: "重构这个组件",
        expectedIntent: IntentType.REFACTOR,
        expectedSkills: ["frontend-development"],
        description: "REFACTOR - component",
      },
      {
        input: "优化数据库查询",
        expectedIntent: IntentType.REFACTOR,
        expectedSkills: ["databases"],
        description: "REFACTOR - database",
      },
      {
        input: "简化代码逻辑",
        expectedIntent: IntentType.REFACTOR,
        expectedSkills: ["simplification-cascades"],
        description: "REFACTOR - simplify",
      },
      {
        input: "改进API性能",
        expectedIntent: IntentType.REFACTOR,
        expectedSkills: ["backend-development"],
        description: "REFACTOR - performance",
      },
    ],
    en: [
      {
        input: "Refactor this component",
        expectedIntent: IntentType.REFACTOR,
        expectedSkills: ["frontend-development"],
        description: "REFACTOR - component",
      },
      {
        input: "Optimize database query",
        expectedIntent: IntentType.REFACTOR,
        expectedSkills: ["databases"],
        description: "REFACTOR - database",
      },
      {
        input: "Simplify code logic",
        expectedIntent: IntentType.REFACTOR,
        expectedSkills: ["simplification-cascades"],
        description: "REFACTOR - simplify",
      },
      {
        input: "Improve API performance",
        expectedIntent: IntentType.REFACTOR,
        expectedSkills: ["backend-development"],
        description: "REFACTOR - performance",
      },
    ],
  },

  [IntentType.DOCUMENT]: {
    zh: [
      {
        input: "写文档",
        expectedIntent: IntentType.DOCUMENT,
        expectedSkills: ["document-skills"],
        description: "DOCUMENT - write docs",
      },
      {
        input: "生成README",
        expectedIntent: IntentType.DOCUMENT,
        expectedSkills: ["document-skills"],
        description: "DOCUMENT - README",
      },
      {
        input: "添加代码注释",
        expectedIntent: IntentType.DOCUMENT,
        expectedSkills: ["document-skills"],
        description: "DOCUMENT - comments",
      },
    ],
    en: [
      {
        input: "Write documentation",
        expectedIntent: IntentType.DOCUMENT,
        expectedSkills: ["document-skills"],
        description: "DOCUMENT - write docs",
      },
      {
        input: "Generate README",
        expectedIntent: IntentType.DOCUMENT,
        expectedSkills: ["document-skills"],
        description: "DOCUMENT - README",
      },
      {
        input: "Add code comments",
        expectedIntent: IntentType.DOCUMENT,
        expectedSkills: ["document-skills"],
        description: "DOCUMENT - comments",
      },
    ],
  },

  [IntentType.TEST]: {
    zh: [
      {
        input: "测试这个功能",
        expectedIntent: IntentType.TEST,
        description: "TEST - general",
      },
      {
        input: "编写测试",
        expectedIntent: IntentType.TEST,
        description: "TEST - write tests",
      },
    ],
    en: [
      {
        input: "Test this feature",
        expectedIntent: IntentType.TEST,
        description: "TEST - general",
      },
      {
        input: "Write tests",
        expectedIntent: IntentType.TEST,
        description: "TEST - write",
      },
    ],
  },

  [IntentType.TEST_WRITE_UNIT]: {
    zh: [
      {
        input: "写单元测试",
        expectedIntent: IntentType.TEST_WRITE_UNIT,
        description: "TEST_WRITE_UNIT - write unit tests",
      },
      {
        input: "编写单元测试",
        expectedIntent: IntentType.TEST_WRITE_UNIT,
        description: "TEST_WRITE_UNIT - create unit tests",
      },
      {
        input: "添加单元测试",
        expectedIntent: IntentType.TEST_WRITE_UNIT,
        description: "TEST_WRITE_UNIT - add unit tests",
      },
    ],
    en: [
      {
        input: "Write unit tests",
        expectedIntent: IntentType.TEST_WRITE_UNIT,
        description: "TEST_WRITE_UNIT - write",
      },
      {
        input: "Create unit tests",
        expectedIntent: IntentType.TEST_WRITE_UNIT,
        description: "TEST_WRITE_UNIT - create",
      },
      {
        input: "Add unit tests",
        expectedIntent: IntentType.TEST_WRITE_UNIT,
        description: "TEST_WRITE_UNIT - add",
      },
    ],
  },

  [IntentType.TEST_WRITE_INTEGRATION]: {
    zh: [
      {
        input: "写集成测试",
        expectedIntent: IntentType.TEST_WRITE_INTEGRATION,
        description: "TEST_WRITE_INTEGRATION - write",
      },
      {
        input: "编写集成测试",
        expectedIntent: IntentType.TEST_WRITE_INTEGRATION,
        description: "TEST_WRITE_INTEGRATION - create",
      },
    ],
    en: [
      {
        input: "Write integration tests",
        expectedIntent: IntentType.TEST_WRITE_INTEGRATION,
        description: "TEST_WRITE_INTEGRATION - write",
      },
      {
        input: "Create integration tests",
        expectedIntent: IntentType.TEST_WRITE_INTEGRATION,
        description: "TEST_WRITE_INTEGRATION - create",
      },
    ],
  },

  [IntentType.TEST_WRITE_E2E]: {
    zh: [
      {
        input: "写E2E测试",
        expectedIntent: IntentType.TEST_WRITE_E2E,
        expectedSkills: ["webapp-testing"],
        description: "TEST_WRITE_E2E - write",
      },
      {
        input: "编写端到端测试",
        expectedIntent: IntentType.TEST_WRITE_E2E,
        expectedSkills: ["webapp-testing"],
        description: "TEST_WRITE_E2E - create",
      },
      {
        input: "添加playwright测试",
        expectedIntent: IntentType.TEST_WRITE_E2E,
        expectedSkills: ["webapp-testing"],
        description: "TEST_WRITE_E2E - playwright",
      },
      {
        input: "运行E2E测试",
        expectedIntent: IntentType.TEST_RUN,
        expectedSkills: ["webapp-testing"],
        description: "TEST_RUN - run E2E",
      },
    ],
    en: [
      {
        input: "Write E2E tests",
        expectedIntent: IntentType.TEST_WRITE_E2E,
        expectedSkills: ["webapp-testing"],
        description: "TEST_WRITE_E2E - write",
      },
      {
        input: "Create end to end tests",
        expectedIntent: IntentType.TEST_WRITE_E2E,
        expectedSkills: ["webapp-testing"],
        description: "TEST_WRITE_E2E - create",
      },
      {
        input: "Add playwright tests",
        expectedIntent: IntentType.TEST_WRITE_E2E,
        expectedSkills: ["webapp-testing"],
        description: "TEST_WRITE_E2E - playwright",
      },
    ],
  },

  [IntentType.TEST_RUN]: {
    zh: [
      {
        input: "运行测试",
        expectedIntent: IntentType.TEST_RUN,
        description: "TEST_RUN - run",
      },
      {
        input: "执行测试套件",
        expectedIntent: IntentType.TEST_RUN,
        description: "TEST_RUN - execute",
      },
      {
        input: "跑测试",
        expectedIntent: IntentType.TEST_RUN,
        description: "TEST_RUN - run casually",
      },
      {
        input: "npm test",
        expectedIntent: IntentType.TEST_RUN,
        description: "TEST_RUN - npm test",
      },
    ],
    en: [
      {
        input: "Run tests",
        expectedIntent: IntentType.TEST_RUN,
        description: "TEST_RUN - run",
      },
      {
        input: "Execute test suite",
        expectedIntent: IntentType.TEST_RUN,
        description: "TEST_RUN - execute",
      },
      {
        input: "npm test",
        expectedIntent: IntentType.TEST_RUN,
        description: "TEST_RUN - npm",
      },
      {
        input: "vitest",
        expectedIntent: IntentType.TEST_RUN,
        description: "TEST_RUN - vitest",
      },
    ],
  },

  [IntentType.ANALYZE]: {
    zh: [
      {
        input: "审查代码",
        expectedIntent: IntentType.ANALYZE,
        expectedSkills: ["code-review"],
        description: "ANALYZE - code review",
      },
      {
        input: "检查代码质量",
        expectedIntent: IntentType.ANALYZE,
        expectedSkills: ["code-review"],
        description: "ANALYZE - quality check",
      },
      {
        input: "分析这个组件",
        expectedIntent: IntentType.ANALYZE,
        description: "ANALYZE - component",
      },
      {
        input: "评估这个设计",
        expectedIntent: IntentType.ANALYZE,
        description: "ANALYZE - design",
      },
    ],
    en: [
      {
        input: "Review code",
        expectedIntent: IntentType.ANALYZE,
        expectedSkills: ["code-review"],
        description: "ANALYZE - code review",
      },
      {
        input: "Check code quality",
        expectedIntent: IntentType.ANALYZE,
        expectedSkills: ["code-review"],
        description: "ANALYZE - quality",
      },
      {
        input: "Analyze this component",
        expectedIntent: IntentType.ANALYZE,
        description: "ANALYZE - component",
      },
      {
        input: "Evaluate this design",
        expectedIntent: IntentType.ANALYZE,
        description: "ANALYZE - design",
      },
    ],
  },

  [IntentType.CONVERT]: {
    zh: [
      {
        input: "导出PDF",
        expectedIntent: IntentType.CONVERT,
        expectedSkills: ["pdf"],
        description: "CONVERT - PDF export",
      },
      {
        input: "转换为Word文档",
        expectedIntent: IntentType.CONVERT,
        expectedSkills: ["docx"],
        description: "CONVERT - Word",
      },
      {
        input: "生成Excel表格",
        expectedIntent: IntentType.CONVERT,
        expectedSkills: ["xlsx"],
        description: "CONVERT - Excel",
      },
      {
        input: "转成PPT",
        expectedIntent: IntentType.CONVERT,
        expectedSkills: ["pptx"],
        description: "CONVERT - PPT",
      },
    ],
    en: [
      {
        input: "Export PDF",
        expectedIntent: IntentType.CONVERT,
        expectedSkills: ["pdf"],
        description: "CONVERT - PDF",
      },
      {
        input: "Convert to Word",
        expectedIntent: IntentType.CONVERT,
        expectedSkills: ["docx"],
        description: "CONVERT - Word",
      },
      {
        input: "Generate Excel spreadsheet",
        expectedIntent: IntentType.CONVERT,
        expectedSkills: ["xlsx"],
        description: "CONVERT - Excel",
      },
      {
        input: "Transform to PowerPoint",
        expectedIntent: IntentType.CONVERT,
        expectedSkills: ["pptx"],
        description: "CONVERT - PPT",
      },
    ],
  },

  [IntentType.DEPLOY]: {
    zh: [
      {
        input: "部署应用",
        expectedIntent: IntentType.DEPLOY,
        expectedSkills: ["devops"],
        description: "DEPLOY - deploy",
      },
      {
        input: "发布到生产环境",
        expectedIntent: IntentType.DEPLOY,
        expectedSkills: ["devops"],
        description: "DEPLOY - production",
      },
      {
        input: "设置CI/CD",
        expectedIntent: IntentType.DEPLOY,
        expectedSkills: ["devops"],
        description: "DEPLOY - CI/CD",
      },
      {
        input: "Docker化应用",
        expectedIntent: IntentType.DEPLOY,
        expectedSkills: ["docker"],
        description: "DEPLOY - Docker",
      },
    ],
    en: [
      {
        input: "Deploy application",
        expectedIntent: IntentType.DEPLOY,
        expectedSkills: ["devops"],
        description: "DEPLOY - deploy",
      },
      {
        input: "Release to production",
        expectedIntent: IntentType.DEPLOY,
        expectedSkills: ["devops"],
        description: "DEPLOY - production",
      },
      {
        input: "Setup CI/CD",
        expectedIntent: IntentType.DEPLOY,
        expectedSkills: ["devops"],
        description: "DEPLOY - CI/CD",
      },
      {
        input: "Dockerize application",
        expectedIntent: IntentType.DEPLOY,
        expectedSkills: ["docker"],
        description: "DEPLOY - Docker",
      },
    ],
  },

  [IntentType.CHAT]: {
    zh: [
      {
        input: "你好",
        expectedIntent: IntentType.CHAT,
        description: "CHAT - greeting",
      },
      {
        input: "谢谢",
        expectedIntent: IntentType.CHAT,
        description: "CHAT - thanks",
      },
      {
        input: "什么是React",
        expectedIntent: IntentType.CHAT,
        description: "CHAT - what is",
      },
    ],
    en: [
      {
        input: "Hello",
        expectedIntent: IntentType.CHAT,
        description: "CHAT - greeting",
      },
      {
        input: "Thanks",
        expectedIntent: IntentType.CHAT,
        description: "CHAT - thanks",
      },
      {
        input: "What is React",
        expectedIntent: IntentType.CHAT,
        description: "CHAT - what is",
      },
    ],
  },

  [IntentType.UNKNOWN]: {
    zh: [
      {
        input: "你好",
        expectedIntent: IntentType.CHAT,
        description: "UNKNOWN fallback - CHAT",
      },
      {
        input: "随便说点什么",
        expectedIntent: IntentType.UNKNOWN,
        description: "UNKNOWN - casual",
      },
    ],
    en: [
      {
        input: "Hello",
        expectedIntent: IntentType.CHAT,
        description: "UNKNOWN fallback - CHAT",
      },
      {
        input: "Just saying hi",
        expectedIntent: IntentType.UNKNOWN,
        description: "UNKNOWN - casual",
      },
    ],
  },
};

/**
 * Edge case queries for testing
 */
export const EDGE_CASE_QUERIES: {
  ambiguous: TestQuery[];
  noMatch: TestQuery[];
  conflicting: TestQuery[];
  mixedLanguage: TestQuery[];
} = {
  ambiguous: [
    {
      input: "设计一个系统",
      expectedIntent: IntentType.CREATE,
      description: "Ambiguous - could be design or architecture",
    },
    {
      input: "创建一个测试",
      expectedIntent: IntentType.TEST_WRITE_UNIT,
      description: "Ambiguous - create vs test",
    },
    {
      input: "研究一个设计",
      expectedIntent: IntentType.RESEARCH,
      expectedSkills: ["open-source-librarian"],
      description: "Ambiguous - research vs design",
    },
    {
      input: "Create a modern frontend design and test it",
      expectedIntent: IntentType.CREATE,
      expectedSkills: ["modern-frontend-design"],
      description: "Multi-intent query",
    },
  ],

  noMatch: [
    {
      input: "你好",
      expectedIntent: IntentType.CHAT,
      description: "No skill match - greeting",
    },
    {
      input: "谢谢",
      expectedIntent: IntentType.CHAT,
      description: "No skill match - thanks",
    },
    {
      input: "Hello",
      expectedIntent: IntentType.CHAT,
      description: "No skill match - hello",
    },
  ],

  conflicting: [
    {
      input: "查看React源码设计",
      expectedIntent: IntentType.RESEARCH,
      expectedSkills: ["open-source-librarian"],
      description: "Conflict - research should win over design",
    },
    {
      input: "Create a test for React component design",
      expectedIntent: IntentType.TEST_WRITE_E2E,
      description: "Conflict - test intent",
    },
    {
      input: "优化前端设计性能",
      expectedIntent: IntentType.REFACTOR,
      description: "Conflict - refactor should win",
    },
  ],

  mixedLanguage: [
    {
      input: "Create一个React component",
      expectedIntent: IntentType.CREATE,
      description: "Mixed - Create (en) + component (zh context)",
    },
    {
      input: "设计一个modern UI",
      expectedIntent: IntentType.CREATE,
      expectedSkills: ["modern-frontend-design"],
      description: "Mixed - design (zh) + modern (en)",
    },
    {
      input: "Help me 设计界面",
      expectedIntent: IntentType.CREATE,
      expectedSkills: ["frontend-design"],
      description: "Mixed - help (en) + design (zh)",
    },
  ],
};

/**
 * Get all test queries for a specific intent
 */
export function getQueriesForIntent(intent: IntentType, locale?: "zh" | "en"): TestQuery[] {
  const queries = TEST_QUERIES[intent];
  if (!queries) return [];
  if (locale) return queries[locale];
  return [...queries.zh, ...queries.en];
}

/**
 * Get all test queries across all intents
 */
export function getAllQueries(locale?: "zh" | "en"): TestQuery[] {
  const all: TestQuery[] = [];
  const intents: IntentType[] = [
    IntentType.CREATE,
    IntentType.RESEARCH,
    IntentType.DEBUG,
    IntentType.REFACTOR,
    IntentType.DOCUMENT,
    IntentType.TEST,
    IntentType.TEST_WRITE_UNIT,
    IntentType.TEST_WRITE_INTEGRATION,
    IntentType.TEST_WRITE_E2E,
    IntentType.TEST_RUN,
    IntentType.DEPLOY,
    IntentType.ANALYZE,
    IntentType.CONVERT,
    IntentType.CHAT,
    IntentType.UNKNOWN,
  ];

  for (const intent of intents) {
    const queries = TEST_QUERIES[intent];
    if (queries) {
      if (locale) {
        all.push(...queries[locale]);
      } else {
        all.push(...queries.zh, ...queries.en);
      }
    }
  }
  return all;
}

/**
 * Get total count of test queries
 */
export function getQueryCount(locale?: "zh" | "en"): number {
  return getAllQueries(locale).length;
}
