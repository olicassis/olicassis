# olicassis (GitHub profile README)

Elias's GitHub profile page. GitHub shows `README.md` on <https://github.com/olicassis>. Everything else in this repo checks that page or holds its images.

## Rules that are never broken

1. The README uses the cassis design system: the banner SVGs, the manga portrait and the badge palette (`1e0d24` ground, `82c913` logos, `a3245f` link badges).
2. The README works in GitHub's light and dark themes. Theme-specific images use `<picture>` with `prefers-color-scheme`.
3. Only HTML that GitHub keeps: no `<style>`, no `<script>`, no `class` or `style` attributes.
4. Never invent facts about the owner. A missing fact stays a `TODO` comment or a placeholder.
5. Text is English, first person, plain and direct. No emoji in the text.

## How work happens

1. Work on a branch, never on `main`. One PR per change.
2. Commits and PR titles follow `.gitmessage`: `type(scope): emoji subject`. commitlint rejects anything else. The PR title becomes the squash commit on `main`.
3. Tooling in `tooling/harness/` is test first: a failing Vitest test, then the code.
4. You may not push, open PRs, add dependencies or fetch web pages without asking. Dependencies use exact versions only (`pnpm deps:check`).
5. Before you push a branch, run the `code-reviewer` subagent once on the branch diff and fix every must-fix finding.

## Commands

| Task            | Command                                                            |
| --------------- | ------------------------------------------------------------------ |
| All checks      | `pnpm lint:md && pnpm typecheck && pnpm test && pnpm format:check` |
| Context budgets | `pnpm harness:check`                                               |
| Pinned versions | `pnpm deps:check`                                                  |

## Where things are

| Path               | What                                       |
| ------------------ | ------------------------------------------ |
| `README.md`        | The profile page                           |
| `assets/`          | Light and dark banners, the manga portrait |
| `tooling/harness/` | Hook scripts and repo checks (tested)      |

The portfolio site is a separate repo, `olicassis/olicassis.github.io`. Keep links and wording in step with it.

## Writing: ASD-STE100 Simplified Technical English

Replies, docs, comments, commits and PRs are in English and follow ASD-STE100:

- One topic per sentence. Procedural sentences have 20 words or fewer, descriptive sentences 25 or fewer.
- Give instructions in the imperative, one action per step. Use the active voice and simple tenses.
- Use one word for one meaning, and the same term each time. No idioms, filler or hedging.
- Start with the result. Give the command, path or number, not the story.

The README's own text follows the olicassis voice (rule 5), not STE.
