/**
 * Internationalization (i18n) Module
 *
 * Provides multi-language support for English and Chinese
 */

// ============================================
// Language Detection
// ============================================

export type Language = "en" | "zh" | "auto";

/**
 * Detects the language of a given text
 * Uses a simple heuristic based on character ranges
 */
export function detectLanguage(text: string): Language {
  if (!text || text.length === 0) return "en";

  // Count CJK characters (Chinese, Japanese, Korean)
  const cjkRegex = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g;
  const cjkMatches = text.match(cjkRegex) || [];
  const cjkCount = cjkMatches.length;

  // Count Latin characters
  const latinRegex = /[a-zA-Z]/g;
  const latinMatches = text.match(latinRegex) || [];
  const latinCount = latinMatches.length;

  // Simple threshold: if CJK > 30% of total alphabetic chars, treat as Chinese
  const totalAlpha = cjkCount + latinCount;
  if (totalAlpha === 0) return "en";

  const cjkRatio = cjkCount / totalAlpha;

  // Use 0.3 as threshold - if more than 30% CJK, classify as Chinese
  return cjkRatio > 0.3 ? "zh" : "en";
}

/**
 * Gets the localized text based on detected language
 */
export function t(
  key: string | TranslationKey,
  locale: "en" | "zh" = "en",
  fallbackText?: string
): string {
  const translations = TRANSLATIONS[locale];

  // Support nested key access (e.g., "error.pathTraversal")
  const keys = key.split(".");
  let result: any = translations;

  for (const k of keys) {
    result = result?.[k];
    if (result === undefined) break;
  }

  if (typeof result === "string") return result;

  // Fallback to English if translation not found
  const enResult = getEnglishTranslation(key);
  if (enResult) return enResult;

  // Final fallback
  return fallbackText || key;
}

/**
 * Helper to get English translation
 */
function getEnglishTranslation(key: string): string | null {
  const keys = key.split(".");
  let result: any = TRANSLATIONS.en;

  for (const k of keys) {
    result = result?.[k];
    if (result === undefined) return null;
  }

  return typeof result === "string" ? result : null;
}

// ============================================
// Translation Keys
// ============================================

export type TranslationKey =
  // Server
  | "server.starting"
  | "server.skillsDirs"
  | "server.scanningDir"
  | "server.directoryNotFound"
  | "server.symlinkSkipped"
  | "server.directoryAccessFailed"
  | "server.invalidEntryName"
  | "server.suspiciousPath"
  | "server.scanFailed"
  | "server.skillFound"
  | "server.skillLoadFailed"
  | "server.skillDuplicateSkipped"
  | "server.skillsLoaded"
  | "server.serverStarted"
  // Intent Detection
  | "intent.primary"
  | "intent.secondary"
  | "intent.noMatch"
  | "intent.unitTestScene"
  | "intent.integrationTestScene"
  // Skill Matching
  | "skill.matchResults"
  | "skill.noMatch"
  | "skill.excludedByIntent"
  | "skill.missingRequiredIntent"
  | "skill.excludedByWord"
  // Tool Responses
  | "response.noMatch"
  | "response.noMatchSuggestion"
  | "response.activated"
  | "response.instructions"
  | "response.deactivated"
  | "response.skillFreed"
  | "response.notActive"
  | "response.allDeactivated"
  | "response.hasActive"
  | "response.noActive"
  // Error Messages
  | "error.pathTraversal"
  | "error.symlinkEscape"
  | "error.validationFailed"
  // CLI
  | "cli.help.title"
  | "cli.help.subtitle"
  | "cli.help.usage"
  | "cli.help.commands"
  | "cli.help.examples"
  | "cli.bundles.title"
  | "cli.bundles.skills"
  | "cli.bundles.author"
  | "cli.bundles.invalid"
  | "cli.install.invalidName"
  | "cli.install.invalidPath"
  | "cli.install.notFound"
  | "cli.install.invalidFormat"
  | "cli.install.installing"
  | "cli.install.creatingDir"
  | "cli.install.skillsSection"
  | "cli.install.local"
  | "cli.install.notFoundShort"
  | "cli.install.pathValidationFailed"
  | "cli.install.installFailed"
  | "cli.install.plugin"
  | "cli.install.generatingIndex"
  | "cli.install.complete.title"
  | "cli.install.complete.bundle"
  | "cli.install.complete.skillCount"
  | "cli.install.complete.launch"
  | "cli.active.notInstalled"
  | "cli.active.suggestion"
  | "cli.active.title"
  | "cli.active.bundle"
  | "cli.active.installedAt"
  | "cli.active.installedSkills"
  // Validation
  | "validation.skillNameEmpty"
  | "validation.skillNameTooLong"
  | "validation.skillNameInvalid"
  | "validation.messageEmpty"
  | "validation.messageTooLong"
  | "validation.keywordEmpty"
  | "validation.keywordTooLong";

// ============================================
// Translation Dictionary
// ============================================

const TRANSLATIONS = {
  en: {
    // Server Messages
    server: {
      starting: "[Skills Controller] Starting...",
      skillsDirs: (dirs: string) => `[Skills Controller] Skills directories: ${dirs}`,
      scanningDir: (dir: string) => `[Skills Controller] Scanning directory: ${dir}`,
      directoryNotFound: (dir: string) => `[Skills Controller] Directory not found: ${dir}`,
      symlinkSkipped: (dir: string) => `[Skills Controller] Skipping symlink directory: ${dir}`,
      directoryAccessFailed: (dir: string) => `[Skills Controller] Cannot access directory: ${dir}`,
      invalidEntryName: (name: string) => `[Skills Controller] Skipping invalid directory name: ${name}`,
      suspiciousPath: (name: string) => `[Skills Controller] Skipping suspicious path: ${name}`,
      scanFailed: (dir: string) => `[Skills Controller] Failed to scan directory: ${dir}`,
      skillFound: (name: string) => `[Skills Controller] Found skill: ${name}`,
      skillLoadFailed: (name: string) => `[Skills Controller] Failed to load skill: ${name}`,
      skillDuplicateSkipped: (name: string) => `[Skills Controller] Skipping duplicate skill: ${name}`,
      skillsLoaded: (count: number) => `[Skills Controller] Loaded ${count} skills (after deduplication)`,
      serverStarted: "[Skills Controller] MCP Server started",
    },
    // Intent Detection
    intent: {
      primary: (intent: string) => `[Skills Controller] Detected intent: ${intent}`,
      secondary: (intents: string) => `[Skills Controller] Secondary intents: ${intents || "none"}`,
      noMatch: "[Skills Controller] No matching skills",
      unitTestScene: "[Skills Controller] Unit test writing scenario, using general programming capabilities",
      integrationTestScene: "[Skills Controller] Integration test writing scenario, using general programming capabilities",
    },
    // Skill Matching
    skill: {
      matchResults: (results: string) => `[Skills Controller] Match results: ${results}`,
      noMatch: "[Skills Controller] No matching skills",
      excludedByIntent: (skill: string, intent: string) => `[Skills Controller] ${skill} excluded by intent: ${intent}`,
      missingRequiredIntent: (skill: string, intents: string) => `[Skills Controller] ${skill} missing required intent (needs: ${intents})`,
      excludedByWord: (skill: string) => `[Skills Controller] ${skill} filtered by exclusion words`,
    },
    // Tool Responses
    response: {
      noMatch: "No matching skills found, using general mode",
      noMatchSuggestion: "Use search_skills or get_skill_index to see available skills",
      activated: (skills: string) => `Activated skills: ${skills}`,
      instructions: "Please process the user's request based on the activated skill content above. After completing the task, be sure to call deactivate_all_skills to release context space.",
      deactivated: (skill: string) => `${skill} deactivated`,
      skillFreed: "Skill usage complete, released.",
      notActive: "Skill is not currently active",
      allDeactivated: (count: number, skills: string) => count > 0
        ? `Skills [${skills}] usage complete, released.`
        : "No active skills currently.",
      hasActive: (skills: string) => `Active skills: ${skills}`,
      noActive: "No active skills currently.",
    },
    // Error Messages
    error: {
      pathTraversal: "Operation rejected: Invalid path",
      symlinkEscape: "Operation rejected: Invalid file reference",
      validationFailed: (details: string) => `Validation failed: ${details}`,
    },
    // CLI Messages
    cli: {
      help: {
        title: "Skills Controller CLI",
        subtitle: "Intelligent Skill Orchestration Controller - Claude Code Enhancement",
        usage: "Usage: skillscontroller <command> [options]",
        commands: "Commands:",
        examples: "Examples:",
      },
      bundles: {
        title: "Available Skill Bundles:",
        skills: (skills: string) => `Skills: ${skills}`,
        author: (author: string) => `Author: ${author}`,
        invalid: (name: string) => `Warning: Skipping invalid bundle: ${name}`,
      },
      install: {
        invalidName: "Error: Invalid bundle name",
        invalidPath: "Error: Invalid bundle path",
        notFound: (name: string) => `Error: Bundle '${name}' not found`,
        invalidFormat: "Error: Invalid bundle format",
        installing: (name: string, version: string) => `Installing bundle: ${name} v${version}`,
        creatingDir: "Created .claude/ directory",
        skillsSection: "Installing skills:",
        local: (name: string) => `${name} (local)`,
        notFoundShort: (name: string) => `${name} (skill files not found)`,
        pathValidationFailed: (name: string) => `${name} (path validation failed)`,
        installFailed: (name: string) => `${name} (installation failed)`,
        plugin: (name: string, plugin: string) => `${name} (plugin: ${plugin})`,
        generatingIndex: "Generated skill index",
        complete: {
          title: "Installation Complete!",
          bundle: (name: string) => `Bundle: ${name}`,
          skillCount: (count: number) => `Skills: ${count}`,
          launch: "Start Claude Code to use enhanced features:",
        },
      },
      active: {
        notInstalled: "No skill bundle installed in current project",
        suggestion: "Run 'skillscontroller init' to start installation",
        title: "Current Skills Configuration",
        bundle: (name: string, version: string) => `Bundle: ${name} v${version}`,
        installedAt: (date: string) => `Installed at: ${date}`,
        installedSkills: "Installed skills:",
      },
    },
    // Validation Messages
    validation: {
      skillNameEmpty: "Skill name cannot be empty",
      skillNameTooLong: (max: number) => `Skill name too long (max ${max} characters)`,
      skillNameInvalid: "Skill name can only contain letters, numbers, underscores and hyphens",
      messageEmpty: "Message cannot be empty",
      messageTooLong: (max: number) => `Message too long (max ${max} characters)`,
      keywordEmpty: "Keyword cannot be empty",
      keywordTooLong: (max: number) => `Keyword too long (max ${max} characters)`,
    },
  },
  zh: {
    // Server Messages
    server: {
      starting: "[Skills Controller] 启动中...",
      skillsDirs: (dirs: string) => `[Skills Controller] 技能目录: ${dirs}`,
      scanningDir: (dir: string) => `[Skills Controller] 扫描目录: ${dir}`,
      directoryNotFound: (dir: string) => `[Skills Controller] 技能目录不存在: ${dir}`,
      symlinkSkipped: (dir: string) => `[Skills Controller] 跳过符号链接目录: ${dir}`,
      directoryAccessFailed: (dir: string) => `[Skills Controller] 无法访问目录: ${dir}`,
      invalidEntryName: (name: string) => `[Skills Controller] 跳过无效目录名: ${name}`,
      suspiciousPath: (name: string) => `[Skills Controller] 跳过可疑路径: ${name}`,
      scanFailed: (dir: string) => `[Skills Controller] 扫描目录失败: ${dir}`,
      skillFound: (name: string) => `[Skills Controller] 发现技能: ${name}`,
      skillLoadFailed: (name: string) => `[Skills Controller] 加载技能失败: ${name}`,
      skillDuplicateSkipped: (name: string) => `[Skills Controller] 跳过重复技能: ${name}`,
      skillsLoaded: (count: number) => `[Skills Controller] 已加载 ${count} 个技能（去重后）`,
      serverStarted: "[Skills Controller] MCP 服务器已启动",
    },
    // Intent Detection
    intent: {
      primary: (intent: string) => `[Skills Controller] 识别意图: ${intent}`,
      secondary: (intents: string) => `次要: ${intents || "无"}`,
      noMatch: "[Skills Controller] 无匹配技能",
      unitTestScene: "[Skills Controller] 单元测试编写场景，使用通用编程能力",
      integrationTestScene: "[Skills Controller] 集成测试编写场景，使用通用编程能力",
    },
    // Skill Matching
    skill: {
      matchResults: (results: string) => `[Skills Controller] 匹配结果: ${results}`,
      noMatch: "[Skills Controller] 无匹配技能",
      excludedByIntent: (skill: string, intent: string) => `[Skills Controller] ${skill} 被意图排除: ${intent}`,
      missingRequiredIntent: (skill: string, intents: string) => `[Skills Controller] ${skill} 缺少必需意图 (需要: ${intents})`,
      excludedByWord: (skill: string) => `[Skills Controller] ${skill} 被排除词过滤`,
    },
    // Tool Responses
    response: {
      noMatch: "未匹配到相关技能，使用通用模式处理",
      noMatchSuggestion: "可以使用 search_skills 或 get_skill_index 查看可用技能",
      activated: (skills: string) => `已激活技能：${skills}`,
      instructions: "请根据以上激活的技能内容来处理用户请求。任务完成后，请务必调用 deactivate_all_skills 工具来停用技能并释放上下文空间。",
      deactivated: (skill: string) => `${skill} 已停用`,
      skillFreed: "技能使用完毕，已释放。",
      notActive: "技能未处于激活状态",
      allDeactivated: (count: number, skills: string) => count > 0
        ? `【${skills}】技能使用完毕，已释放。`
        : "当前没有激活的技能。",
      hasActive: (skills: string) => `当前激活的技能: ${skills}`,
      noActive: "当前没有激活的技能。",
    },
    // Error Messages
    error: {
      pathTraversal: "操作被拒绝：无效路径",
      symlinkEscape: "操作被拒绝：无效文件引用",
      validationFailed: (details: string) => `验证失败：${details}`,
    },
    // CLI Messages
    cli: {
      help: {
        title: "Skills Controller CLI",
        subtitle: "智能技能编排控制器 - Claude Code 增强",
        usage: "用法: skillscontroller <command> [options]",
        commands: "命令:",
        examples: "示例:",
      },
      bundles: {
        title: "可用技能包:",
        skills: (skills: string) => `技能: ${skills}`,
        author: (author: string) => `作者: ${author}`,
        invalid: (name: string) => `⚠ 跳过无效技能包: ${name}`,
      },
      install: {
        invalidName: "❌ 无效的技能包名称",
        invalidPath: "❌ 无效的技能包路径",
        notFound: (name: string) => `❌ 技能包 "${name}" 不存在`,
        invalidFormat: "❌ 技能包格式无效",
        installing: (name: string, version: string) => `🚀 安装技能包: ${name} v${version}`,
        creatingDir: "  ✓ 创建 .claude/ 目录",
        skillsSection: "📥 安装技能:",
        local: (name: string) => `  ✓ ${name} (本地)`,
        notFoundShort: (name: string) => `  ⚠ ${name} (技能文件不存在)`,
        pathValidationFailed: (name: string) => `  ⚠ ${name} (路径验证失败)`,
        installFailed: (name: string) => `  ⚠ ${name} (安装失败)`,
        plugin: (name: string, plugin: string) => `  ✓ ${name} (插件: ${plugin})`,
        generatingIndex: "  ✓ 生成技能索引",
        complete: {
          title: "安装完成!",
          bundle: (name: string) => `技能包: ${name}`,
          skillCount: (count: number) => `技能数: ${count}`,
          launch: "启动 Claude Code 即可使用增强功能:",
        },
      },
      active: {
        notInstalled: "⚠ 当前项目未安装技能包",
        suggestion: "运行 'skillscontroller init' 开始安装",
        title: "当前技能配置",
        bundle: (name: string, version: string) => `  技能包: ${name} v${version}`,
        installedAt: (date: string) => `  安装时间: ${date}`,
        installedSkills: "  已安装技能:",
      },
    },
    // Validation Messages
    validation: {
      skillNameEmpty: "技能名称不能为空",
      skillNameTooLong: (max: number) => `技能名称过长（最多 ${max} 个字符）`,
      skillNameInvalid: "技能名称只能包含字母、数字、下划线和连字符",
      messageEmpty: "消息不能为空",
      messageTooLong: (max: number) => `消息过长（最多 ${max} 个字符）`,
      keywordEmpty: "关键词不能为空",
      keywordTooLong: (max: number) => `关键词过长（最多 ${max} 个字符）`,
    },
  },
};

// Export a helper for formatted messages
export function formatMessage(key: string, params: Record<string, string | number>, locale?: "en" | "zh"): string {
  let template = t(key as any, locale);

  for (const [param, value] of Object.entries(params)) {
    template = template.replace(`{${param}}`, String(value));
  }

  return template;
}
