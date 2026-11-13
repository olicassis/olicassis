---
paths:
  - 'tooling/**'
---

# Tests and tooling

- Test first: one failing Vitest test, watched failing for the right reason, then the least code to pass.
- Keep decision logic in pure functions in `src/`; `bin/` scripts only read input and call them.
- Hook scripts run with Node's type stripping: import with `.ts` extensions, no enums, no parameter properties.
- Prefer real code and temporary directories over mocks.
