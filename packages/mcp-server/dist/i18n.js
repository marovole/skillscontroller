/**
 * Internationalization (i18n) Module
 *
 * Provides multi-language support for English and Chinese
 */
/**
 * Detects the language of a given text
 * Uses a simple heuristic based on character ranges
 */
export function detectLanguage(text) {
    if (!text || text.length === 0)
        return "en";
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
    if (totalAlpha === 0)
        return "en";
    const cjkRatio = cjkCount / totalAlpha;
    // Use 0.3 as threshold - if more than 30% CJK, classify as Chinese
    return cjkRatio > 0.3 ? "zh" : "en";
}
/**
 * Gets the localized text based on detected language
 */
export function t(key, locale = "en", fallbackText) {
    const translations = TRANSLATIONS[locale];
    // Support nested key access (e.g., "error.pathTraversal")
    const keys = key.split(".");
    let result = translations;
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined)
            break;
    }
    if (typeof result === "string")
        return result;
    // Fallback to English if translation not found
    const enResult = getEnglishTranslation(key);
    if (enResult)
        return enResult;
    // Final fallback
    return fallbackText || key;
}
/**
 * Helper to get English translation
 */
function getEnglishTranslation(key) {
    const keys = key.split(".");
    let result = TRANSLATIONS.en;
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined)
            return null;
    }
    return typeof result === "string" ? result : null;
}
// ============================================
// Translation Dictionary
// ============================================
const TRANSLATIONS = {
    en: {
        // Server Messages
        server: {
            starting: "[Skills Controller] Starting...",
            skillsDirs: (dirs) => `[Skills Controller] Skills directories: ${dirs}`,
            scanningDir: (dir) => `[Skills Controller] Scanning directory: ${dir}`,
            directoryNotFound: (dir) => `[Skills Controller] Directory not found: ${dir}`,
            symlinkSkipped: (dir) => `[Skills Controller] Skipping symlink directory: ${dir}`,
            directoryAccessFailed: (dir) => `[Skills Controller] Cannot access directory: ${dir}`,
            invalidEntryName: (name) => `[Skills Controller] Skipping invalid directory name: ${name}`,
            suspiciousPath: (name) => `[Skills Controller] Skipping suspicious path: ${name}`,
            scanFailed: (dir) => `[Skills Controller] Failed to scan directory: ${dir}`,
            skillFound: (name) => `[Skills Controller] Found skill: ${name}`,
            skillLoadFailed: (name) => `[Skills Controller] Failed to load skill: ${name}`,
            skillDuplicateSkipped: (name) => `[Skills Controller] Skipping duplicate skill: ${name}`,
            skillsLoaded: (count) => `[Skills Controller] Loaded ${count} skills (after deduplication)`,
            serverStarted: "[Skills Controller] MCP Server started",
        },
        // Intent Detection
        intent: {
            primary: (intent) => `[Skills Controller] Detected intent: ${intent}`,
            secondary: (intents) => `[Skills Controller] Secondary intents: ${intents || "none"}`,
            noMatch: "[Skills Controller] No matching skills",
            unitTestScene: "[Skills Controller] Unit test writing scenario, using general programming capabilities",
            integrationTestScene: "[Skills Controller] Integration test writing scenario, using general programming capabilities",
        },
        // Skill Matching
        skill: {
            matchResults: (results) => `[Skills Controller] Match results: ${results}`,
            noMatch: "[Skills Controller] No matching skills",
            excludedByIntent: (skill, intent) => `[Skills Controller] ${skill} excluded by intent: ${intent}`,
            missingRequiredIntent: (skill, intents) => `[Skills Controller] ${skill} missing required intent (needs: ${intents})`,
            excludedByWord: (skill) => `[Skills Controller] ${skill} filtered by exclusion words`,
        },
        // Tool Responses
        response: {
            noMatch: "No matching skills found, using general mode",
            noMatchSuggestion: "Use search_skills or get_skill_index to see available skills",
            activated: (skills) => `Activated skills: ${skills}`,
            instructions: "Please process the user's request based on the activated skill content above. After completing the task, be sure to call deactivate_all_skills to release context space.",
            deactivated: (skill) => `${skill} deactivated`,
            skillFreed: "Skill usage complete, released.",
            notActive: "Skill is not currently active",
            allDeactivated: (count, skills) => count > 0
                ? `Skills [${skills}] usage complete, released.`
                : "No active skills currently.",
            hasActive: (skills) => `Active skills: ${skills}`,
            noActive: "No active skills currently.",
        },
        // Error Messages
        error: {
            pathTraversal: "Operation rejected: Invalid path",
            symlinkEscape: "Operation rejected: Invalid file reference",
            validationFailed: (details) => `Validation failed: ${details}`,
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
                skills: (skills) => `Skills: ${skills}`,
                author: (author) => `Author: ${author}`,
                invalid: (name) => `Warning: Skipping invalid bundle: ${name}`,
            },
            install: {
                invalidName: "Error: Invalid bundle name",
                invalidPath: "Error: Invalid bundle path",
                notFound: (name) => `Error: Bundle '${name}' not found`,
                invalidFormat: "Error: Invalid bundle format",
                installing: (name, version) => `Installing bundle: ${name} v${version}`,
                creatingDir: "Created .claude/ directory",
                skillsSection: "Installing skills:",
                local: (name) => `${name} (local)`,
                notFoundShort: (name) => `${name} (skill files not found)`,
                pathValidationFailed: (name) => `${name} (path validation failed)`,
                installFailed: (name) => `${name} (installation failed)`,
                plugin: (name, plugin) => `${name} (plugin: ${plugin})`,
                generatingIndex: "Generated skill index",
                complete: {
                    title: "Installation Complete!",
                    bundle: (name) => `Bundle: ${name}`,
                    skillCount: (count) => `Skills: ${count}`,
                    launch: "Start Claude Code to use enhanced features:",
                },
            },
            active: {
                notInstalled: "No skill bundle installed in current project",
                suggestion: "Run 'skillscontroller init' to start installation",
                title: "Current Skills Configuration",
                bundle: (name, version) => `Bundle: ${name} v${version}`,
                installedAt: (date) => `Installed at: ${date}`,
                installedSkills: "Installed skills:",
            },
        },
        // Validation Messages
        validation: {
            skillNameEmpty: "Skill name cannot be empty",
            skillNameTooLong: (max) => `Skill name too long (max ${max} characters)`,
            skillNameInvalid: "Skill name can only contain letters, numbers, underscores and hyphens",
            messageEmpty: "Message cannot be empty",
            messageTooLong: (max) => `Message too long (max ${max} characters)`,
            keywordEmpty: "Keyword cannot be empty",
            keywordTooLong: (max) => `Keyword too long (max ${max} characters)`,
        },
    },
    zh: {
        // Server Messages
        server: {
            starting: "[Skills Controller] 启动中...",
            skillsDirs: (dirs) => `[Skills Controller] 技能目录: ${dirs}`,
            scanningDir: (dir) => `[Skills Controller] 扫描目录: ${dir}`,
            directoryNotFound: (dir) => `[Skills Controller] 技能目录不存在: ${dir}`,
            symlinkSkipped: (dir) => `[Skills Controller] 跳过符号链接目录: ${dir}`,
            directoryAccessFailed: (dir) => `[Skills Controller] 无法访问目录: ${dir}`,
            invalidEntryName: (name) => `[Skills Controller] 跳过无效目录名: ${name}`,
            suspiciousPath: (name) => `[Skills Controller] 跳过可疑路径: ${name}`,
            scanFailed: (dir) => `[Skills Controller] 扫描目录失败: ${dir}`,
            skillFound: (name) => `[Skills Controller] 发现技能: ${name}`,
            skillLoadFailed: (name) => `[Skills Controller] 加载技能失败: ${name}`,
            skillDuplicateSkipped: (name) => `[Skills Controller] 跳过重复技能: ${name}`,
            skillsLoaded: (count) => `[Skills Controller] 已加载 ${count} 个技能（去重后）`,
            serverStarted: "[Skills Controller] MCP 服务器已启动",
        },
        // Intent Detection
        intent: {
            primary: (intent) => `[Skills Controller] 识别意图: ${intent}`,
            secondary: (intents) => `次要: ${intents || "无"}`,
            noMatch: "[Skills Controller] 无匹配技能",
            unitTestScene: "[Skills Controller] 单元测试编写场景，使用通用编程能力",
            integrationTestScene: "[Skills Controller] 集成测试编写场景，使用通用编程能力",
        },
        // Skill Matching
        skill: {
            matchResults: (results) => `[Skills Controller] 匹配结果: ${results}`,
            noMatch: "[Skills Controller] 无匹配技能",
            excludedByIntent: (skill, intent) => `[Skills Controller] ${skill} 被意图排除: ${intent}`,
            missingRequiredIntent: (skill, intents) => `[Skills Controller] ${skill} 缺少必需意图 (需要: ${intents})`,
            excludedByWord: (skill) => `[Skills Controller] ${skill} 被排除词过滤`,
        },
        // Tool Responses
        response: {
            noMatch: "未匹配到相关技能，使用通用模式处理",
            noMatchSuggestion: "可以使用 search_skills 或 get_skill_index 查看可用技能",
            activated: (skills) => `已激活技能：${skills}`,
            instructions: "请根据以上激活的技能内容来处理用户请求。任务完成后，请务必调用 deactivate_all_skills 工具来停用技能并释放上下文空间。",
            deactivated: (skill) => `${skill} 已停用`,
            skillFreed: "技能使用完毕，已释放。",
            notActive: "技能未处于激活状态",
            allDeactivated: (count, skills) => count > 0
                ? `【${skills}】技能使用完毕，已释放。`
                : "当前没有激活的技能。",
            hasActive: (skills) => `当前激活的技能: ${skills}`,
            noActive: "当前没有激活的技能。",
        },
        // Error Messages
        error: {
            pathTraversal: "操作被拒绝：无效路径",
            symlinkEscape: "操作被拒绝：无效文件引用",
            validationFailed: (details) => `验证失败：${details}`,
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
                skills: (skills) => `技能: ${skills}`,
                author: (author) => `作者: ${author}`,
                invalid: (name) => `⚠ 跳过无效技能包: ${name}`,
            },
            install: {
                invalidName: "❌ 无效的技能包名称",
                invalidPath: "❌ 无效的技能包路径",
                notFound: (name) => `❌ 技能包 "${name}" 不存在`,
                invalidFormat: "❌ 技能包格式无效",
                installing: (name, version) => `🚀 安装技能包: ${name} v${version}`,
                creatingDir: "  ✓ 创建 .claude/ 目录",
                skillsSection: "📥 安装技能:",
                local: (name) => `  ✓ ${name} (本地)`,
                notFoundShort: (name) => `  ⚠ ${name} (技能文件不存在)`,
                pathValidationFailed: (name) => `  ⚠ ${name} (路径验证失败)`,
                installFailed: (name) => `  ⚠ ${name} (安装失败)`,
                plugin: (name, plugin) => `  ✓ ${name} (插件: ${plugin})`,
                generatingIndex: "  ✓ 生成技能索引",
                complete: {
                    title: "安装完成!",
                    bundle: (name) => `技能包: ${name}`,
                    skillCount: (count) => `技能数: ${count}`,
                    launch: "启动 Claude Code 即可使用增强功能:",
                },
            },
            active: {
                notInstalled: "⚠ 当前项目未安装技能包",
                suggestion: "运行 'skillscontroller init' 开始安装",
                title: "当前技能配置",
                bundle: (name, version) => `  技能包: ${name} v${version}`,
                installedAt: (date) => `  安装时间: ${date}`,
                installedSkills: "  已安装技能:",
            },
        },
        // Validation Messages
        validation: {
            skillNameEmpty: "技能名称不能为空",
            skillNameTooLong: (max) => `技能名称过长（最多 ${max} 个字符）`,
            skillNameInvalid: "技能名称只能包含字母、数字、下划线和连字符",
            messageEmpty: "消息不能为空",
            messageTooLong: (max) => `消息过长（最多 ${max} 个字符）`,
            keywordEmpty: "关键词不能为空",
            keywordTooLong: (max) => `关键词过长（最多 ${max} 个字符）`,
        },
    },
};
// Export a helper for formatted messages
export function formatMessage(key, params, locale) {
    let template = t(key, locale);
    for (const [param, value] of Object.entries(params)) {
        template = template.replace(`{${param}}`, String(value));
    }
    return template;
}
//# sourceMappingURL=i18n.js.map