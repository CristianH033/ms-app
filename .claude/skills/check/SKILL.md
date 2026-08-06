---
name: check
description: Run lint, type-check, and unit tests for this repo and report what failed. Use before committing or when asked to verify changes.
---

Run, in order, stopping to report at the first failure:

1. `npm run lint` — ESLint with `--fix`, so it may modify files. Report anything it could not fix.
2. `npm run type-check` — `vue-tsc --build --force`.
3. `npm run test:unit -- --run` — Vitest, non-watch.

Report only failures: file, line, and the error. If everything passes, say so in one line.

Do not run `npm run test:e2e` (Playwright) unless explicitly asked — it needs a build and browsers installed.
