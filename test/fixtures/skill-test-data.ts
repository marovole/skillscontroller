/**
 * Skill Test Data
 *
 * Complete test data for all 60+ skills in the Skills Controller.
 * Each skill includes triggers (zh/en), expected intent, exclusion rules, and metadata.
 */

// Re-export IntentType from test-queries for consistency
export { IntentType, type IntentType as IntentTypeValue } from "./test-queries.js";

export interface SkillTestData {
  triggers: {
    zh: string[];
    en: string[];
  };
  expectedIntent: string;
  excludedIntents: string[];
  requiredIntents: string[];
  priority: number;
  category: string;
  source: "anthropic" | "claudekit" | "community" | "voltagent" | "user";
}

/**
 * Complete skill test data registry
 * Maps skill name to its complete test configuration
 */
export const SKILL_TEST_DATA: Record<string, SkillTestData> = {
  // ============================================
  // FRONTEND SKILLS
  // ============================================
  "frontend-design": {
    triggers: {
      zh: ["设计", "UI", "样式", "组件", "页面", "布局", "CSS", "React", "Vue", "前端", "界面", "交互"],
      en: ["design", "ui", "styling", "component", "page", "layout", "css", "react", "vue", "frontend", "interface", "interaction"],
    },
    expectedIntent: "create",
    excludedIntents: ["research", "analyze"],
    requiredIntents: ["create", "refactor"],
    priority: 6,
    category: "frontend",
    source: "anthropic",
  },

  "modern-frontend-design": {
    triggers: {
      zh: ["现代前端", "前端设计", "UI设计", "界面设计", "设计系统", "美学", "视觉", "React设计", "Vue设计", "组件设计"],
      en: ["modern frontend", "frontend design", "ui design", "interface design", "design system", "aesthetic", "visual", "react design", "vue design", "component design"],
    },
    expectedIntent: "create",
    excludedIntents: ["research"],
    requiredIntents: ["create"],
    priority: 7,
    category: "frontend",
    source: "user",
  },

  "frontend-development": {
    triggers: {
      zh: ["前端开发", "JavaScript", "TypeScript", "框架"],
      en: ["frontend development", "javascript", "typescript", "framework"],
    },
    expectedIntent: "create",
    excludedIntents: ["research"],
    requiredIntents: ["create", "debug"],
    priority: 6,
    category: "frontend",
    source: "claudekit",
  },

  "ui-styling": {
    triggers: {
      zh: ["UI样式", "CSS", "样式设计"],
      en: ["ui styling", "css", "styling"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 5,
    category: "frontend",
    source: "claudekit",
  },

  "aesthetic": {
    triggers: {
      zh: ["美学", "审美", "视觉风格", "设计感"],
      en: ["aesthetic", "visual style", "design sense"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 4,
    category: "frontend",
    source: "claudekit",
  },

  "canvas-design": {
    triggers: {
      zh: ["画布", "图表", "可视化", "Canvas", "图形"],
      en: ["canvas", "chart", "visualization", "graphics"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 5,
    category: "frontend",
    source: "community",
  },

  "web-artifacts-builder": {
    triggers: {
      zh: ["网页工件", "HTML生成", "网页构建"],
      en: ["web artifacts", "html generation", "web builder"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 6,
    category: "frontend",
    source: "anthropic",
  },

  "artifacts-builder": {
    triggers: {
      zh: ["artifacts", "构建", "生成器"],
      en: ["artifacts", "builder", "generator"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 6,
    category: "frontend",
    source: "community",
  },

  "theme-factory": {
    triggers: {
      zh: ["主题", "皮肤"],
      en: ["theme", "skin"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 4,
    category: "frontend",
    source: "community",
  },

  "brand-guidelines": {
    triggers: {
      zh: ["品牌", "指南", "风格"],
      en: ["brand", "guidelines", "style"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 5,
    category: "frontend",
    source: "community",
  },

  // ============================================
  // BACKEND SKILLS
  // ============================================
  "backend-development": {
    triggers: {
      zh: ["后端", "服务端", "API开发"],
      en: ["backend", "server", "api development", "backend development"],
    },
    expectedIntent: "create",
    excludedIntents: ["research"],
    requiredIntents: ["create", "debug"],
    priority: 6,
    category: "backend",
    source: "claudekit",
  },

  "web-frameworks": {
    triggers: {
      zh: ["Web框架", "Express", "Fastify", "Koa", "Next.js"],
      en: ["web framework", "express", "fastify", "koa", "next.js"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create", "debug"],
    priority: 6,
    category: "backend",
    source: "claudekit",
  },

  // ============================================
  // TESTING SKILLS
  // ============================================
  "webapp-testing": {
    triggers: {
      zh: ["E2E", "e2e", "端到端测试", "playwright", "浏览器测试", "web测试", "前端测试", "自动化测试", "UI测试", "网页测试"],
      en: ["e2e", "end to end test", "playwright", "browser test", "web test", "frontend test", "automation test", "ui test"],
    },
    expectedIntent: "test_write_e2e",
    excludedIntents: ["test_write_unit", "test_write_integration"],
    requiredIntents: ["test_run", "test_write_e2e"],
    priority: 6,
    category: "testing",
    source: "community",
  },

  "code-review": {
    triggers: {
      zh: ["审查", "review", "PR", "代码质量", "bug", "安全"],
      en: ["review", "code review", "pr", "pull request", "code quality", "bug", "security"],
    },
    expectedIntent: "analyze",
    excludedIntents: [],
    requiredIntents: ["analyze"],
    priority: 7,
    category: "testing",
    source: "community",
  },

  "systematic-debugging": {
    triggers: {
      zh: ["系统调试", "debug", "排错"],
      en: ["systematic debugging", "debug", "troubleshoot"],
    },
    expectedIntent: "debug",
    excludedIntents: [],
    requiredIntents: ["debug"],
    priority: 7,
    category: "testing",
    source: "claudekit",
  },

  "root-cause-tracing": {
    triggers: {
      zh: ["根因分析", "问题追踪", "故障排查"],
      en: ["root cause", "problem tracing", "troubleshooting"],
    },
    expectedIntent: "debug",
    excludedIntents: [],
    requiredIntents: ["debug", "analyze"],
    priority: 7,
    category: "testing",
    source: "claudekit",
  },

  // ============================================
  // DEVOPS SKILLS
  // ============================================
  "devops": {
    triggers: {
      zh: ["DevOps", "CI/CD", "部署", "运维", "Docker", "K8s"],
      en: ["devops", "ci/cd", "deployment", "operations", "docker", "kubernetes"],
    },
    expectedIntent: "deploy",
    excludedIntents: [],
    requiredIntents: ["deploy", "create"],
    priority: 6,
    category: "devops",
    source: "claudekit",
  },

  "mcp-management": {
    triggers: {
      zh: ["MCP管理", "服务器管理"],
      en: ["mcp management", "server management"],
    },
    expectedIntent: "deploy",
    excludedIntents: [],
    requiredIntents: ["deploy"],
    priority: 5,
    category: "devops",
    source: "claudekit",
  },

  "mcp-builder": {
    triggers: {
      zh: ["MCP", "服务器", "集成", "工具开发", "API"],
      en: ["mcp", "server", "integration", "tool development", "api"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create", "deploy"],
    priority: 6,
    category: "devops",
    source: "community",
  },

  // ============================================
  // DOCUMENTATION SKILLS
  // ============================================
  "doc-coauthoring": {
    triggers: {
      zh: ["协作", "共同编辑", "文档协作", "协同写作"],
      en: ["coauthor", "collaboration", "document collaboration", "co-authoring"],
    },
    expectedIntent: "document",
    excludedIntents: [],
    requiredIntents: ["document", "create"],
    priority: 6,
    category: "documentation",
    source: "anthropic",
  },

  "pdf": {
    triggers: {
      zh: ["PDF", "pdf文件", "导出PDF", "PDF生成", "便携文档"],
      en: ["pdf", "pdf file", "export pdf", "pdf generation"],
    },
    expectedIntent: "convert",
    excludedIntents: [],
    requiredIntents: ["convert", "create"],
    priority: 6,
    category: "documentation",
    source: "anthropic",
  },

  "docx": {
    triggers: {
      zh: ["Word", "文档", "办公文档"],
      en: ["docx", "doc", "word", "microsoft word", "office document"],
    },
    expectedIntent: "convert",
    excludedIntents: [],
    requiredIntents: ["convert", "document"],
    priority: 6,
    category: "documentation",
    source: "anthropic",
  },

  "pptx": {
    triggers: {
      zh: ["PPT", "演示文稿", "PowerPoint", "幻灯片"],
      en: ["pptx", "ppt", "powerpoint", "slides", "presentation"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create", "document"],
    priority: 6,
    category: "documentation",
    source: "anthropic",
  },

  "xlsx": {
    triggers: {
      zh: ["Excel", "电子表格", "表格", "数据分析"],
      en: ["xlsx", "excel", "spreadsheet", "data analysis"],
    },
    expectedIntent: "convert",
    excludedIntents: [],
    requiredIntents: ["convert", "create"],
    priority: 6,
    category: "documentation",
    source: "anthropic",
  },

  "document-skills": {
    triggers: {
      zh: ["文档", "Markdown", "PDF", "Word", "文件"],
      en: ["documentation", "markdown", "pdf", "word", "file"],
    },
    expectedIntent: "document",
    excludedIntents: [],
    requiredIntents: ["document", "create", "convert"],
    priority: 5,
    category: "documentation",
    source: "community",
  },

  "docs-seeker": {
    triggers: {
      zh: ["文档搜索", "API文档", "查文档"],
      en: ["docs search", "api documentation", "documentation"],
    },
    expectedIntent: "research",
    excludedIntents: [],
    requiredIntents: ["research"],
    priority: 6,
    category: "documentation",
    source: "claudekit",
  },

  "repomix": {
    triggers: {
      zh: ["代码库", "仓库分析", "代码统计"],
      en: ["codebase", "repository analysis", "code stats"],
    },
    expectedIntent: "analyze",
    excludedIntents: [],
    requiredIntents: ["analyze", "research"],
    priority: 6,
    category: "documentation",
    source: "claudekit",
  },

  "mermaidjs-v11": {
    triggers: {
      zh: ["Mermaid", "流程图", "时序图", "图表绘制"],
      en: ["mermaid", "flowchart", "sequence diagram", "chart"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create", "document"],
    priority: 6,
    category: "documentation",
    source: "claudekit",
  },

  "changelog-generator": {
    triggers: {
      zh: ["changelog", "更新日志", "版本"],
      en: ["changelog", "update log", "version"],
    },
    expectedIntent: "document",
    excludedIntents: [],
    requiredIntents: ["document"],
    priority: 5,
    category: "documentation",
    source: "community",
  },

  // ============================================
  // MEDIA SKILLS
  // ============================================
  "media-processing": {
    triggers: {
      zh: ["媒体处理", "音视频", "转码", "剪辑"],
      en: ["media processing", "audio video", "transcoding", "editing"],
    },
    expectedIntent: "convert",
    excludedIntents: [],
    requiredIntents: ["convert"],
    priority: 6,
    category: "media",
    source: "claudekit",
  },

  "image-enhancer": {
    triggers: {
      zh: ["图片", "图像", "增强"],
      en: ["image", "picture", "enhance"],
    },
    expectedIntent: "convert",
    excludedIntents: [],
    requiredIntents: ["convert"],
    priority: 5,
    category: "media",
    source: "community",
  },

  "video-downloader": {
    triggers: {
      zh: ["视频", "下载"],
      en: ["video", "download"],
    },
    expectedIntent: "convert",
    excludedIntents: [],
    requiredIntents: ["convert"],
    priority: 5,
    category: "media",
    source: "community",
  },

  "slack-gif-creator": {
    triggers: {
      zh: ["slack", "gif", "动图"],
      en: ["slack", "gif", "animated"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 4,
    category: "media",
    source: "community",
  },

  "algorithmic-art": {
    triggers: {
      zh: ["算法艺术", "生成艺术", "艺术", "算法绘画"],
      en: ["algorithmic art", "generative art", "art", "procedural", "generative"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 5,
    category: "media",
    source: "anthropic",
  },

  // ============================================
  // THINKING SKILLS
  // ============================================
  "sequential-thinking": {
    triggers: {
      zh: ["顺序思考", "逐步推理"],
      en: ["sequential thinking", "step by step", "reasoning"],
    },
    expectedIntent: "unknown",
    excludedIntents: [],
    requiredIntents: [],
    priority: 4,
    category: "thinking",
    source: "claudekit",
  },

  "collision-zone-thinking": {
    triggers: {
      zh: ["碰撞思维", "问题分析", "矛盾分析"],
      en: ["collision zone", "problem analysis", "contradiction"],
    },
    expectedIntent: "unknown",
    excludedIntents: [],
    requiredIntents: [],
    priority: 4,
    category: "thinking",
    source: "claudekit",
  },

  "meta-pattern-recognition": {
    triggers: {
      zh: ["模式识别", "元认知", "规律发现"],
      en: ["pattern recognition", "metacognition", "pattern discovery"],
    },
    expectedIntent: "unknown",
    excludedIntents: [],
    requiredIntents: [],
    priority: 4,
    category: "thinking",
    source: "claudekit",
  },

  "context-engineering": {
    triggers: {
      zh: ["上下文工程", "prompt工程", "提示词"],
      en: ["context engineering", "prompt engineering", "prompt"],
    },
    expectedIntent: "unknown",
    excludedIntents: [],
    requiredIntents: [],
    priority: 4,
    category: "thinking",
    source: "claudekit",
  },

  "inversion-exercise": {
    triggers: {
      zh: ["逆向思维", "反向推理"],
      en: ["inversion", "reverse thinking"],
    },
    expectedIntent: "unknown",
    excludedIntents: [],
    requiredIntents: [],
    priority: 4,
    category: "thinking",
    source: "claudekit",
  },

  "defense-in-depth": {
    triggers: {
      zh: ["深度防御", "安全策略", "多层防护"],
      en: ["defense in depth", "security strategy", "layered defense"],
    },
    expectedIntent: "unknown",
    excludedIntents: [],
    requiredIntents: [],
    priority: 4,
    category: "thinking",
    source: "claudekit",
  },

  "scale-game": {
    triggers: {
      zh: ["规模化", "扩展性", "性能优化"],
      en: ["scale", "scalability", "performance optimization"],
    },
    expectedIntent: "unknown",
    excludedIntents: [],
    requiredIntents: [],
    priority: 4,
    category: "thinking",
    source: "claudekit",
  },

  "simplification-cascades": {
    triggers: {
      zh: ["简化", "降复杂度", "重构"],
      en: ["simplification", "reduce complexity", "refactor"],
    },
    expectedIntent: "refactor",
    excludedIntents: [],
    requiredIntents: ["refactor"],
    priority: 5,
    category: "thinking",
    source: "claudekit",
  },

  "verification-before-completion": {
    triggers: {
      zh: ["验证", "检查", "确认完成"],
      en: ["verification", "check", "confirm completion"],
    },
    expectedIntent: "unknown",
    excludedIntents: [],
    requiredIntents: [],
    priority: 4,
    category: "thinking",
    source: "claudekit",
  },

  "when-stuck": {
    triggers: {
      zh: ["卡住", "困难", "求助"],
      en: ["stuck", "difficulty", "help"],
    },
    expectedIntent: "unknown",
    excludedIntents: [],
    requiredIntents: [],
    priority: 4,
    category: "thinking",
    source: "claudekit",
  },

  // ============================================
  // TOOLS SKILLS
  // ============================================
  "browser": {
    triggers: {
      zh: ["浏览器", "Chrome", "CDP", "DevTools", "自动化", "抓取", "截图"],
      en: ["browser", "chrome", "cdp", "devtools", "automation", "scraping", "screenshot", "puppeteer"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create", "debug"],
    priority: 6,
    category: "tools",
    source: "user",
  },

  "chrome-devtools": {
    triggers: {
      zh: ["Chrome", "DevTools", "浏览器调试", "开发者工具"],
      en: ["chrome", "devtools", "browser debugging", "developer tools"],
    },
    expectedIntent: "debug",
    excludedIntents: [],
    requiredIntents: ["debug"],
    priority: 6,
    category: "tools",
    source: "claudekit",
  },

  "skill-creator": {
    triggers: {
      zh: ["创建技能", "新技能", "技能开发"],
      en: ["create skill", "new skill", "skill development"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 5,
    category: "tools",
    source: "community",
  },

  "claude-code": {
    triggers: {
      zh: ["Claude Code", "CLI", "命令行"],
      en: ["claude code", "cli", "command line"],
    },
    expectedIntent: "unknown",
    excludedIntents: [],
    requiredIntents: [],
    priority: 4,
    category: "tools",
    source: "claudekit",
  },

  // ============================================
  // RESEARCH SKILLS
  // ============================================
  "open-source-librarian": {
    triggers: {
      zh: ["开源", "开源库", "库实现", "源码", "GitHub", "源代码", "代码引用", "查源码", "看源码", "读源码", "开源项目", "原理", "实现原理", "怎么实现", "如何工作", "工作机制", "底层", "内部实现", "响应式原理", "虚拟DOM原理", "组件原理", "底层原理", "核心原理"],
      en: ["open source", "library", "implementation", "source code", "github", "permalink", "code reference", "check source", "view source", "read source", "principle", "implementation principle", "how to implement", "how it works", "mechanism", "underlying", "internal", "reactivity", "virtual dom", "component"],
    },
    expectedIntent: "research",
    excludedIntents: [],
    requiredIntents: ["research", "analyze"],
    priority: 8,
    category: "research",
    source: "user",
  },

  // ============================================
  // DATABASE SKILLS
  // ============================================
  "databases": {
    triggers: {
      zh: ["数据库", "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis"],
      en: ["database", "sql", "mysql", "postgresql", "mongodb", "redis"],
    },
    expectedIntent: "create",
    excludedIntents: ["research"],
    requiredIntents: ["create", "debug"],
    priority: 6,
    category: "database",
    source: "claudekit",
  },

  // ============================================
  // AUTH SKILLS
  // ============================================
  "better-auth": {
    triggers: {
      zh: ["认证", "授权", "登录"],
      en: ["auth", "authentication", "authorization", "login", "jwt"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create", "debug"],
    priority: 6,
    category: "auth",
    source: "claudekit",
  },

  // ============================================
  // AI SKILLS
  // ============================================
  "ai-multimodal": {
    triggers: {
      zh: ["多模态", "图像理解", "视觉AI"],
      en: ["multimodal", "vision", "image understanding", "visual ai"],
    },
    expectedIntent: "unknown",
    excludedIntents: [],
    requiredIntents: [],
    priority: 5,
    category: "ai",
    source: "claudekit",
  },

  "google-adk-python": {
    triggers: {
      zh: ["Google ADK", "Python", "Google API"],
      en: ["google adk", "python", "google api"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 5,
    category: "ai",
    source: "claudekit",
  },

  // ============================================
  // E-COMMERCE SKILLS
  // ============================================
  "shopify": {
    triggers: {
      zh: ["Shopify", "电商", "在线商店"],
      en: ["shopify", "ecommerce", "online store"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 6,
    category: "ecommerce",
    source: "claudekit",
  },

  // ============================================
  // COMMUNICATION SKILLS
  // ============================================
  "internal-comms": {
    triggers: {
      zh: ["内部沟通", "通讯"],
      en: ["internal communication", "communication"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create", "document"],
    priority: 5,
    category: "communication",
    source: "community",
  },

  "meeting-insights-analyzer": {
    triggers: {
      zh: ["会议", "分析"],
      en: ["meeting", "analysis"],
    },
    expectedIntent: "analyze",
    excludedIntents: [],
    requiredIntents: ["analyze"],
    priority: 5,
    category: "communication",
    source: "community",
  },

  // ============================================
  // ANALYSIS SKILLS
  // ============================================
  "content-research-writer": {
    triggers: {
      zh: ["研究", "调研", "内容", "写作"],
      en: ["research", "content", "writing"],
    },
    expectedIntent: "research",
    excludedIntents: [],
    requiredIntents: ["research", "document"],
    priority: 5,
    category: "analysis",
    source: "community",
  },

  "lead-research-assistant": {
    triggers: {
      zh: ["线索", "调研"],
      en: ["lead", "research"],
    },
    expectedIntent: "research",
    excludedIntents: [],
    requiredIntents: ["research"],
    priority: 5,
    category: "analysis",
    source: "community",
  },

  "domain-name-brainstormer": {
    triggers: {
      zh: ["域名", "命名"],
      en: ["domain", "naming"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 4,
    category: "analysis",
    source: "community",
  },

  "developer-growth-analysis": {
    triggers: {
      zh: ["开发者", "成长", "分析"],
      en: ["developer", "growth", "analysis"],
    },
    expectedIntent: "analyze",
    excludedIntents: [],
    requiredIntents: ["analyze"],
    priority: 5,
    category: "analysis",
    source: "community",
  },

  "competitive-ads-extractor": {
    triggers: {
      zh: ["广告", "竞品"],
      en: ["ads", "advertisement", "competitor"],
    },
    expectedIntent: "research",
    excludedIntents: [],
    requiredIntents: ["research"],
    priority: 5,
    category: "analysis",
    source: "community",
  },

  // ============================================
  // FILE ORGANIZATION SKILLS
  // ============================================
  "file-organizer": {
    triggers: {
      zh: ["文件", "整理", "组织"],
      en: ["file", "organize", "organization"],
    },
    expectedIntent: "refactor",
    excludedIntents: [],
    requiredIntents: ["refactor"],
    priority: 5,
    category: "tools",
    source: "community",
  },

  "invoice-organizer": {
    triggers: {
      zh: ["发票", "账单"],
      en: ["invoice", "bill"],
    },
    expectedIntent: "convert",
    excludedIntents: [],
    requiredIntents: ["convert"],
    priority: 5,
    category: "tools",
    source: "community",
  },

  "raffle-winner-picker": {
    triggers: {
      zh: ["抽奖", "随机"],
      en: ["raffle", "random", "winner"],
    },
    expectedIntent: "create",
    excludedIntents: [],
    requiredIntents: ["create"],
    priority: 3,
    category: "tools",
    source: "community",
  },
};

/**
 * Get all skill names from the test data
 */
export function getAllSkillNames(): string[] {
  return Object.keys(SKILL_TEST_DATA);
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: string): string[] {
  return Object.entries(SKILL_TEST_DATA)
    .filter(([_, data]) => data.category === category)
    .map(([name]) => name);
}

/**
 * Get skills by source
 */
export function getSkillsBySource(source: SkillTestData["source"]): string[] {
  return Object.entries(SKILL_TEST_DATA)
    .filter(([_, data]) => data.source === source)
    .map(([name]) => name);
}

/**
 * Get skills by intent
 */
export function getSkillsByIntent(intent: string): string[] {
  return Object.entries(SKILL_TEST_DATA)
    .filter(([_, data]) =>
      data.requiredIntents.length === 0 || data.requiredIntents.includes(intent)
    )
    .map(([name]) => name);
}

/**
 * Get skill categories
 */
export function getSkillCategories(): string[] {
  const categories = new Set(
    Object.values(SKILL_TEST_DATA).map(data => data.category)
  );
  return Array.from(categories).sort();
}

/**
 * Get skill sources
 */
export function getSkillSources(): SkillTestData["source"][] {
  const sources = new Set(
    Object.values(SKILL_TEST_DATA).map(data => data.source)
  );
  return Array.from(sources);
}

/**
 * Total number of skills in test data
 */
export const TOTAL_SKILLS = getAllSkillNames().length;
