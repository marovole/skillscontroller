/**
 * Session Isolation Tests
 *
 * Tests that different sessions maintain separate state
 */

import { describe, it, expect } from "vitest";
import { createMCPTestServer } from "../helpers/mcp-test-server.js";

describe("Session Isolation - Integration Tests", () => {
  it("should maintain separate active skills for different sessions", async () => {
    const server1 = createMCPTestServer("session-1");
    const server2 = createMCPTestServer("session-2");

    // Activate different skills in each session
    await server1.callTool({
      name: "analyze_and_route",
      arguments: {
        user_message: "创建一个React组件",
        max_skills: 1,
      },
    });

    await server2.callTool({
      name: "analyze_and_route",
      arguments: {
        user_message: "查看源码",
        max_skills: 1,
      },
    });

    const state1 = server1.getSessionState();
    const state2 = server2.getSessionState();

    // Each session should have different active skills
    expect(state1.activeSkills.length).toBeGreaterThan(0);
    expect(state2.activeSkills.length).toBeGreaterThan(0);

    // Verify skills are different (frontend vs research)
    const hasFrontend1 = state1.activeSkills.some(s => s.includes("frontend") || s.includes("design"));
    const hasResearch2 = state2.activeSkills.some(s => s.includes("librarian") || s.includes("source"));

    expect(hasFrontend1).toBe(true);
    expect(hasResearch2).toBe(true);
  });

  it("should not leak context between sessions", async () => {
    const server1 = createMCPTestServer("session-1");
    const server2 = createMCPTestServer("session-2");

    await server1.callTool({
      name: "analyze_and_route",
      arguments: {
        user_message: "设计一个UI界面",
        max_skills: 1,
      },
    });

    await server2.callTool({
      name: "analyze_and_route",
      arguments: {
        user_message: "创建API接口",
        max_skills: 1,
      },
    });

    const state1 = server1.getSessionState();
    const state2 = server2.getSessionState();

    // Contexts should be different
    expect(state1.context).toContain("UI");
    expect(state2.context).toContain("API");
    expect(state1.context).not.toBe(state2.context);
  });

  it("should isolate deactivate_all operations", async () => {
    const server1 = createMCPTestServer("session-1");
    const server2 = createMCPTestServer("session-2");

    // Activate skills in both sessions
    await server1.callTool({
      name: "analyze_and_route",
      arguments: {
        user_message: "创建组件",
        max_skills: 2,
      },
    });

    await server2.callTool({
      name: "analyze_and_route",
      arguments: {
        user_message: "写测试",
        max_skills: 2,
      },
    });

    // Clear only session 1
    await server1.callTool({
      name: "deactivate_all_skills",
      arguments: {},
    });

    const state1 = server1.getSessionState();
    const state2 = server2.getSessionState();

    // Session 1 should be empty
    expect(state1.activeSkills.length).toBe(0);

    // Session 2 should still have skills
    expect(state2.activeSkills.length).toBeGreaterThan(0);
  });

  it("should handle concurrent sessions independently", async () => {
    const sessions = Array.from({ length: 3 }, (_, i) => createMCPTestServer(`session-${i}`));

    // Activate different skills in each session
    const queries = [
      "创建一个组件",
      "查看源码",
      "写测试",
    ];

    for (let i = 0; i < sessions.length; i++) {
      await sessions[i].callTool({
        name: "analyze_and_route",
        arguments: {
          user_message: queries[i],
          max_skills: 1,
        },
      });
    }

    // Verify each session has its own state
    for (let i = 0; i < sessions.length; i++) {
      const state = sessions[i].getSessionState();
      expect(state.activeSkills.length).toBeGreaterThan(0);
      expect(state.context).toContain(queries[i].substring(0, 4)); // Check first few chars match
    }
  });

  it("should not share skill cache between sessions", async () => {
    const server1 = createMCPTestServer("session-1");
    const server2 = createMCPTestServer("session-2");

    // Both sessions activate the same skill type
    await server1.callTool({
      name: "analyze_and_route",
      arguments: {
        user_message: "创建React组件",
        max_skills: 1,
      },
    });

    await server2.callTool({
      name: "analyze_and_route",
      arguments: {
        user_message: "设计Vue界面",
        max_skills: 1,
      },
    });

    const state1 = server1.getSessionState();
    const state2 = server2.getSessionState();

    // Both should have active skills
    expect(state1.activeSkills.length).toBeGreaterThan(0);
    expect(state2.activeSkills.length).toBeGreaterThan(0);

    // Clearing one session should not affect the other
    await server1.callTool({
      name: "deactivate_all_skills",
      arguments: {},
    });

    const state1After = server1.getSessionState();
    const state2After = server2.getSessionState();

    expect(state1After.activeSkills.length).toBe(0);
    expect(state2After.activeSkills.length).toBeGreaterThan(0);
  });
});
