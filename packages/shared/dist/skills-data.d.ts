/**
 * 技能元数据
 * 注意:完整的数据应该从 mcp-server 的 skills-controller.ts 中提取
 * 这里提供基础结构和示例
 */
import type { Skill, SkillTriggerConfig } from './types.js';
/**
 * 额外的触发词映射（用于增强匹配）- 支持中英文
 * 完整数据在 packages/mcp-server/src/skills-controller.ts 的 EXTRA_TRIGGERS
 */
export declare const EXTRA_TRIGGERS: Record<string, {
    zh?: string[];
    en?: string[];
}>;
/**
 * 技能配置（意图感知）
 * 完整数据在 packages/mcp-server/src/skills-controller.ts 的 SKILL_CONFIGS
 */
export declare const SKILL_CONFIGS: Record<string, SkillTriggerConfig>;
/**
 * 技能列表 (供网站使用)
 * 从 EXTRA_TRIGGERS 生成
 */
export declare const SKILLS_REGISTRY: Skill[];
//# sourceMappingURL=skills-data.d.ts.map