---
paths:
  - 'README.md'
  - 'assets/**'
---

# The profile README

- Sections open with a mono heading: `### \`// about\``, `// stack`, `// links`.
- Badges use shields.io `flat-square` with the cassis palette: ground `1e0d24` (blackcurrant), logo colour `82c913` (leaf), link badges `a3245f` (juice) on a `1e0d24` label. Keep lowercase labels.
- A new image goes in `assets/` as SVG where possible. Give each `<img>` alt text and a `width`.
- Theme images: one `<picture>` with a `prefers-color-scheme: dark` `<source>` and a light `<img>` fallback.
- Buttons, tags and eyebrows are lowercase. Dates use `2021 — 2024` and `2024 — now`.
- Links that leave GitHub point to the portfolio (<https://olicassis.github.io>) or the owner's real profiles only.
- Check the result in GitHub's light and dark themes. Paste screenshots of both into the PR.
- `pnpm lint:md` runs markdownlint. Its config allows inline HTML and long lines for this file.
