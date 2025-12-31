/**
 * Skills Controller MCP Server
 *
 * 智能技能编排控制器 - 根据上下文动态激活/停用技能
 * 自动扫描并加载技能库中的所有技能
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";

// ============================================
// 配置
// ============================================

// 技能库目录（支持多个目录，用逗号分隔）
// 优先级：Anthropic 官方 > ClaudeKit > 社区
const DEFAULT_SKILLS_DIRS = [
  path.join(process.cwd(), "anthropic-skills", "skills"),
  path.join(process.cwd(), "claudekit-skills", ".claude", "skills"),
  path.join(process.cwd(), "awesome-claude-skills"),
];

const SKILLS_DIRS: string[] = process.env.SKILLS_DIR
  ? process.env.SKILLS_DIR.split(",").map(d => d.trim())
  : DEFAULT_SKILLS_DIRS;

// 额外的触发词映射（用于增强匹配）
const EXTRA_TRIGGERS: Record<string, string[]> = {
  // === Anthropic 官方技能 ===
  "algorithmic-art": ["算法艺术", "生成艺术", "generative", "art", "艺术", "算法绘画", "procedural"],
  "doc-coauthoring": ["协作", "coauthor", "共同编辑", "文档协作", "协同写作"],
  "docx": ["Word", "文档", "docx", "doc", "Microsoft Word", "办公文档"],
  "pdf": ["PDF", "pdf文件", "导出PDF", "PDF生成", "便携文档"],
  "pptx": ["PPT", "演示文稿", "PowerPoint", "幻灯片", "slides", "presentation"],
  "xlsx": ["Excel", "电子表格", "spreadsheet", "表格", "数据分析", "xlsx"],
  "web-artifacts-builder": ["web artifacts", "网页工件", "HTML生成", "网页构建"],
  "frontend-design": ["设计", "UI", "样式", "组件", "页面", "布局", "CSS", "React", "Vue", "前端", "界面", "交互"],

  // === ClaudeKit 独有技能 ===
  "aesthetic": ["美学", "审美", "视觉风格", "aesthetic", "设计感"],
  "ai-multimodal": ["多模态", "图像理解", "视觉AI", "multimodal", "vision"],
  "backend-development": ["后端", "服务端", "API开发", "backend", "server"],
  "better-auth": ["认证", "授权", "登录", "auth", "authentication", "JWT"],
  "chrome-devtools": ["Chrome", "DevTools", "浏览器调试", "开发者工具"],
  "claude-code": ["Claude Code", "CLI", "命令行"],
  "collision-zone-thinking": ["碰撞思维", "问题分析", "矛盾分析"],
  "context-engineering": ["上下文工程", "prompt工程", "提示词"],
  "databases": ["数据库", "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis"],
  "defense-in-depth": ["深度防御", "安全策略", "多层防护"],
  "devops": ["DevOps", "CI/CD", "部署", "运维", "Docker", "K8s"],
  "docs-seeker": ["文档搜索", "API文档", "查文档"],
  "frontend-development": ["前端开发", "JavaScript", "TypeScript", "框架"],
  "google-adk-python": ["Google ADK", "Python", "Google API"],
  "inversion-exercise": ["逆向思维", "反向推理"],
  "mcp-management": ["MCP管理", "服务器管理"],
  "media-processing": ["媒体处理", "音视频", "转码", "剪辑"],
  "mermaidjs-v11": ["Mermaid", "流程图", "时序图", "图表绘制"],
  "meta-pattern-recognition": ["模式识别", "元认知", "规律发现"],
  "repomix": ["代码库", "仓库分析", "代码统计"],
  "root-cause-tracing": ["根因分析", "问题追踪", "故障排查"],
  "scale-game": ["规模化", "扩展性", "性能优化"],
  "sequential-thinking": ["顺序思考", "逐步推理", "step-by-step"],
  "shopify": ["Shopify", "电商", "在线商店"],
  "simplification-cascades": ["简化", "降复杂度", "重构"],
  "systematic-debugging": ["系统调试", "debug", "排错"],
  "ui-styling": ["UI样式", "CSS", "样式设计"],
  "verification-before-completion": ["验证", "检查", "确认完成"],
  "web-frameworks": ["Web框架", "Express", "Fastify", "Koa", "Next.js"],
  "when-stuck": ["卡住", "stuck", "困难", "求助"],

  // === 社区技能 ===
  "webapp-testing": ["测试", "test", "验证", "E2E", "单元测试", "集成测试", "playwright"],
  "code-review": ["审查", "review", "PR", "代码质量", "bug", "安全"],
  "mcp-builder": ["MCP", "服务器", "集成", "工具开发", "API"],
  "skill-creator": ["创建技能", "新技能", "技能开发", "skill"],
  "document-skills": ["文档", "Markdown", "PDF", "Word", "文件"],
  "canvas-design": ["画布", "图表", "可视化", "Canvas", "图形"],
  "artifacts-builder": ["artifacts", "构建", "生成器"],
  "brand-guidelines": ["品牌", "指南", "风格", "brand"],
  "content-research-writer": ["研究", "调研", "内容", "写作"],
  "changelog-generator": ["changelog", "更新日志", "版本"],
  "image-enhancer": ["图片", "图像", "增强", "image"],
  "file-organizer": ["文件", "整理", "组织", "organize"],
  "invoice-organizer": ["发票", "invoice", "账单"],
  "meeting-insights-analyzer": ["会议", "meeting", "分析"],
  "lead-research-assistant": ["线索", "lead", "调研"],
  "domain-name-brainstormer": ["域名", "domain", "命名"],
  "developer-growth-analysis": ["开发者", "成长", "分析"],
  "internal-comms": ["内部沟通", "通讯", "communication"],
  "slack-gif-creator": ["slack", "gif", "动图"],
  "video-downloader": ["视频", "下载", "video"],
  "theme-factory": ["主题", "theme", "皮肤"],
  "raffle-winner-picker": ["抽奖", "raffle", "随机"],
  "competitive-ads-extractor": ["广告", "竞品", "ads"],
};

// ============================================
// 类型定义
// ============================================

interface SkillMeta {
  name: string;
  description: string;
  triggers: string[];
  category: string;
  priority: number;
  path: string;        // 技能文件路径
  loaded: boolean;     // 是否已加载完整内容
}

interface ControllerState {
  activeSkills: Set<string>;
  context: string;
  lastAnalysis: Date;
}

// ============================================
// 全局状态
// ============================================

let SKILL_REGISTRY: SkillMeta[] = [];
const skillContentCache: Map<string, string> = new Map();
const state: ControllerState = {
  activeSkills: new Set(),
  context: "",
  lastAnalysis: new Date(),
};

// ============================================
// 技能扫描和加载
// ============================================

/**
 * 解析 SKILL.md 的 YAML frontmatter
 */
function parseFrontmatter(content: string): { name: string; description: string } | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = match[1];
  const nameMatch = frontmatter.match(/name:\s*(.+)/);
  const descMatch = frontmatter.match(/description:\s*[|>]?\s*([\s\S]*?)(?=\n\w+:|$)/);

  if (!nameMatch) return null;

  return {
    name: nameMatch[1].trim(),
    description: descMatch ? descMatch[1].trim().split("\n")[0] : "",
  };
}

/**
 * 推断技能分类
 */
function inferCategory(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();

  if (text.includes("frontend") || text.includes("ui") || text.includes("design") || text.includes("css")) {
    return "frontend";
  }
  if (text.includes("test") || text.includes("验证")) {
    return "testing";
  }
  if (text.includes("review") || text.includes("quality") || text.includes("审查")) {
    return "quality";
  }
  if (text.includes("mcp") || text.includes("tool") || text.includes("build")) {
    return "tooling";
  }
  if (text.includes("document") || text.includes("文档") || text.includes("content")) {
    return "content";
  }
  if (text.includes("image") || text.includes("video") || text.includes("media")) {
    return "media";
  }
  return "general";
}

/**
 * 扫描技能目录，加载所有技能的元数据（支持嵌套目录）
 */
async function scanSkillsDirectory(baseDir: string, maxDepth: number = 2): Promise<SkillMeta[]> {
  const skills: SkillMeta[] = [];

  if (!fs.existsSync(baseDir)) {
    console.error(`[Skills Controller] 技能目录不存在: ${baseDir}`);
    return skills;
  }

  // 递归扫描函数
  function scanDir(dir: string, depth: number) {
    if (depth > maxDepth) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith(".")) continue;
      if (entry.name === "common" || entry.name === "references" || entry.name === "scripts") continue;

      const skillDir = path.join(dir, entry.name);
      const skillFile = path.join(skillDir, "SKILL.md");

      if (fs.existsSync(skillFile)) {
        // 找到技能，处理它
        processSkill(entry.name, skillFile);
      } else {
        // 没有 SKILL.md，尝试递归扫描子目录
        scanDir(skillDir, depth + 1);
      }
    }
  }

  function processSkill(name: string, skillFile: string) {
    try {
      const content = fs.readFileSync(skillFile, "utf-8");
      const meta = parseFrontmatter(content);

      if (!meta) return;

      // 获取触发词
      const triggers = EXTRA_TRIGGERS[name] || [];

      // 从描述中提取额外关键词
      const descWords = meta.description
        .split(/[\s,，、]+/)
        .filter(w => w.length > 1 && w.length < 10);

      const allTriggers = [...new Set([...triggers, ...descWords, name])];

      skills.push({
        name: name,
        description: meta.description || `${name} 技能`,
        triggers: allTriggers,
        category: inferCategory(name, meta.description),
        priority: 5,
        path: skillFile,
        loaded: false,
      });

      console.error(`[Skills Controller] 发现技能: ${name}`);
    } catch (error) {
      console.error(`[Skills Controller] 加载技能失败: ${name}`, error);
    }
  }

  // 开始扫描
  scanDir(baseDir, 0);

  return skills;
}

/**
 * 加载技能的完整内容
 */
async function loadSkillContent(skillName: string): Promise<string> {
  // 检查缓存
  if (skillContentCache.has(skillName)) {
    return skillContentCache.get(skillName)!;
  }

  const skill = SKILL_REGISTRY.find(s => s.name === skillName);
  if (!skill) {
    return `[Error: 技能 "${skillName}" 未注册]`;
  }

  try {
    const content = fs.readFileSync(skill.path, "utf-8");
    skillContentCache.set(skillName, content);
    skill.loaded = true;
    return content;
  } catch (error) {
    return `[Error: 无法读取技能文件 "${skill.path}"]`;
  }
}

// ============================================
// 意图分析
// ============================================

/**
 * 分析用户输入，识别需要的技能
 */
function analyzeContext(userMessage: string): SkillMeta[] {
  const messageLower = userMessage.toLowerCase();
  const matchedSkills: { skill: SkillMeta; score: number }[] = [];

  for (const skill of SKILL_REGISTRY) {
    let score = 0;

    for (const trigger of skill.triggers) {
      if (messageLower.includes(trigger.toLowerCase())) {
        score += trigger.length > 3 ? 2 : 1; // 长关键词权重更高
      }
    }

    if (score > 0) {
      matchedSkills.push({ skill, score: score + skill.priority });
    }
  }

  // 按分数排序
  matchedSkills.sort((a, b) => b.score - a.score);

  return matchedSkills.map(m => m.skill);
}

// ============================================
// MCP 服务器
// ============================================

function createServer() {
  const server = new Server(
    {
      name: "skills-controller",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // 注册工具列表
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const skillsList = SKILL_REGISTRY.map(s => `• ${s.name}: ${s.description}`).join("\n");

    return {
      tools: [
        {
          name: "analyze_and_route",
          description: `智能技能路由器。分析用户意图并激活相关技能。

已注册 ${SKILL_REGISTRY.length} 个技能，包括:
${skillsList.slice(0, 500)}${skillsList.length > 500 ? "\n..." : ""}

使用此工具来：
1. 分析用户的任务类型
2. 激活最相关的技能
3. 返回技能的完整指令供 Claude 使用`,
          inputSchema: {
            type: "object",
            properties: {
              user_message: {
                type: "string",
                description: "用户的原始消息或任务描述",
              },
              max_skills: {
                type: "number",
                description: "最多激活的技能数量（默认 1）",
                default: 1,
              },
            },
            required: ["user_message"],
          },
        },
        {
          name: "list_active_skills",
          description: "列出当前激活的技能",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "deactivate_skill",
          description: "停用指定技能，释放上下文空间",
          inputSchema: {
            type: "object",
            properties: {
              skill_name: {
                type: "string",
                description: "要停用的技能名称",
              },
            },
            required: ["skill_name"],
          },
        },
        {
          name: "deactivate_all_skills",
          description: "停用所有已激活的技能，释放上下文空间",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "get_skill_index",
          description: "获取所有可用技能的完整索引",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "load_skill",
          description: "直接加载指定技能的完整内容",
          inputSchema: {
            type: "object",
            properties: {
              skill_name: {
                type: "string",
                description: "要加载的技能名称",
              },
            },
            required: ["skill_name"],
          },
        },
        {
          name: "search_skills",
          description: "搜索包含指定关键词的技能",
          inputSchema: {
            type: "object",
            properties: {
              keyword: {
                type: "string",
                description: "搜索关键词",
              },
            },
            required: ["keyword"],
          },
        },
      ],
    };
  });

  // 处理工具调用
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "analyze_and_route": {
        const { user_message, max_skills = 1 } = args as {
          user_message: string;
          max_skills?: number;
        };

        const matchedSkills = analyzeContext(user_message);
        const skillsToActivate = matchedSkills.slice(0, max_skills);

        if (skillsToActivate.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  status: "no_match",
                  message: "未匹配到相关技能，使用通用模式处理",
                  suggestion: "可以使用 search_skills 或 get_skill_index 查看可用技能",
                  total_skills: SKILL_REGISTRY.length,
                }),
              },
            ],
          };
        }

        // 加载技能内容
        const activatedContents: { name: string; content: string }[] = [];

        for (const skill of skillsToActivate) {
          const content = await loadSkillContent(skill.name);
          activatedContents.push({ name: skill.name, content });
          state.activeSkills.add(skill.name);
        }

        state.context = user_message;
        state.lastAnalysis = new Date();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                status: "activated",
                activated_skills: skillsToActivate.map(s => ({
                  name: s.name,
                  category: s.category,
                  match_reason: s.triggers.filter(t =>
                    user_message.toLowerCase().includes(t.toLowerCase())
                  ),
                })),
                skill_contents: activatedContents,
                instructions: "请根据以上激活的技能内容来处理用户请求。任务完成后，请务必调用 deactivate_all_skills 工具来停用技能并释放上下文空间。",
              }),
            },
          ],
        };
      }

      case "list_active_skills": {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                active_skills: Array.from(state.activeSkills),
                last_analysis: state.lastAnalysis.toISOString(),
                context_summary: state.context.slice(0, 100) + (state.context.length > 100 ? "..." : ""),
              }),
            },
          ],
        };
      }

      case "deactivate_skill": {
        const { skill_name } = args as { skill_name: string };

        if (state.activeSkills.has(skill_name)) {
          state.activeSkills.delete(skill_name);
          skillContentCache.delete(skill_name);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  status: "deactivated",
                  skill: skill_name,
                  remaining_active: Array.from(state.activeSkills),
                }),
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                status: "not_found",
                message: `技能 "${skill_name}" 未处于激活状态`,
              }),
            },
          ],
        };
      }

      case "deactivate_all_skills": {
        const deactivatedSkills = Array.from(state.activeSkills);
        const count = deactivatedSkills.length;

        state.activeSkills.clear();
        skillContentCache.clear();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                status: "all_deactivated",
                count: count,
                deactivated_skills: deactivatedSkills,
              }),
            },
          ],
        };
      }

      case "get_skill_index": {
        // 按分类分组
        const byCategory: Record<string, SkillMeta[]> = {};
        for (const skill of SKILL_REGISTRY) {
          if (!byCategory[skill.category]) {
            byCategory[skill.category] = [];
          }
          byCategory[skill.category].push(skill);
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                total: SKILL_REGISTRY.length,
                by_category: Object.entries(byCategory).map(([cat, skills]) => ({
                  category: cat,
                  count: skills.length,
                  skills: skills.map(s => ({
                    name: s.name,
                    description: s.description,
                    triggers: s.triggers.slice(0, 5),
                  })),
                })),
              }),
            },
          ],
        };
      }

      case "load_skill": {
        const { skill_name } = args as { skill_name: string };

        const skill = SKILL_REGISTRY.find(s => s.name === skill_name);
        if (!skill) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  status: "error",
                  message: `技能 "${skill_name}" 不存在`,
                  available: SKILL_REGISTRY.map(s => s.name),
                }),
              },
            ],
          };
        }

        const content = await loadSkillContent(skill_name);
        state.activeSkills.add(skill_name);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                status: "loaded",
                skill: {
                  name: skill.name,
                  category: skill.category,
                  description: skill.description,
                },
                content: content,
              }),
            },
          ],
        };
      }

      case "search_skills": {
        const { keyword } = args as { keyword: string };
        const keywordLower = keyword.toLowerCase();

        const matches = SKILL_REGISTRY.filter(skill =>
          skill.name.toLowerCase().includes(keywordLower) ||
          skill.description.toLowerCase().includes(keywordLower) ||
          skill.triggers.some(t => t.toLowerCase().includes(keywordLower))
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                keyword,
                matches: matches.length,
                skills: matches.map(s => ({
                  name: s.name,
                  description: s.description,
                  category: s.category,
                })),
              }),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  });

  return server;
}

// ============================================
// 主函数
// ============================================

async function main() {
  console.error("[Skills Controller] 启动中...");
  console.error(`[Skills Controller] 技能目录: ${SKILLS_DIRS.join(", ")}`);

  // 扫描所有技能目录（先扫描的优先）
  const seenSkills = new Set<string>();
  const allSkills: SkillMeta[] = [];

  for (const dir of SKILLS_DIRS) {
    console.error(`[Skills Controller] 扫描目录: ${dir}`);
    const skills = await scanSkillsDirectory(dir);

    for (const skill of skills) {
      if (!seenSkills.has(skill.name)) {
        seenSkills.add(skill.name);
        allSkills.push(skill);
      } else {
        console.error(`[Skills Controller] 跳过重复技能: ${skill.name}`);
      }
    }
  }

  SKILL_REGISTRY = allSkills;
  console.error(`[Skills Controller] 已加载 ${SKILL_REGISTRY.length} 个技能（去重后）`);

  // 启动服务器
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("[Skills Controller] MCP 服务器已启动");
}

main().catch(console.error);
