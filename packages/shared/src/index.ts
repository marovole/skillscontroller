/**
 * Shared Package 主入口
 * 导出所有共享的类型、数据和常量
 */

// 类型
export type {
  Category,
  Skill,
  SkillTriggerConfig,
  IntentPattern,
} from './types.js';

export { IntentType, SECURITY_LIMITS } from './types.js';

// 数据
export {
  EXTRA_TRIGGERS,
  SKILL_CONFIGS,
  SKILLS_REGISTRY,
} from './skills-data.js';

export {
  CATEGORIES,
  getCategoryById,
} from './categories.js';
