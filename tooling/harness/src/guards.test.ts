import { describe, expect, it } from 'vitest';
import { checkBashCommand, checkFileEdit, checkReadPath } from './guards.ts';

describe('checkBashCommand', () => {
  it.each([
    'git push --force origin main',
    'git push -f',
    'git push origin main',
    'git push -u origin HEAD:main',
    'git push origin refs/heads/main',
    'git push origin +main',
    'git push origin main;',
    'git -C . push origin main',
    'git --no-pager push origin main',
    'git push origin "main"',
    'sh -c "git push origin main"',
    'git push origin :main',
    'git push -fu origin feat',
    'git push origin +feat',
    'git push --mirror',
    'git push --all',
    'gh pr merge 3 --squash',
    'rm -rf node_modules',
    'rm -fr assets',
    'rm --recursive --force assets',
    'npm install',
    'npm i prettier',
    'npm ci',
  ])('blocks %s', (command) => {
    expect(checkBashCommand(command)).not.toBeNull();
  });

  it.each([
    'pnpm test',
    'pnpm lint:md',
    'git push -u origin docs/about-line',
    'git push --force-with-lease',
    'git push -u origin feat/main-screen',
    'rm assets/old-banner.svg',
    'npm view prettier version',
  ])('allows %s', (command) => {
    expect(checkBashCommand(command)).toBeNull();
  });

  it('blocks a push with no branch name while on main', () => {
    expect(checkBashCommand('git push', 'main')).not.toBeNull();
    expect(checkBashCommand('git push origin HEAD', 'main')).not.toBeNull();
  });

  it('allows a push with no branch name on a feature branch', () => {
    expect(checkBashCommand('git push', 'feat/x')).toBeNull();
  });
});

describe('checkReadPath', () => {
  it.each(['.env', '.env.local', '.env.production', 'assets/.env'])('blocks %s', (path) => {
    expect(checkReadPath(path)).not.toBeNull();
  });

  it.each(['.env.example', 'README.md'])('allows %s', (path) => {
    expect(checkReadPath(path)).toBeNull();
  });
});

describe('checkFileEdit', () => {
  it('blocks a real env file', () => {
    expect(checkFileEdit('.env.local')).toContain('real env file');
  });

  it.each(['README.md', 'assets/banner-dark.svg', '.env.example'])('allows %s', (path) => {
    expect(checkFileEdit(path)).toBeNull();
  });
});
