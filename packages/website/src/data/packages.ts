export interface SkillPackage {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  skills: string[];
  recommended: boolean;
}

export const skillPackages: SkillPackage[] = [
  {
    id: 'frontend-developer',
    name: '前端开发者套件',
    nameEn: 'Frontend Developer Kit',
    description: '适合前端工程师，包含 UI 设计、组件开发、响应式布局等技能',
    icon: '🎨',
    skills: [
      'frontend-design',
      'modern-frontend-design',
      'canvas-design',
      'theme-factory',
      'webapp-testing',
      'react-components'
    ],
    recommended: true
  },
  {
    id: 'fullstack-developer',
    name: '全栈开发者套件',
    nameEn: 'Fullstack Developer Kit',
    description: '覆盖前后端开发全流程，适合全栈工程师',
    icon: '⚡',
    skills: [
      'frontend-design',
      'backend-development',
      'database-design',
      'devops',
      'webapp-testing',
      'code-review'
    ],
    recommended: true
  },
  {
    id: 'document-production',
    name: '文档生产套件',
    nameEn: 'Document Production Kit',
    description: '专注于文档生成和处理，适合技术写作者',
    icon: '📄',
    skills: [
      'doc-coauthoring',
      'docx',
      'pdf',
      'pptx',
      'xlsx',
      'document-skills'
    ],
    recommended: true
  },
  {
    id: 'devops-engineer',
    name: 'DevOps 工程师套件',
    nameEn: 'DevOps Engineer Kit',
    description: 'CI/CD、容器化、部署自动化相关技能',
    icon: '🚀',
    skills: [
      'devops',
      'docker',
      'mcp-builder',
      'skill-creator'
    ],
    recommended: false
  },
  {
    id: 'content-creator',
    name: '内容创作套件',
    nameEn: 'Content Creator Kit',
    description: '适合内容创作者和营销人员',
    icon: '✍️',
    skills: [
      'content-research-writer',
      'brand-guidelines',
      'internal-comms',
      'slack-gif-creator',
      'changelog-generator'
    ],
    recommended: false
  },
  {
    id: 'research-analyst',
    name: '研究分析套件',
    nameEn: 'Research Analyst Kit',
    description: '深度研究和数据分析相关技能',
    icon: '📊',
    skills: [
      'lead-research-assistant',
      'developer-growth-analysis',
      'competitive-ads-extractor',
      'meeting-insights-analyzer'
    ],
    recommended: false
  },
  {
    id: 'media-processing',
    name: '媒体处理套件',
    nameEn: 'Media Processing Kit',
    description: '图片、视频等媒体文件处理',
    icon: '🎬',
    skills: [
      'image-enhancer',
      'video-downloader',
      'canvas-design',
      'algorithmic-art',
      'slack-gif-creator'
    ],
    recommended: false
  },
  {
    id: 'productivity-tools',
    name: '效率工具套件',
    nameEn: 'Productivity Tools Kit',
    description: '提升日常工作效率的实用技能',
    icon: '⚡',
    skills: [
      'file-organizer',
      'invoice-organizer',
      'meeting-insights-analyzer',
      'raffle-winner-picker',
      'domain-name-brainstormer'
    ],
    recommended: false
  },
  {
    id: 'mcp-developer',
    name: 'MCP 开发者套件',
    nameEn: 'MCP Developer Kit',
    description: 'Model Context Protocol 服务器和工具开发',
    icon: '🔧',
    skills: [
      'mcp-builder',
      'skill-creator',
      'browser-automation'
    ],
    recommended: false
  },
  {
    id: 'testing-qa',
    name: '测试与质量保障套件',
    nameEn: 'Testing & QA Kit',
    description: '自动化测试、代码审查、质量保障',
    icon: '✅',
    skills: [
      'webapp-testing',
      'code-review',
      'browser-automation'
    ],
    recommended: false
  },
  {
    id: 'backend-specialist',
    name: '后端专家套件',
    nameEn: 'Backend Specialist Kit',
    description: 'API 设计、数据库、认证授权相关技能',
    icon: '⚙️',
    skills: [
      'backend-development',
      'database-design',
      'devops'
    ],
    recommended: false
  },
  {
    id: 'design-system',
    name: '设计系统套件',
    nameEn: 'Design System Kit',
    description: 'UI 设计、主题、品牌相关技能',
    icon: '🎭',
    skills: [
      'frontend-design',
      'modern-frontend-design',
      'theme-factory',
      'brand-guidelines',
      'canvas-design'
    ],
    recommended: false
  }
];

export function getRecommendedPackages(): SkillPackage[] {
  return skillPackages.filter(pkg => pkg.recommended);
}

export function getPackageById(id: string): SkillPackage | undefined {
  return skillPackages.find(pkg => pkg.id === id);
}

export function getPackagesBySkill(skillId: string): SkillPackage[] {
  return skillPackages.filter(pkg => pkg.skills.includes(skillId));
}
