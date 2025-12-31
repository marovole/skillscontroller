/**
 * MCP Server 测试脚本
 *
 * 测试 skills-controller MCP 服务器的功能
 */

import { spawn, ChildProcess } from "child_process";
import * as readline from "readline";

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: number;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number;
  result?: unknown;
  error?: {
    code: number;
    message: string;
  };
}

class MCPTestClient {
  private process: ChildProcess;
  private requestId = 0;
  private pendingRequests: Map<number, (response: JsonRpcResponse) => void> = new Map();
  private rl: readline.Interface | null = null;

  constructor(serverPath: string) {
    this.process = spawn("node", [serverPath], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    if (this.process.stdout) {
      this.rl = readline.createInterface({
        input: this.process.stdout,
        crlfDelay: Infinity,
      });

      this.rl.on("line", (line) => {
        try {
          const response = JSON.parse(line) as JsonRpcResponse;
          const resolver = this.pendingRequests.get(response.id);
          if (resolver) {
            resolver(response);
            this.pendingRequests.delete(response.id);
          }
        } catch (e) {
          // 忽略非 JSON 行
        }
      });
    }

    if (this.process.stderr) {
      this.process.stderr.on("data", (data) => {
        console.log("[Server Log]", data.toString().trim());
      });
    }
  }

  async send(method: string, params?: Record<string, unknown>): Promise<JsonRpcResponse> {
    const id = ++this.requestId;
    const request: JsonRpcRequest = {
      jsonrpc: "2.0",
      id,
      method,
      params,
    };

    return new Promise((resolve) => {
      this.pendingRequests.set(id, resolve);
      if (this.process.stdin) {
        this.process.stdin.write(JSON.stringify(request) + "\n");
      }

      // 超时处理
      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          resolve({
            jsonrpc: "2.0",
            id,
            error: { code: -1, message: "Timeout" },
          });
        }
      }, 5000);
    });
  }

  close() {
    this.process.kill();
  }
}

async function runTests() {
  console.log("═".repeat(60));
  console.log("  Skills Controller MCP Server 测试");
  console.log("═".repeat(60));
  console.log();

  const client = new MCPTestClient("./dist/skills-controller.js");

  // 等待服务器启动
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 测试 1: 初始化
  console.log("📋 测试 1: 初始化连接");
  const initResponse = await client.send("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test-client", version: "1.0.0" },
  });
  console.log("  结果:", initResponse.result ? "✅ 成功" : "❌ 失败");
  console.log();

  // 测试 2: 列出工具
  console.log("📋 测试 2: 列出可用工具");
  const toolsResponse = await client.send("tools/list", {});
  if (toolsResponse.result) {
    const tools = (toolsResponse.result as { tools: Array<{ name: string; description: string }> }).tools;
    console.log("  可用工具:");
    tools?.forEach((tool) => {
      console.log(`    • ${tool.name}`);
    });
    console.log("  结果: ✅ 成功");
  } else {
    console.log("  结果: ❌ 失败", toolsResponse.error);
  }
  console.log();

  // 测试 3: 获取技能索引
  console.log("📋 测试 3: 获取技能索引");
  const indexResponse = await client.send("tools/call", {
    name: "get_skill_index",
    arguments: {},
  });
  if (indexResponse.result) {
    const content = (indexResponse.result as { content: Array<{ text: string }> }).content;
    if (content && content[0]) {
      const data = JSON.parse(content[0].text);
      console.log("  技能数量:", data.total);
      console.log("  技能列表:");
      data.skills?.forEach((s: { name: string; category: string }) => {
        console.log(`    • ${s.name} (${s.category})`);
      });
    }
    console.log("  结果: ✅ 成功");
  } else {
    console.log("  结果: ❌ 失败", indexResponse.error);
  }
  console.log();

  // 测试 4: 分析并路由
  console.log("📋 测试 4: 分析用户意图并路由");
  const routeResponse = await client.send("tools/call", {
    name: "analyze_and_route",
    arguments: {
      user_message: "帮我设计一个漂亮的登录页面",
      skills_directory: "./awesome-claude-skills",
      max_skills: 2,
    },
  });
  if (routeResponse.result) {
    const content = (routeResponse.result as { content: Array<{ text: string }> }).content;
    if (content && content[0]) {
      const data = JSON.parse(content[0].text);
      console.log("  状态:", data.status);
      console.log("  激活的技能:");
      data.activated_skills?.forEach((s: { name: string; match_reason: string[] }) => {
        console.log(`    • ${s.name} (匹配: ${s.match_reason.join(", ")})`);
      });
    }
    console.log("  结果: ✅ 成功");
  } else {
    console.log("  结果: ❌ 失败", routeResponse.error);
  }
  console.log();

  // 测试 5: 列出激活的技能
  console.log("📋 测试 5: 列出当前激活的技能");
  const activeResponse = await client.send("tools/call", {
    name: "list_active_skills",
    arguments: {},
  });
  if (activeResponse.result) {
    const content = (activeResponse.result as { content: Array<{ text: string }> }).content;
    if (content && content[0]) {
      const data = JSON.parse(content[0].text);
      console.log("  激活的技能:", data.active_skills?.join(", ") || "无");
    }
    console.log("  结果: ✅ 成功");
  } else {
    console.log("  结果: ❌ 失败", activeResponse.error);
  }
  console.log();

  // 测试 6: 停用技能
  console.log("📋 测试 6: 停用技能");
  const deactivateResponse = await client.send("tools/call", {
    name: "deactivate_skill",
    arguments: {
      skill_name: "frontend-design",
    },
  });
  if (deactivateResponse.result) {
    const content = (deactivateResponse.result as { content: Array<{ text: string }> }).content;
    if (content && content[0]) {
      const data = JSON.parse(content[0].text);
      console.log("  状态:", data.status);
      console.log("  剩余激活:", data.remaining_active?.join(", ") || "无");
    }
    console.log("  结果: ✅ 成功");
  } else {
    console.log("  结果: ❌ 失败", deactivateResponse.error);
  }
  console.log();

  console.log("═".repeat(60));
  console.log("  测试完成！");
  console.log("═".repeat(60));

  client.close();
}

runTests().catch(console.error);
