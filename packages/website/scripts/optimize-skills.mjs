#!/usr/bin/env node
/**
 * 优化 skills.ts 文件，将 content 字段替换为空字符串
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillsPath = path.join(__dirname, '../src/data/skills.ts');

function findMatchingBacktick(content, start) {
  let depth = 1;
  let i = start;
  while (i < content.length && depth > 0) {
    const char = content[i];
    // 处理代码块 ```
    if (char === '`' && i + 2 < content.length && content[i+1] === '`' && content[i+2] === '`') {
      // 找到下一个 ```
      i += 3;
      while (i + 2 < content.length) {
        if (content[i] === '`' && content[i+1] === '`' && content[i+2] === '`') {
          i += 3;
          break;
        }
        i++;
      }
      continue;
    }
    // 处理转义
    if (char === '\\' && i + 1 < content.length) {
      i += 2;
      continue;
    }
    // 处理 ${...} 插值
    if (char === '$' && i + 1 < content.length && content[i+1] === '{') {
      let braceDepth = 1;
      i += 2;
      while (i < content.length && braceDepth > 0) {
        if (content[i] === '{') braceDepth++;
        else if (content[i] === '}') braceDepth--;
        i++;
      }
      continue;
    }
    // 处理普通反引号
    if (char === '`') {
      depth--;
    }
    i++;
  }
  return i - 1; // 返回结束反引号的位置
}

function optimizeSkills() {
  console.log('Reading skills.ts...');
  let content = fs.readFileSync(skillsPath, 'utf-8');
  
  // 查找所有 content: ` 的位置
  const pattern = /content:\s*`/g;
  let match;
  const replacements = [];
  
  while ((match = pattern.exec(content)) !== null) {
    const startOfBacktick = match.index + match[0].length - 1;
    const endOfBacktick = findMatchingBacktick(content, startOfBacktick + 1);
    replacements.push({
      start: match.index,
      end: endOfBacktick + 1,
      replacement: "content: ''"
    });
  }
  
  // 从后向前替换，保持位置正确
  let result = content;
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    result = result.slice(0, r.start) + r.replacement + result.slice(r.end);
  }
  
  console.log('Writing optimized skills.ts...');
  fs.writeFileSync(skillsPath, result);
  
  const originalSize = content.length;
  const newSize = result.length;
  const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
  
  console.log(`Original size: ${(originalSize / 1024).toFixed(1)} KB`);
  console.log(`New size: ${(newSize / 1024).toFixed(1)} KB`);
  console.log(`Reduction: ${reduction}%`);
  console.log(`Replacements made: ${replacements.length}`);
}

optimizeSkills();
