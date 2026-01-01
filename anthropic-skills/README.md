# Anthropic Skills Directory

This directory is for optional project-specific skills from [Anthropic's official skills repository](https://github.com/anthropics/anthropic-skills).

## How to Use

1. Clone the Anthropic skills repository:
   ```bash
   git clone https://github.com/anthropics/anthropic-skills.git anthropic-skills
   ```

2. Skills will be automatically detected by Skills Controller from the `anthropic-skills/skills/` directory.

3. Restart Claude Code to load the new skills.

## Alternative Locations

Skills Controller also searches for skills in these locations (in order of priority):

1. `~/.claude/skills/` - User's local skills directory (highest priority)
2. `./anthropic-skills/skills/` - Project's Anthropic skills (this directory)
3. `./claudekit-skills/.claude/skills/` - Project's ClaudeKit skills
4. `./awesome-claude-skills/` - Project's community skills

## Note

This directory is ignored by git (see `.gitignore`). Each developer should set up their own skills repositories as needed.
