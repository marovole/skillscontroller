/**
 * MCP Test Server Helper
 *
 * Wrapper for testing the Skills Controller MCP server without actual stdio transport
 */

import { describe, it, expect } from "vitest";

// Test data types matching MCP protocol
export interface MCPToolRequest {
  name: string;
  arguments: Record<string, unknown>;
  _meta?: {
    sessionId?: string;
    clientId?: string;
  };
}

export interface MCPToolResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
  isError?: boolean;
}

export interface MCPTestServer {
  callTool: (request: MCPToolRequest) => Promise<MCPToolResponse>;
  getSessionState: () => {
    activeSkills: string[];
    lastAnalysis?: Date;
    context?: string;
  };
  clearSession: () => void;
}

/**
 * Create a mock MCP test server
 * Note: This is a simplified mock. In real integration tests, we would start the actual MCP server.
 */
export function createMCPTestServer(sessionId: string = "test-session"): MCPTestServer {
  const sessionState = {
    activeSkills: new Set<string>(),
    lastAnalysis: new Date(),
    context: "",
    skillContentCache: new Map<string, string>(),
  };

  return {
    async callTool(request: MCPToolRequest): Promise<MCPToolResponse> {
      const { name, arguments: args } = request;

      switch (name) {
        case "analyze_and_route": {
          const userMessage = String(args.user_message || "");
          const maxSkills = Number(args.max_skills || 1);

          // Mock intent detection logic
          const detectedIntent = mockDetectIntent(userMessage);
          const locale = mockDetectLanguage(userMessage);

          // Mock skill matching
          const matchedSkills = mockMatchSkills(userMessage, detectedIntent);
          const skillsToActivate = matchedSkills.slice(0, maxSkills);

          if (skillsToActivate.length === 0) {
            const noMatchMsg = locale === "zh"
              ? "未匹配到相关技能，使用通用模式处理"
              : "No matching skills found, using general mode";

            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  status: "no_match",
                  detected_intent: detectedIntent,
                  locale: locale,
                  message: noMatchMsg,
                  suggestion: locale === "zh"
                    ? "可以使用 search_skills 或 get_skill_index 查看可用技能"
                    : "Use search_skills or get_skill_index to see available skills",
                  total_skills: 9, // Mock number
                  activated_skills: [], // Add empty array for no_match case
                }),
              }],
            };
          }

          // Activate skills
          const activatedContents: Array<{ name: string; content: string }> = [];

          for (const skill of skillsToActivate) {
            const content = `# ${skill.name}\n\n${skill.description}\n\nSkill content for ${skill.name}...`;
            activatedContents.push({ name: skill.name, content });
            sessionState.activeSkills.add(skill.name);
          }

          sessionState.context = userMessage;
          sessionState.lastAnalysis = new Date();

          const activatedMsg = locale === "zh"
            ? `✅ **已激活技能**：${skillsToActivate.map(s => s.name).join("、")}`
            : `✅ **Activated skills**: ${skillsToActivate.map(s => s.name).join(", ")}`;

          const processMsg = locale === "zh"
            ? "请根据以上激活的技能内容来处理用户请求。任务完成后，请务必调用 deactivate_all_skills 工具来停用技能并释放上下文空间。"
            : "Please process the user's request based on the activated skill content above. After completing the task, be sure to call deactivate_all_skills to release context space.";

          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                status: "activated",
                detected_intent: detectedIntent,
                locale: locale,
                activated_skills: skillsToActivate.map(s => ({
                  name: s.name,
                  category: s.category,
                  match_reason: s.matchedTriggers,
                })),
                skill_contents: activatedContents,
                instructions: `${activatedMsg}\n\n${processMsg}`,
              }),
            }],
          };
        }

        case "list_active_skills": {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                active_skills: Array.from(sessionState.activeSkills),
                last_analysis: sessionState.lastAnalysis.toISOString(),
                context_summary: sessionState.context?.slice(0, 100) + (sessionState.context && sessionState.context.length > 100 ? "..." : ""),
              }),
            }],
          };
        }

        case "deactivate_all_skills": {
          const deactivatedSkills = Array.from(sessionState.activeSkills);
          const count = deactivatedSkills.length;

          sessionState.activeSkills.clear();
          sessionState.skillContentCache.clear();

          const skillNames = deactivatedSkills.length > 0 ? deactivatedSkills.join("、") : "无";

          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                status: "all_deactivated",
                count: count,
                deactivated_skills: deactivatedSkills,
                message: count > 0 ? `【${skillNames}】技能使用完毕，已释放。` : "当前没有激活的技能。",
              }),
            }],
          };
        }

        case "deactivate_skill": {
          const skillName = String(args.skill_name || "");

          if (sessionState.activeSkills.has(skillName)) {
            sessionState.activeSkills.delete(skillName);
            sessionState.skillContentCache.delete(skillName);

            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  status: "deactivated",
                  skill: skillName,
                  remaining_active: Array.from(sessionState.activeSkills),
                  message: "技能使用完毕，已释放。",
                }),
              }],
            };
          }

          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                status: "not_found",
                message: "技能未处于激活状态",
              }),
            }],
          };
        }

        case "get_skill_index": {
          // Mock skill index
          const byCategory = {
            frontend: [
              { name: "frontend-design", description: "Frontend UI design", triggers: ["设计", "UI", "design"] },
              { name: "modern-frontend-design", description: "Modern frontend design", triggers: ["现代前端", "modern"] },
            ],
            testing: [
              { name: "webapp-testing", description: "E2E testing", triggers: ["E2E", "playwright"] },
              { name: "code-review", description: "Code review", triggers: ["审查", "review"] },
            ],
            research: [
              { name: "open-source-librarian", description: "Source code research", triggers: ["源码", "source code"] },
            ],
          };

          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                total: 9,
                by_category: Object.entries(byCategory).map(([cat, skills]) => ({
                  category: cat,
                  count: skills.length,
                  skills: skills,
                })),
              }),
            }],
          };
        }

        default:
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                status: "error",
                message: "未知操作",
              }),
            }],
          };
      }
    },

    getSessionState() {
      return {
        activeSkills: Array.from(sessionState.activeSkills),
        lastAnalysis: sessionState.lastAnalysis,
        context: sessionState.context,
      };
    },

    clearSession() {
      sessionState.activeSkills.clear();
      sessionState.skillContentCache.clear();
      sessionState.context = "";
      sessionState.lastAnalysis = new Date();
    },
  };
}

/**
 * Mock intent detection
 */
function mockDetectIntent(message: string): string {
  const lower = message.toLowerCase();

  if (/(写测试|编写测试|测试用例|test|testing|write test)/.test(lower)) {
    return "test_write_e2e";
  }
  if (/(创建|新建|生成|开发|实现|构建|设计|create|build|implement|develop|design)/.test(lower)) {
    return "create";
  }
  if (/(源码|源代码|原理|实现|source code|principle|implementation)/.test(lower)) {
    return "research";
  }
  if (/(E2E|e2e|端到端|playwright)/.test(lower)) {
    return "test_write_e2e";
  }
  if (/(审查|review|代码质量)/.test(lower)) {
    return "analyze";
  }
  if (/(修复|调试|debug|fix)/.test(lower)) {
    return "debug";
  }
  if (/(部署|deploy|CI\/CD)/.test(lower)) {
    return "deploy";
  }
  if (/(导出|PDF|convert|export)/.test(lower)) {
    return "convert";
  }
  if (/(文档|document|readme)/.test(lower)) {
    return "document";
  }

  return "unknown";
}

/**
 * Mock language detection
 */
function mockDetectLanguage(message: string): "zh" | "en" {
  const cjkMatch = message.match(/[\u4e00-\u9fa5]/g);
  if (cjkMatch && cjkMatch.length >= message.length * 0.3) {
    return "zh";
  }
  return "en";
}

/**
 * Mock skill matching - uses test data for comprehensive coverage
 */
function mockMatchSkills(message: string, intent: string): Array<{
  name: string;
  category: string;
  description: string;
  matchedTriggers: string[];
}> {
  const lower = message.toLowerCase();
  const matched: ReturnType<typeof mockMatchSkills> = [];

  // Dynamically build skill list from categories
  const skillPatterns: Array<{
    name: string;
    category: string;
    description: string;
    triggers: string[];
    intents: string[];
  }> = [
    // Frontend
    { name: "frontend-design", category: "frontend", description: "Frontend UI design skill", triggers: ["创建", "设计", "ui", "界面", "component", "create", "design", "interface", "user", "react", "vue", "前端", "样式", "css", "页面", "布局", "交互"], intents: ["create"] },
    { name: "modern-frontend-design", category: "frontend", description: "Modern frontend design", triggers: ["现代前端", "前端设计", "ui设计", "界面设计", "设计系统", "美学", "visual", "aesthetic"], intents: ["create"] },
    { name: "ui-styling", category: "frontend", description: "UI styling", triggers: ["ui样式", "css", "styling"], intents: ["create"] },
    { name: "aesthetic", category: "frontend", description: "Visual aesthetics", triggers: ["美学", "审美", "aesthetic", "visual style"], intents: ["create"] },
    { name: "canvas-design", category: "frontend", description: "Canvas design", triggers: ["画布", "图表", "canvas", "chart", "visualization"], intents: ["create"] },
    { name: "theme-factory", category: "frontend", description: "Theme factory", triggers: ["主题", "皮肤", "theme", "skin"], intents: ["create"] },
    { name: "brand-guidelines", category: "frontend", description: "Brand guidelines", triggers: ["品牌", "指南", "brand", "guidelines"], intents: ["create"] },
    // Backend
    { name: "backend-development", category: "backend", description: "Backend development", triggers: ["后端", "服务端", "api开发", "backend", "server", "api"], intents: ["create", "debug"] },
    { name: "web-frameworks", category: "backend", description: "Web frameworks", triggers: ["web框架", "express", "fastify", "koa", "web framework"], intents: ["create"] },
    { name: "databases", category: "backend", description: "Database skills", triggers: ["数据库", "sql", "mysql", "postgresql", "mongodb", "database"], intents: ["create"] },
    // Testing
    { name: "webapp-testing", category: "testing", description: "E2E testing", triggers: ["e2e", "端到端", "playwright", "测试", "test", "写测试"], intents: ["test_write_e2e", "test_run"] },
    { name: "code-review", category: "testing", description: "Code review", triggers: ["审查", "review", "代码质量", "pr", "code review"], intents: ["analyze"] },
    { name: "systematic-debugging", category: "testing", description: "Systematic debugging", triggers: ["系统调试", "debug", "troubleshoot"], intents: ["debug"] },
    { name: "root-cause-tracing", category: "testing", description: "Root cause analysis", triggers: ["根因分析", "故障排查", "troubleshooting"], intents: ["debug"] },
    // DevOps
    { name: "devops", category: "devops", description: "DevOps skills", triggers: ["devops", "ci/cd", "部署", "deploy", "docker", "k8s"], intents: ["deploy"] },
    { name: "mcp-management", category: "devops", description: "MCP management", triggers: ["mcp管理", "服务器管理"], intents: ["deploy"] },
    { name: "mcp-builder", category: "devops", description: "MCP builder", triggers: ["mcp", "服务器", "集成", "工具开发", "api"], intents: ["create"] },
    // Documentation
    { name: "doc-coauthoring", category: "documentation", description: "Document coauthoring", triggers: ["协作", "文档协作", "coauthor", "collaboration"], intents: ["document"] },
    { name: "pdf", category: "documentation", description: "PDF skills", triggers: ["pdf", "导出pdf"], intents: ["convert"] },
    { name: "docx", category: "documentation", description: "Word skills", triggers: ["word", "文档", "docx"], intents: ["convert"] },
    { name: "pptx", category: "documentation", description: "PowerPoint skills", triggers: ["ppt", "演示文稿", "powerpoint"], intents: ["create"] },
    { name: "xlsx", category: "documentation", description: "Excel skills", triggers: ["excel", "电子表格", "xlsx"], intents: ["convert"] },
    { name: "document-skills", category: "documentation", description: "Documentation skills", triggers: ["文档", "markdown", "documentation"], intents: ["document"] },
    { name: "docs-seeker", category: "documentation", description: "Docs seeker", triggers: ["文档搜索", "api文档", "docs"], intents: ["research"] },
    { name: "repomix", category: "documentation", description: "Repository analysis", triggers: ["代码库", "仓库分析", "codebase"], intents: ["analyze"] },
    { name: "mermaidjs-v11", category: "documentation", description: "Mermaid diagrams", triggers: ["mermaid", "流程图", "chart"], intents: ["create"] },
    // Media
    { name: "media-processing", category: "media", description: "Media processing", triggers: ["媒体处理", "音视频", "转码"], intents: ["convert"] },
    { name: "image-enhancer", category: "media", description: "Image enhancement", triggers: ["图片", "图像", "image"], intents: ["convert"] },
    { name: "video-downloader", category: "media", description: "Video downloader", triggers: ["视频", "下载", "video"], intents: ["convert"] },
    { name: "slack-gif-creator", category: "media", description: "GIF creator", triggers: ["slack", "gif", "动图"], intents: ["create"] },
    { name: "algorithmic-art", category: "media", description: "Algorithmic art", triggers: ["算法艺术", "生成艺术", "art"], intents: ["create"] },
    // Thinking
    { name: "sequential-thinking", category: "thinking", description: "Sequential thinking", triggers: ["顺序思考", "逐步推理", "reasoning"], intents: [] },
    { name: "collision-zone-thinking", category: "thinking", description: "Collision zone thinking", triggers: ["碰撞思维", "问题分析"], intents: [] },
    { name: "meta-pattern-recognition", category: "thinking", description: "Pattern recognition", triggers: ["模式识别", "元认知"], intents: [] },
    { name: "context-engineering", category: "thinking", description: "Context engineering", triggers: ["上下文工程", "prompt", "prompt工程"], intents: [] },
    { name: "inversion-exercise", category: "thinking", description: "Inversion exercise", triggers: ["逆向思维", "反向推理"], intents: [] },
    { name: "defense-in-depth", category: "thinking", description: "Defense in depth", triggers: ["深度防御", "安全策略"], intents: [] },
    { name: "scale-game", category: "thinking", description: "Scale game", triggers: ["规模化", "扩展性", "scale"], intents: [] },
    { name: "simplification-cascades", category: "thinking", description: "Simplification", triggers: ["简化", "降复杂度", "simplification"], intents: ["refactor"] },
    { name: "verification-before-completion", category: "thinking", description: "Verification", triggers: ["验证", "检查", "verification"], intents: [] },
    { name: "when-stuck", category: "thinking", description: "Help when stuck", triggers: ["卡住", "困难", "stuck"], intents: [] },
    // Tools
    { name: "browser", category: "tools", description: "Browser automation", triggers: ["浏览器", "chrome", "browser", "screenshot"], intents: ["create"] },
    { name: "chrome-devtools", category: "tools", description: "Chrome DevTools", triggers: ["chrome", "devtools", "开发者工具"], intents: ["debug"] },
    { name: "skill-creator", category: "tools", description: "Skill creator", triggers: ["创建技能", "新技能", "skill"], intents: ["create"] },
    { name: "claude-code", category: "tools", description: "Claude Code", triggers: ["claude code", "cli", "命令行"], intents: [] },
    { name: "file-organizer", category: "tools", description: "File organizer", triggers: ["文件", "整理", "organize"], intents: ["refactor"] },
    { name: "raffle-winner-picker", category: "tools", description: "Raffle winner", triggers: ["抽奖", "随机", "random"], intents: ["create"] },
    // Research
    { name: "open-source-librarian", category: "research", description: "Source code research", triggers: ["源码", "源代码", "开源", "原理", "source code", "implementation", "github"], intents: ["research"] },
    // Auth
    { name: "better-auth", category: "auth", description: "Authentication", triggers: ["认证", "授权", "登录", "auth"], intents: ["create"] },
    // AI
    { name: "ai-multimodal", category: "ai", description: "AI multimodal", triggers: ["多模态", "图像理解", "multimodal"], intents: [] },
    // E-commerce
    { name: "shopify", category: "ecommerce", description: "Shopify", triggers: ["shopify", "电商"], intents: ["create"] },
    // Communication
    { name: "internal-comms", category: "communication", description: "Internal communication", triggers: ["内部沟通", "通讯"], intents: ["create"] },
    { name: "meeting-insights-analyzer", category: "communication", description: "Meeting analysis", triggers: ["会议", "分析"], intents: ["analyze"] },
    // Analysis
    { name: "content-research-writer", category: "analysis", description: "Content research", triggers: ["研究", "调研", "内容", "写作"], intents: ["research"] },
    { name: "lead-research-assistant", category: "analysis", description: "Lead research", triggers: ["线索", "调研"], intents: ["research"] },
    { name: "domain-name-brainstormer", category: "analysis", description: "Domain naming", triggers: ["域名", "命名", "domain"], intents: ["create"] },
    { name: "developer-growth-analysis", category: "analysis", description: "Developer analysis", triggers: ["开发者", "成长", "分析"], intents: ["analyze"] },
    { name: "competitive-ads-extractor", category: "analysis", description: "Competitor analysis", triggers: ["广告", "竞品"], intents: ["research"] },
  ];

  for (const skill of skillPatterns) {
    // Check intent filter
    if (skill.intents.length > 0 && !skill.intents.includes(intent)) {
      continue;
    }

    // Check trigger matches
    const matchedTriggers = skill.triggers.filter(t => lower.includes(t.toLowerCase()));

    if (matchedTriggers.length > 0) {
      matched.push({
        name: skill.name,
        category: skill.category,
        description: skill.description,
        matchedTriggers,
      });
    }
  }

  return matched;
}
