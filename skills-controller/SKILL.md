---
name: skills-controller
description: |
  智能技能编排控制器。作为所有请求的第一响应者，分析用户意图并按需激活专业技能。
  当用户开始任何任务时，此控制器会自动识别最相关的技能并将其内容加载到上下文中，
  避免不相关技能占用宝贵的上下文空间。每次只激活 1-2 个最相关的技能。
---

# Skills Controller

智能技能编排系统，实现上下文感知的动态技能管理。

## 核心理念

```
传统模式:  所有 Skills → 全部加载 → 上下文膨胀
控制器模式: 用户意图 → 智能路由 → 精准激活
```

## 可用技能索引

### 前端开发类

| 技能 | 触发关键词 | 文件路径 |
|------|-----------|----------|
| frontend-design | 设计、UI、样式、组件、页面、布局 | `references/frontend-design.md` |
| canvas-design | 画布、图表、可视化、Canvas | `references/canvas-design.md` |

### 测试与质量类

| 技能 | 触发关键词 | 文件路径 |
|------|-----------|----------|
| webapp-testing | 测试、E2E、验证、Playwright | `references/webapp-testing.md` |
| code-review | 审查、review、PR、代码质量 | `references/code-review.md` |

### 工具开发类

| 技能 | 触发关键词 | 文件路径 |
|------|-----------|----------|
| mcp-builder | MCP、服务器、集成、工具开发 | `references/mcp-builder.md` |
| skill-creator | 创建技能、新技能、技能开发 | `references/skill-creator.md` |

### 内容与文档类

| 技能 | 触发关键词 | 文件路径 |
|------|-----------|----------|
| document-skills | 文档、Markdown、PDF、Word | `references/document-skills.md` |
| content-research | 研究、分析、调研、报告 | `references/content-research.md` |

## 路由协议

### 第一步：意图分析

当收到用户请求时，执行以下分析：

1. **提取关键词**：识别请求中的核心动词和名词
2. **匹配索引**：将关键词与上述触发关键词进行匹配
3. **确定优先级**：根据匹配度和任务紧迫性排序

### 第二步：技能激活

根据分析结果，读取相应的 `references/*.md` 文件：

```
匹配规则:
- 精确匹配: 直接激活对应技能
- 多重匹配: 激活优先级最高的 1-2 个技能
- 无匹配: 使用通用模式，不加载额外技能
```

### 第三步：执行任务

按照激活技能的指令执行用户任务。

### 第四步：上下文切换

当检测到以下情况时，释放当前技能：

- 用户明确切换话题（"现在我们来做..."）
- 任务类型发生根本变化
- 用户请求停用技能

## 使用示例

### 示例 1：前端开发请求

```
用户: "帮我设计一个登录页面"
分析: 检测到 "设计"、"页面" → 匹配 frontend-design
动作: 读取 references/frontend-design.md 并应用
```

### 示例 2：多技能场景

```
用户: "帮我设计一个页面，然后写测试"
分析: 检测到 "设计"、"页面"、"测试"
动作:
  1. 先激活 frontend-design 完成设计
  2. 设计完成后，停用 frontend-design
  3. 激活 webapp-testing 编写测试
```

### 示例 3：无匹配场景

```
用户: "解释一下什么是 REST API"
分析: 未匹配任何专业技能
动作: 使用通用知识回答，不加载额外技能
```

## 状态报告

在每次激活技能后，简要报告当前状态：

```
[Skills Controller] 已激活: frontend-design
[Skills Controller] 原因: 检测到关键词 "设计", "页面"
```

## 高级功能

### 预设组合

对于常见场景，可以一次激活预设的技能组合：

| 预设 | 包含技能 | 适用场景 |
|------|---------|---------|
| fullstack-react | frontend-design, webapp-testing | React 全栈开发 |
| quality-review | code-review, webapp-testing | 代码质量保障 |
| content-creation | document-skills, content-research | 内容创作 |

激活预设：当用户提到上述预设名称时，一次性激活组合中的所有技能。

### 手动控制

用户可以手动控制技能：

- "激活 [技能名]" → 强制激活指定技能
- "停用 [技能名]" → 强制停用指定技能
- "当前技能" → 显示当前激活的技能列表
- "清空技能" → 停用所有技能

## 注意事项

1. **保持轻量**：每次最多激活 2 个技能
2. **及时释放**：任务完成后主动释放技能
3. **避免冲突**：同类技能不要同时激活
4. **尊重用户**：用户的手动控制优先于自动路由
