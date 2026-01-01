export interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
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
  },
  // === 科学技能分类 (K-Dense Scientific Skills) ===
  {
    id: 'bioinformatics',
    name: '生物信息学',
    nameEn: 'Bioinformatics',
    description: '基因组学、序列分析、单细胞分析',
    icon: '🧬'
  },
  {
    id: 'chemistry',
    name: '化学信息学',
    nameEn: 'Cheminformatics',
    description: '分子设计、药物发现、化学分析',
    icon: '🧪'
  },
  {
    id: 'clinical',
    name: '临床研究',
    nameEn: 'Clinical Research',
    description: '临床试验、精准医疗、变异解读',
    icon: '🏥'
  },
  {
    id: 'ml',
    name: '机器学习',
    nameEn: 'Machine Learning',
    description: '深度学习、统计建模、模型解释',
    icon: '🤖'
  },
  {
    id: 'proteomics',
    name: '蛋白质组学',
    nameEn: 'Proteomics',
    description: '质谱分析、蛋白质鉴定',
    icon: '🔬'
  },
  {
    id: 'physics',
    name: '物理与量子',
    nameEn: 'Physics & Quantum',
    description: '量子计算、天文学、物理模拟',
    icon: '🌌'
  },
  {
    id: 'materials',
    name: '材料科学',
    nameEn: 'Materials Science',
    description: '晶体结构、材料性质预测',
    icon: '💎'
  },
  {
    id: 'scientific-db',
    name: '科学数据库',
    nameEn: 'Scientific Databases',
    description: 'PubMed、UniProt、ChEMBL 等',
    icon: '📚'
  }
];
