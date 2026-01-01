/**
 * Shared Types for Skills Controller
 * 这些类型在 MCP 服务和网站中都会使用
 */
/**
 * 用户意图类型枚举
 */
export declare enum IntentType {
    CREATE = "create",// 创建新内容（界面、组件、文件等）
    RESEARCH = "research",// 研究、查看、学习源码
    DEBUG = "debug",// 调试、修复bug
    REFACTOR = "refactor",// 重构、优化代码
    DOCUMENT = "document",// 编写文档
    TEST = "test",// 编写/运行测试（通用，向后兼容）
    TEST_WRITE_UNIT = "test_write_unit",// 编写单元测试
    TEST_WRITE_INTEGRATION = "test_write_integration",// 编写集成测试
    TEST_WRITE_E2E = "test_write_e2e",// 编写E2E测试
    TEST_RUN = "test_run",// 运行测试
    DEPLOY = "deploy",// 部署、发布
    ANALYZE = "analyze",// 分析、审查代码
    CONVERT = "convert",// 转换格式
    CHAT = "chat",// 闲聊、问答
    UNKNOWN = "unknown"
}
/**
 * 意图识别模式
 */
export interface IntentPattern {
    intent: IntentType;
    patterns: RegExp[];
    weight: number;
}
/**
 * 增强的技能配置
 */
export interface SkillTriggerConfig {
    triggers?: {
        word: string;
        weight: number;
    }[];
    excludes?: string[];
    requiredIntents?: IntentType[];
    excludedIntents?: IntentType[];
    priority?: number;
}
/**
 * 分类定义
 */
export interface Category {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    icon: string;
}
/**
 * 技能元数据
 */
export interface Skill {
    name: string;
    description: string;
    category: string;
    priority: number;
    triggers: string[];
    source?: 'anthropic' | 'claudekit' | 'community' | 'composio' | 'voltagent';
}
/**
 * 安全限制常量
 */
export declare const SECURITY_LIMITS: {
    readonly MAX_USER_MESSAGE_LENGTH: 10000;
    readonly MAX_SKILL_NAME_LENGTH: 100;
    readonly MAX_KEYWORD_LENGTH: 200;
    readonly MAX_SKILLS_ACTIVATION: 5;
    readonly MAX_PATH_DEPTH: 10;
};
//# sourceMappingURL=types.d.ts.map