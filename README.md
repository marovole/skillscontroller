# Claude Code Skills Hub

> Claude Code 技能收录与场景化打包平台 - 汇集 GitHub 高星开源项目的精选技能

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Skills](https://img.shields.io/badge/Skills-200+-green)](#技能来源)
[![Static Site](https://img.shields.io/badge/Static-Astro-orange)](https://astro.build/)

---

## 项目简介

**Claude Code Skills Hub** 是一个静态网站，专注于收录和整理 Claude Code 技能。本项目的核心功能包括：

1. **技能分类与过滤** - 按领域分类浏览技能
2. **场景化技能包** - 针对不同使用场景提供打包下载
3. **安装指导** - 提供详细的技能安装说明

---

## 技能来源

**所有技能均来自 GitHub 高星开源项目，本项目仅做聚合展示。**

| 项目 | Stars | 技能数 | 许可证 |
|:---:|:---:|:---:|:---:|
| [![Superpowers](https://github.githubassets.com/favicons/favicon.svg) Superpowers](https://github.com/obra/superpowers) | [![13k](https://img.shields.io/badge/⭐-13k-blue)](https://github.com/obra/superpowers) | 14 | MIT |
| [![Anthropic Skills](https://github.githubassets.com/favicons/favicon.svg) Anthropic Skills](https://github.com/anthropics/anthropic-skills) | - | 16+ | MIT |
| [![Awesome Claude Skills](https://github.githubassets.com/favicons/favicon.svg) Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills) | 3.9k | 25+ | MIT |
| [![ClaudeKit](https://github.githubassets.com/favicons/favicon.svg) ClaudeKit](https://github.com/mrgoonie/claudekit-skills) | 1.1k | 39 | MIT |
| [![Scientific Skills](https://github.githubassets.com/favicons/favicon.svg) Scientific Skills](https://github.com/K-Dense-AI/claude-scientific-skills) | 2.9k | 138 | MIT |
| [![Deep Research](https://github.githubassets.com/favicons/favicon.svg) Deep Research](https://github.com/liangdabiao/Claude-Code-Deep-Research-main) | 55 | 5 | - |
| [![superpowers-marketplace](https://github.githubassets.com/favicons/favicon.svg) superpowers-marketplace](https://github.com/obra/superpowers-marketplace) | 51 forks | TBD | MIT |
| [![superpowers-lab](https://github.githubassets.com/favicons/favicon.svg) superpowers-lab](https://github.com/obra/superpowers-lab) | 7 forks | TBD | MIT |

---

## 场景化技能包

针对不同使用场景，我们提供以下预打包的技能组合：

### 1. 前端开发者套件
适合前端工程师，包含 UI 设计、组件开发、响应式布局等技能。

**包含技能**：`frontend-design`, `modern-frontend-design`, `canvas-design`, `theme-factory`, `webapp-testing`

### 2. 全栈开发者套件
覆盖前后端开发全流程，适合全栈工程师。

**包含技能**：`frontend-design`, `backend-development`, `database-design`, `devops`, `webapp-testing`, `code-review`

### 3. 文档生产套件
专注于文档生成和处理，适合技术写作者。

**包含技能**：`doc-coauthoring`, `docx`, `pdf`, `pptx`, `xlsx`, `changelog-generator`

### 4. DevOps 工程师套件
CI/CD、容器化、部署自动化相关技能。

**包含技能**：`devops`, `docker`, `mcp-builder`, `skill-creator`

### 5. 内容创作套件
适合内容创作者和营销人员。

**包含技能**：`content-research-writer`, `brand-guidelines`, `internal-comms`, `slack-gif-creator`

### 6. 研究分析套件
深度研究和数据分析相关技能。

**包含技能**：`lead-research-assistant`, `developer-growth-analysis`, `competitive-ads-extractor`

### 7. 媒体处理套件
图片、视频等媒体文件处理。

**包含技能**：`image-enhancer`, `video-downloader`, `canvas-design`, `algorithmic-art`

### 8. 效率工具套件
提升日常工作效率的实用技能。

**包含技能**：`file-organizer`, `invoice-organizer`, `meeting-insights-analyzer`, `raffle-winner-picker`, `domain-name-brainstormer`

---

## 如何使用技能

### 方式一：直接下载（推荐）

1. 访问 [Skills Hub 网站](https://skillscontroller.pages.dev)
2. 浏览或搜索感兴趣的技能
3. 点击下载单个技能或整个场景包
4. 将下载的文件放入 Claude Code 项目的 `.claude/` 目录

### 方式二：手动安装

```bash
# 克隆本仓库
git clone https://github.com/marovole/skillscontroller.git

# 复制需要的技能到你的项目
cp -r skillscontroller/anthropic-skills/skills/frontend-design ~/.claude/skills/
```

### 方式三：使用 git submodule

```bash
# 在你的项目中添加技能库
git submodule add https://github.com/anthropics/anthropic-skills.git .claude/anthropic-skills
```

---

## 技能目录结构

```
your-project/
└── .claude/
    ├── commands/           # 斜杠命令
    └── skills/             # 技能文件
        ├── frontend-design/
        │   └── SKILL.md
        ├── backend-development/
        │   └── SKILL.md
        └── ...
```

---

## 项目结构

```
skillscontroller/
├── packages/
│   └── website/                 # Astro 静态网站
│       ├── src/
│       │   ├── components/      # UI 组件
│       │   ├── data/            # 技能数据和场景包定义
│       │   ├── pages/           # 页面路由
│       │   └── styles/          # 样式文件
│       └── public/              # 静态资源
├── anthropic-skills/            # Anthropic 官方技能 (submodule)
├── awesome-claude-skills/       # 社区精选技能 (submodule)
├── claudekit-skills/            # ClaudeKit 技能 (submodule)
├── composio-skills/             # Composio 技能 (submodule)
├── scientific-skills/           # Scientific Skills 科学技能库 (submodule)
└── voltagent-skills/            # VoltAgent 技能 (submodule)
```

---

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

---

## 技能分类

| 分类 | 说明 | 技能数 |
|------|------|--------|
| **前端开发** | UI 设计、组件、响应式布局 | 6 |
| **后端开发** | API、数据库、认证 | 4 |
| **测试质量** | E2E 测试、代码审查 | 3 |
| **DevOps** | CI/CD、Docker、部署 | 3 |
| **文档处理** | PDF、Word、PPT、Excel | 6 |
| **媒体处理** | 图片、视频、GIF | 4 |
| **内容创作** | 品牌、沟通、研究 | 5 |
| **工具集成** | MCP、浏览器自动化 | 4 |
| **效率提升** | 文件整理、会议分析 | 5 |
| **科学研究** | 生物信息、化学、医学 | 138 |

---

## 贡献指南

欢迎贡献新技能或改进现有技能！

### 贡献方式

1. **发现优质技能** - 如果发现 GitHub 上有优质的 Claude Code 技能库，欢迎提 Issue 告知我们
2. **改进网站** - 欢迎提交 PR 改进网站功能和用户体验
3. **报告问题** - 如发现技能问题或网站 Bug，请提交 Issue

### 技能格式规范

每个技能应包含一个 `SKILL.md` 文件：

```markdown
---
name: skill-name
description: 技能简短描述
author: 作者名
license: MIT
---

# 技能名称

## 使用场景
描述何时使用此技能

## 操作指南
1. 步骤一
2. 步骤二

## 示例
提供使用示例
```

---

## 致谢

本项目的所有技能内容均来自以下优秀的开源项目：

| 项目 | 作者 | 链接 |
|------|------|------|
| **superpowers** | [obra](https://github.com/obra) | [github.com/obra/superpowers](https://github.com/obra/superpowers) |
| **superpowers-marketplace** | [obra](https://github.com/obra) | [github.com/obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) |
| **superpowers-lab** | [obra](https://github.com/obra) | [github.com/obra/superpowers-lab](https://github.com/obra/superpowers-lab) |
| **anthropic-skills** | [Anthropic](https://github.com/anthropics) | [github.com/anthropics/anthropic-skills](https://github.com/anthropics/anthropic-skills) |
| **awesome-claude-skills** | [ComposioHQ](https://github.com/ComposioHQ) | [github.com/ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) |
| **claudekit-skills** | [mrgoonie](https://github.com/mrgoonie) | [github.com/mrgoonie/claudekit-skills](https://github.com/mrgoonie/claudekit-skills) |
| **claude-scientific-skills** | [K-Dense AI](https://github.com/K-Dense-AI) | [github.com/K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills) |
| **Claude-Code-Deep-Research-main** | [liangdabiao](https://github.com/liangdabiao) | [github.com/liangdabiao/Claude-Code-Deep-Research-main](https://github.com/liangdabiao/Claude-Code-Deep-Research-main) |

**特别说明**：本项目仅为技能聚合展示平台，所有技能的版权归各自原作者所有。

---

## 相关资源

- [Claude Code 官方文档](https://docs.anthropic.com/claude/docs/claude-code)
- [skillsmp.com](https://skillsmp.com) - Anthropic 官方推荐平台
- [claudemarketplaces.com](https://claudemarketplaces.com) - 技能展示目录

---

## 许可证

MIT License - 详见 [LICENSE](./LICENSE)

---

## 作者

**marovole** - [GitHub](https://github.com/marovole)

---

## 链接

- [GitHub 仓库](https://github.com/marovole/skillscontroller)
- [问题反馈](https://github.com/marovole/skillscontroller/issues)
- [在线网站](https://skillscontroller.pages.dev)

---

**让每一次 Claude Code 对话都拥有专家级能力**
