/**
 * MCP Routing Workflow Integration Tests
 *
 * Tests the complete analyze_and_route flow through the MCP server
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createMCPTestServer, type MCPTestServer } from "../helpers/mcp-test-server.js";
import { IntentType } from "../fixtures/test-queries.js";

describe("MCP Routing Workflow - Integration Tests", () => {
  let server: MCPTestServer;

  beforeEach(() => {
    server = createMCPTestServer("test-session");
  });

  afterEach(() => {
    server.clearSession();
  });

  describe("analyze_and_route tool", () => {
    describe("CREATE intent scenarios", () => {
      it("should detect CREATE intent and activate frontend-design skill", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "创建一个React组件",
            max_skills: 1,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.status).toBe("activated");
        expect(result.detected_intent).toBe("create");
        expect(result.activated_skills.length).toBeGreaterThanOrEqual(1);

        // Should activate frontend skills
        const skillNames = result.activated_skills.map((s: any) => s.name);
        const hasFrontendSkill = skillNames.some((name: string) =>
          name.includes("frontend") || name.includes("design")
        );
        expect(hasFrontendSkill).toBe(true);
      });

      it("should detect CREATE intent for English query", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "Design a user interface",
            max_skills: 1,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.status).toBe("activated");
        expect(result.detected_intent).toBe("create");
        expect(result.locale).toBe("en");
      });

      it("should detect Chinese locale for Chinese query", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "设计一个登录页面",
            max_skills: 1,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.locale).toBe("zh");
        expect(result.status).toBe("activated");
      });
    });

    describe("RESEARCH intent scenarios", () => {
      it("should detect RESEARCH intent for source code queries", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "查看React源码",
            max_skills: 1,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.status).toBe("activated");
        expect(result.detected_intent).toBe("research");

        // Should activate research skills
        const skillNames = result.activated_skills.map((s: any) => s.name);
        expect(skillNames).toContain("open-source-librarian");
      });

      it("should detect RESEARCH intent for principle queries", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "Vue响应式原理",
            max_skills: 1,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.status).toBe("activated");
        expect(result.detected_intent).toBe("research");
      });
    });

    describe("TEST intent scenarios", () => {
      it("should detect TEST_WRITE_E2E for E2E test queries", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "写E2E测试",
            max_skills: 1,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.status).toBe("activated");
        expect(result.detected_intent).toBe("test_write_e2e");

        // Should activate testing skills
        const skillNames = result.activated_skills.map((s: any) => s.name);
        expect(skillNames).toContain("webapp-testing");
      });
    });

    describe("ANALYZE intent scenarios", () => {
      it("should detect ANALYZE intent for code review", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "审查代码",
            max_skills: 1,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.status).toBe("activated");
        expect(result.detected_intent).toBe("analyze");

        // Should activate code-review skill
        const skillNames = result.activated_skills.map((s: any) => s.name);
        expect(skillNames).toContain("code-review");
      });
    });

    describe("DEPLOY intent scenarios", () => {
      it("should detect DEPLOY intent for deployment queries", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "部署应用",
            max_skills: 1,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.status).toBe("activated");
        expect(result.detected_intent).toBe("deploy");

        // Should activate devops skills
        const skillNames = result.activated_skills.map((s: any) => s.name);
        expect(skillNames).toContain("devops");
      });
    });

    describe("CONVERT intent scenarios", () => {
      it("should detect CONVERT intent for PDF export", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "导出PDF",
            max_skills: 1,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.status).toBe("activated");
        expect(result.detected_intent).toBe("convert");

        // Should activate pdf skill
        const skillNames = result.activated_skills.map((s: any) => s.name);
        expect(skillNames).toContain("pdf");
      });
    });

    describe("No match scenarios", () => {
      it("should return no_match for casual chat", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "你好",
            max_skills: 1,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.status).toBe("no_match");
        expect(result.activated_skills.length).toBe(0);
      });

      it("should return no_match for thanks", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "谢谢",
            max_skills: 1,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.status).toBe("no_match");
      });
    });

    describe("max_skills parameter", () => {
      it("should activate multiple skills when max_skills > 1", async () => {
        const response = await server.callTool({
          name: "analyze_and_route",
          arguments: {
            user_message: "创建前端页面并测试",
            max_skills: 3,
          },
        });

        const result = JSON.parse(response.content[0].text);

        expect(result.status).toBe("activated");
        expect(result.activated_skills.length).toBeLessThanOrEqual(3);
        expect(result.activated_skills.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Session state management", () => {
    it("should track activated skills in session", async () => {
      await server.callTool({
        name: "analyze_and_route",
        arguments: {
          user_message: "创建一个React组件",
          max_skills: 1,
        },
      });

      const state = server.getSessionState();

      expect(state.activeSkills.length).toBeGreaterThan(0);
      expect(state.context).toBe("创建一个React组件");
      expect(state.lastAnalysis).toBeInstanceOf(Date);
    });

    it("should clear skills on deactivate_all", async () => {
      // First activate some skills
      await server.callTool({
        name: "analyze_and_route",
        arguments: {
          user_message: "创建一个React组件",
          max_skills: 2,
        },
      });

      let state = server.getSessionState();
      expect(state.activeSkills.length).toBeGreaterThan(0);

      // Then deactivate all
      const response = await server.callTool({
        name: "deactivate_all_skills",
        arguments: {},
      });

      const result = JSON.parse(response.content[0].text);
      expect(result.status).toBe("all_deactivated");

      state = server.getSessionState();
      expect(state.activeSkills.length).toBe(0);
    });

    it("should deactivate single skill", async () => {
      // First activate skills
      await server.callTool({
        name: "analyze_and_route",
        arguments: {
          user_message: "创建组件并测试",
          max_skills: 3,
        },
      });

      let state = server.getSessionState();
      const initialCount = state.activeSkills.length;
      expect(initialCount).toBeGreaterThan(0);

      // Deactivate one skill
      const skillToDeactivate = state.activeSkills[0];
      const response = await server.callTool({
        name: "deactivate_skill",
        arguments: {
          skill_name: skillToDeactivate,
        },
      });

      const result = JSON.parse(response.content[0].text);
      expect(result.status).toBe("deactivated");
      expect(result.skill).toBe(skillToDeactivate);

      state = server.getSessionState();
      expect(state.activeSkills.length).toBe(initialCount - 1);
      expect(state.activeSkills).not.toContain(skillToDeactivate);
    });
  });

  describe("list_active_skills tool", () => {
    it("should list active skills after activation", async () => {
      // Activate some skills
      await server.callTool({
        name: "analyze_and_route",
        arguments: {
          user_message: "创建一个React组件",
          max_skills: 2,
        },
      });

      // List active skills
      const response = await server.callTool({
        name: "list_active_skills",
        arguments: {},
      });

      const result = JSON.parse(response.content[0].text);

      expect(result.active_skills).toBeInstanceOf(Array);
      expect(result.active_skills.length).toBeGreaterThan(0);
      expect(result.last_analysis).toBeDefined();
      expect(result.context_summary).toContain("创建");
    });

    it("should return empty list when no skills active", async () => {
      const response = await server.callTool({
        name: "list_active_skills",
        arguments: {},
      });

      const result = JSON.parse(response.content[0].text);

      expect(result.active_skills).toEqual([]);
    });
  });

  describe("get_skill_index tool", () => {
    it("should return skill index with categories", async () => {
      const response = await server.callTool({
        name: "get_skill_index",
        arguments: {},
      });

      const result = JSON.parse(response.content[0].text);

      expect(result.total).toBeGreaterThan(0);
      expect(result.by_category).toBeInstanceOf(Array);
      expect(result.by_category.length).toBeGreaterThan(0);

      // Check category structure
      const category = result.by_category[0];
      expect(category).toHaveProperty("category");
      expect(category).toHaveProperty("count");
      expect(category).toHaveProperty("skills");
    });
  });
});
