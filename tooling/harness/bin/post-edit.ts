#!/usr/bin/env node
// PostToolUse hook (Edit|Write): format the file, then lint Markdown and run the related tests.
// Problems go back to Claude (exit 2) so it fixes them right away.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { relative } from 'node:path';
import { repoRoot } from '../src/git.ts';
import { block, isInsideRepo, readHookInput } from '../src/hook-io.ts';

const input = await readHookInput();
const filePath = input.tool_input?.file_path;
if (!filePath || !existsSync(filePath)) process.exit(0);

const root = repoRoot();
if (!isInsideRepo(root, filePath)) process.exit(0);
const rel = relative(root, filePath);
const run = (args: readonly string[]) =>
  spawnSync('pnpm', ['exec', ...args], { cwd: root, encoding: 'utf8' });
const problems: string[] = [];

if (/\.(?:ts|mjs|json|md|ya?ml)$/.test(rel) && rel !== 'pnpm-lock.yaml') {
  run(['prettier', '--write', '--log-level', 'warn', rel]);
}
if (rel.endsWith('.md')) {
  const lint = run(['markdownlint-cli2', rel]);
  if (lint.status !== 0) problems.push(`markdownlint:\n${lint.stdout}${lint.stderr}`);
}
if (rel.startsWith('tooling/') && rel.endsWith('.ts')) {
  const tests = run(['vitest', 'related', '--run', '--passWithNoTests', filePath]);
  if (tests.status !== 0) problems.push(`Related tests:\n${tests.stdout.slice(-4000)}`);
}

if (problems.length > 0) block(problems.join('\n\n'));
