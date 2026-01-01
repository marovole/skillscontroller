/**
 * 技能元数据
 * 注意:完整的数据应该从 mcp-server 的 skills-controller.ts 中提取
 * 这里提供基础结构和示例
 */
/**
 * 额外的触发词映射（用于增强匹配）- 支持中英文
 * 完整数据在 packages/mcp-server/src/skills-controller.ts 的 EXTRA_TRIGGERS
 */
export const EXTRA_TRIGGERS = {
    // 示例数据 - 完整数据需要从 MCP 服务迁移
    "frontend-design": {
        zh: ["设计", "UI", "样式", "组件", "页面", "布局", "CSS", "React", "Vue", "前端", "界面", "交互"],
        en: ["design", "ui", "styling", "component", "page", "layout", "css", "react", "vue", "frontend", "interface", "interaction"],
    },
    "webapp-testing": {
        zh: ["E2E", "e2e", "端到端测试", "playwright", "浏览器测试", "web测试", "前端测试", "自动化测试", "UI测试", "网页测试"],
        en: ["e2e", "end to end test", "playwright", "browser test", "web test", "frontend test", "automation test", "ui test"],
    },
    // ... 更多技能数据需要从原文件迁移
};
/**
 * 技能配置（意图感知）
 * 完整数据在 packages/mcp-server/src/skills-controller.ts 的 SKILL_CONFIGS
 */
export const SKILL_CONFIGS = {
    // 示例数据 - 完整数据需要从 MCP 服务迁移
    "frontend-design": {
        triggers: [
            { word: "设计", weight: 3 },
            { word: "UI", weight: 4 },
            { word: "界面", weight: 4 },
            { word: "组件", weight: 3 },
            { word: "页面", weight: 3 },
            { word: "布局", weight: 4 },
            { word: "CSS", weight: 3 },
            { word: "React", weight: 2 },
            { word: "Vue", weight: 2 },
            { word: "前端", weight: 2 },
            { word: "design", weight: 3 },
            { word: "interface", weight: 4 },
            { word: "component", weight: 3 },
            { word: "page", weight: 3 },
            { word: "layout", weight: 4 },
            { word: "frontend", weight: 2 },
        ],
        excludes: ["源码", "源代码", "实现原理", "怎么实现", "如何工作", "source code", "implementation"],
        requiredIntents: [],
        excludedIntents: [],
        priority: 6,
    },
    // ... 更多配置需要从原文件迁移
};
/**
 * 技能列表 (供网站使用)
 * 从 EXTRA_TRIGGERS 生成
 */
export const SKILLS_REGISTRY = Object.entries(EXTRA_TRIGGERS).map(([name, triggers]) => {
    const config = SKILL_CONFIGS[name];
    return {
        name,
        description: `技能: ${name}`, // 简化描述,实际应从 SKILL.md 读取
        category: 'frontend', // 简化分类,实际应根据技能配置
        priority: config?.priority || 5,
        triggers: [
            ...(triggers.zh || []),
            ...(triggers.en || []),
        ],
    };
});
//# sourceMappingURL=skills-data.js.map