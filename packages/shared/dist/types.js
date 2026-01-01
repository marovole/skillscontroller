/**
 * Shared Types for Skills Controller
 * 这些类型在 MCP 服务和网站中都会使用
 */
/**
 * 用户意图类型枚举
 */
export var IntentType;
(function (IntentType) {
    IntentType["CREATE"] = "create";
    IntentType["RESEARCH"] = "research";
    IntentType["DEBUG"] = "debug";
    IntentType["REFACTOR"] = "refactor";
    IntentType["DOCUMENT"] = "document";
    IntentType["TEST"] = "test";
    IntentType["TEST_WRITE_UNIT"] = "test_write_unit";
    IntentType["TEST_WRITE_INTEGRATION"] = "test_write_integration";
    IntentType["TEST_WRITE_E2E"] = "test_write_e2e";
    IntentType["TEST_RUN"] = "test_run";
    IntentType["DEPLOY"] = "deploy";
    IntentType["ANALYZE"] = "analyze";
    IntentType["CONVERT"] = "convert";
    IntentType["CHAT"] = "chat";
    IntentType["UNKNOWN"] = "unknown";
})(IntentType || (IntentType = {}));
/**
 * 安全限制常量
 */
export const SECURITY_LIMITS = {
    MAX_USER_MESSAGE_LENGTH: 10000,
    MAX_SKILL_NAME_LENGTH: 100,
    MAX_KEYWORD_LENGTH: 200,
    MAX_SKILLS_ACTIVATION: 5,
    MAX_PATH_DEPTH: 10,
};
//# sourceMappingURL=types.js.map