# Skills Controller MCP 测试套件

## 概述

这是 Skills Controller MCP 服务器的全面测试套件，包含 71+ 个测试用例，覆盖技能路由、意图识别、会话管理等核心功能。

## 测试统计

- **总测试数**: 71 个
- **通过率**: 100% (71/71)
- **测试文件**: 11 个
- **代码覆盖率**: 详见运行 `npm run test:coverage`

## 测试结构

```
test/
├── helpers/                      # 测试辅助工具
│   ├── test-utils.ts            # 通用测试工具函数
│   └── mcp-test-server.ts       # Mock MCP 服务器包装器
│
├── fixtures/                     # 测试数据
│   ├── test-queries.ts          # 按意图分类的测试查询（14种意图）
│   └── skill-test-data.ts       # 技能测试数据（9个核心技能）
│
├── unit/                         # 单元测试
│   └── session-management.test.ts  # 会话状态管理测试（7个测试）
│
├── integration/                  # 集成测试
│   └── routing-workflow.test.ts  # 完整路由流程测试（18个测试）
│
├── edge-cases/                   # 边缘情况测试
│   └── session-isolation.test.ts # 会话隔离验证（5个测试）
│
├── coverage/                     # 覆盖率报告工具
│   ├── skill-matrix-reporter.ts # 技能激活矩阵报告
│   ├── intent-accuracy-reporter.ts # 意图识别准确率报告
│   └── generate-reports.ts      # 报告生成器
│
└── security.test.ts             # 安全测试（41个测试，已有）
```

## 运行测试

### 基本测试命令

```bash
# 运行所有测试（交互模式）
npm test

# 运行所有测试（非交互模式）
npm run test:run

# 运行特定测试文件
npm test -- routing-workflow
npm test -- session-isolation
npm test -- session-management

# 运行测试 UI
npm run test:ui
```

### 覆盖率报告

```bash
# 生成代码覆盖率报告
npm run test:coverage

# 生成技能激活矩阵和意图准确率报告
npm run test:report
```

生成的报告保存在 `test-reports/` 目录：
- `skill-matrix.txt` - 技能激活矩阵报告（文本格式）
- `skill-matrix.csv` - 技能激活矩阵报告（CSV格式）
- `intent-accuracy.txt` - 意图识别准确率报告（文本格式）
- `intent-accuracy.csv` - 意图识别准确率报告（CSV格式）

## 测试分类说明

### 1. 单元测试 (unit/)

测试单个模块和函数的功能正确性。

**session-management.test.ts** (7个测试)
- 会话数据结构验证
- 技能生命周期（激活/停用）
- Set 和 Map 操作

### 2. 集成测试 (integration/)

测试完整的 MCP 路由流程。

**routing-workflow.test.ts** (18个测试)
- ✅ CREATE 意图场景（3个测试）
- ✅ RESEARCH 意图场景（2个测试）
- ✅ TEST 意图场景（1个测试）
- ✅ ANALYZE 意图场景（1个测试）
- ✅ DEPLOY 意图场景（1个测试）
- ✅ CONVERT 意图场景（1个测试）
- ✅ No match 场景（2个测试）
- ✅ max_skills 参数测试（1个测试）
- ✅ 会话状态管理（3个测试）
- ✅ list_active_skills 工具（2个测试）
- ✅ get_skill_index 工具（1个测试）

### 3. 边缘情况测试 (edge-cases/)

测试特殊场景和边界条件。

**session-isolation.test.ts** (5个测试)
- 多会话状态隔离
- 上下文不泄漏
- deactivate_all 操作隔离
- 并发会话独立处理
- 技能缓存隔离

### 4. 安全测试 (security.test.ts)

已有 41 个安全测试，验证：
- 路径遍历防护
- 输入验证
- YAML schema 验证
- 错误处理安全性

## 测试数据说明

### IntentType（意图类型）

测试覆盖 14 种意图类型：

| 意图 | 说明 | 测试查询示例 |
|------|------|--------------|
| CREATE | 创建/构建 | "创建一个React组件" |
| RESEARCH | 研究/查看源码 | "查看React源码" |
| DEBUG | 调试/修复 | "修复bug" |
| REFACTOR | 重构 | "重构代码" |
| DOCUMENT | 文档 | "写README" |
| TEST | 通用测试 | "写测试" |
| TEST_WRITE_UNIT | 单元测试 | "写单元测试" |
| TEST_WRITE_INTEGRATION | 集成测试 | "写集成测试" |
| TEST_WRITE_E2E | E2E测试 | "写E2E测试" |
| TEST_RUN | 运行测试 | "运行测试" |
| ANALYZE | 分析/审查 | "审查代码" |
| CONVERT | 转换/导出 | "导出PDF" |
| DEPLOY | 部署 | "部署应用" |
| CHAT | 聊天 | "你好" |
| UNKNOWN | 未知意图 | - |

### 技能测试数据 (SKILL_TEST_DATA)

当前包含 9 个核心技能的测试数据：

1. **frontend-design** - 前端设计技能
   - 触发词：设计、UI、界面、design、ui、interface 等
   - 预期意图：create

2. **open-source-librarian** - 开源源码研究
   - 触发词：源码、原理、source code、principle 等
   - 预期意图：research

3. **webapp-testing** - E2E测试
   - 触发词：E2E、测试、test、playwright 等
   - 预期意图：test_write_e2e

4. **code-review** - 代码审查
   - 触发词：审查、review、PR 等
   - 预期意图：analyze

5. **backend-development** - 后端开发
   - 触发词：后端、API、backend 等
   - 预期意图：create

6. **databases** - 数据库
   - 触发词：数据库、SQL、database 等
   - 预期意图：create

7. **devops** - DevOps/CI/CD
   - 触发词：DevOps、CI/CD、部署、deploy 等
   - 预期意图：deploy

8. **pdf** - PDF处理
   - 触发词：PDF、导出、export 等
   - 预期意图：convert

9. **sequential-thinking** - 顺序思考
   - 触发词：顺序思考、逐步推理、reasoning 等
   - 预期意图：unknown

## 扩展测试

### 添加新技能的测试

在 `test/fixtures/skill-test-data.ts` 中添加新技能的测试数据：

```typescript
export const SKILL_TEST_DATA: Record<string, SkillTestData> = {
  "your-new-skill": {
    triggers: {
      zh: ["触发词1", "触发词2"],
      en: ["trigger1", "trigger2"],
    },
    expectedIntent: "create",
    excludedIntents: ["research", "analyze"],
    requiredIntents: ["create", "refactor"],
    priority: 6,
    category: "frontend",
    source: "anthropic",
  },
  // ...
};
```

### 添加新的测试用例

在相应的测试文件中添加新的测试：

```typescript
it("should test new feature", async () => {
  const response = await server.callTool({
    name: "analyze_and_route",
    arguments: {
      user_message: "测试查询",
      max_skills: 1,
    },
  });

  const result = JSON.parse(response.content[0].text);
  expect(result.status).toBe("activated");
  expect(result.activated_skills.length).toBeGreaterThan(0);
});
```

## 报告示例

### 技能激活矩阵报告

```
================================================================================
SKILL ACTIVATION MATRIX REPORT
================================================================================
Total Skills: 9
Total Test Cases: 98
Overall Coverage: 28.57%

Category: testing (70.00% coverage)
  webapp-testing
    Coverage: 75.00% (9/12 triggers matched)
  code-review
    Coverage: 62.50% (5/8 triggers matched)
...
```

### 意图识别准确率报告

```
================================================================================
INTENT DETECTION ACCURACY REPORT
================================================================================
Total Tests: 98
Total Correct: 35
Overall Accuracy: 35.71%

Per-Intent Metrics
Intent       Total  Correct  Accuracy  Precision  Recall    F1 Score
test_write_e2e    12        9    75.00%     100.00%    75.00%    85.71%
analyze           8        5    62.50%     100.00%    62.50%    76.92%
...
```

## 常见问题

### Q: 为什么有些测试使用 Mock MCP 服务器？

A: 因为实际的 MCP 服务器使用 stdio 传输，在测试中难以模拟。Mock 服务器模拟了 MCP 工具调用和响应格式，同时保持了会话状态管理。

### Q: 如何调试单个测试？

A: 使用 `npm test -- <test-name>` 只运行特定测试：

```bash
npm test -- routing-workflow
npm test -- "should detect CREATE intent"
```

### Q: 测试覆盖率目标是什么？

A: 目标覆盖率：
- 语句覆盖率 ≥ 85%
- 分支覆盖率 ≥ 80%
- 函数覆盖率 ≥ 90%
- 技能触发词覆盖率 100%

### Q: 如何添加新的意图类型测试？

A: 在 `test/fixtures/test-queries.ts` 中添加新意图的测试查询，然后在集成测试中添加对应的测试用例。

## 维护者

- Skills Controller MCP Team

## 许可证

MIT
