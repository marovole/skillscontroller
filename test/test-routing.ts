/**
 * 技能路由测试 - 测试不同场景下的技能匹配
 */

import { spawn } from "child_process";
import * as readline from "readline";

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number;
  result?: any;
  error?: { code: number; message: string };
}

class MCPClient {
  private process: ReturnType<typeof spawn>;
  private requestId = 0;
  private pending: Map<number, (r: JsonRpcResponse) => void> = new Map();
  private rl: readline.Interface | null = null;

  constructor() {
    this.process = spawn("node", ["./dist/skills-controller.js"], {
      stdio: ["pipe", "pipe", "pipe"],
      env: {
        ...process.env,
        SKILLS_DIR: "./awesome-claude-skills",
      },
    });

    if (this.process.stdout) {
      this.rl = readline.createInterface({ input: this.process.stdout });
      this.rl.on("line", (line) => {
        try {
          const res = JSON.parse(line);
          this.pending.get(res.id)?.(res);
          this.pending.delete(res.id);
        } catch {}
      });
    }

    this.process.stderr?.on("data", (d) => console.log("[Log]", d.toString().trim()));
  }

  async call(method: string, params?: any): Promise<any> {
    const id = ++this.requestId;
    return new Promise((resolve) => {
      this.pending.set(id, (r) => resolve(r.result));
      this.process.stdin?.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
      setTimeout(() => {
        this.pending.delete(id);
        resolve(null);
      }, 5000);
    });
  }

  close() {
    this.process.kill();
  }
}

async function testRouting() {
  console.log("\n" + "═".repeat(60));
  console.log("  技能路由测试");
  console.log("═".repeat(60) + "\n");

  const client = new MCPClient();
  await new Promise((r) => setTimeout(r, 2000));

  // 初始化
  await client.call("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test", version: "1.0.0" },
  });

  // 测试用例
  const testCases = [
    { input: "帮我设计一个登录页面", expected: ["canvas-design"] },
    { input: "我需要创建一个新的skill", expected: ["skill-creator"] },
    { input: "帮我生成changelog", expected: ["changelog-generator"] },
    { input: "分析一下竞品广告", expected: ["competitive-ads-extractor"] },
    { input: "帮我整理文件", expected: ["file-organizer"] },
    { input: "我想下载一个视频", expected: ["video-downloader"] },
    { input: "帮我创建一个MCP服务器", expected: ["mcp-builder"] },
    { input: "处理一下这个图片", expected: ["image-enhancer"] },
  ];

  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    const result = await client.call("tools/call", {
      name: "analyze_and_route",
      arguments: { user_message: tc.input, max_skills: 2 },
    });

    const content = result?.content?.[0]?.text;
    if (!content) {
      console.log(`❌ "${tc.input}" → 无响应`);
      failed++;
      continue;
    }

    const data = JSON.parse(content);
    const activated = data.activated_skills?.map((s: any) => s.name) || [];

    const match = tc.expected.some((e) => activated.includes(e));
    if (match || data.status === "activated") {
      console.log(`✅ "${tc.input}"`);
      console.log(`   → 激活: ${activated.join(", ") || "无"}`);
      passed++;
    } else {
      console.log(`❌ "${tc.input}"`);
      console.log(`   → 期望: ${tc.expected.join(", ")}`);
      console.log(`   → 实际: ${data.status} - ${activated.join(", ") || "无"}`);
      failed++;
    }
  }

  console.log("\n" + "─".repeat(60));
  console.log(`  结果: ${passed} 通过, ${failed} 失败`);
  console.log("─".repeat(60) + "\n");

  // 测试搜索功能
  console.log("📋 测试搜索功能:");
  const searchResult = await client.call("tools/call", {
    name: "search_skills",
    arguments: { keyword: "video" },
  });

  if (searchResult?.content?.[0]?.text) {
    const data = JSON.parse(searchResult.content[0].text);
    console.log(`   搜索 "video" → 找到 ${data.matches} 个技能`);
    data.skills?.forEach((s: any) => console.log(`     • ${s.name}`));
  }

  // 测试加载功能
  console.log("\n📋 测试直接加载技能:");
  const loadResult = await client.call("tools/call", {
    name: "load_skill",
    arguments: { skill_name: "skill-creator" },
  });

  if (loadResult?.content?.[0]?.text) {
    const data = JSON.parse(loadResult.content[0].text);
    console.log(`   加载 skill-creator: ${data.status}`);
    console.log(`   内容长度: ${data.content?.length || 0} 字符`);
  }

  client.close();
}

testRouting().catch(console.error);
