/**
 * 分类定义
 * 从 website/src/data/categories.ts 迁移
 */

import type { Category } from './types.js';

export const CATEGORIES: Category[] = [
  {
    id: 'frontend',
    name: '前端开发',
    nameEn: 'Frontend',
    description: 'UI 设计、组件开发、样式系统',
    icon: '🎨'
  },
  {
    id: 'backend',
    name: '后端开发',
    nameEn: 'Backend',
    description: 'API、数据库、服务端架构',
    icon: '⚙️'
  },
  {
    id: 'testing',
    name: '测试质量',
    nameEn: 'Testing',
    description: 'E2E 测试、代码审查、质量保障',
    icon: '✅'
  },
  {
    id: 'devops',
    name: 'DevOps',
    nameEn: 'DevOps',
    description: '部署、CI/CD、容器化',
    icon: '🚀'
  },
  {
    id: 'document',
    name: '文档处理',
    nameEn: 'Documentation',
    description: '文档生成、办公文件处理',
    icon: '📄'
  },
  {
    id: 'media',
    name: '媒体处理',
    nameEn: 'Media',
    description: '图片、视频、音频处理',
    icon: '🎬'
  },
  {
    id: 'thinking',
    name: '思维方法',
    nameEn: 'Thinking',
    description: '问题分析、决策辅助',
    icon: '🧠'
  },
  {
    id: 'tools',
    name: '开发工具',
    nameEn: 'Tools',
    description: 'MCP、工具开发、自动化',
    icon: '🛠️'
  }
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(cat => cat.id === id);
}
