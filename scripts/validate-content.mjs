/* global console */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { parse } from 'yaml';
import {
  ContentPolicyError,
  formatContentPolicyIssues,
  validateContentPolicy,
} from '../src/lib/validation/content-policy.ts';

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, 'src/content');

function markdownFiles(directory) {
  return fs
    .readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => path.join(entry.parentPath, entry.name));
}

function readContentFile(file) {
  const source = fs.readFileSync(file, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) {
    return {
      frontmatter: {},
      body: source,
      parseIssue: {
        file: path.relative(projectRoot, file),
        field: 'frontmatter',
        code: 'POLICY-FRONTMATTER',
        message: 'Не знайдено коректний YAML frontmatter.',
        hint: 'Додайте блок між рядками --- на початку файла.',
      },
    };
  }
  return { frontmatter: parse(match[1]), body: match[2] };
}

const issues = [];
for (const file of markdownFiles(contentRoot)) {
  const relativeFile = path.relative(projectRoot, file);
  try {
    const parsed = readContentFile(file);
    if (parsed.parseIssue) {
      issues.push(parsed.parseIssue);
      continue;
    }
    issues.push(
      ...validateContentPolicy({
        frontmatter: parsed.frontmatter,
        body: parsed.body,
        file: relativeFile,
        projectRoot,
      }),
    );
  } catch {
    issues.push({
      file: relativeFile,
      field: 'frontmatter',
      code: 'POLICY-YAML',
      message: 'YAML frontmatter неможливо прочитати.',
      hint: 'Перевірте відступи, лапки та формат значень.',
    });
  }
}

if (issues.length) {
  const error = new ContentPolicyError(issues);
  console.error(error.message);
  console.error(formatContentPolicyIssues(error.issues));
  process.exitCode = 1;
} else {
  console.log(
    `Контентна політика: перевірено ${markdownFiles(contentRoot).length} Markdown-файлів.`,
  );
}
