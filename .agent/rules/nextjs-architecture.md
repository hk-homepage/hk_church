---
trigger: always_on
---

Use Next.js App Router conventions strictly.

Rules:
- All routes must live under the `app/` directory
- Prefer dynamic routes (`[type]`, `[slug]`) for repeated page patterns
- Layout logic belongs in `layout.tsx`, not in page components
- Avoid deep nesting beyond 3 levels unless clearly justified

Folder organization:
- `app/` for routing and page composition
- `components/` for reusable UI components
- `lib/` for utilities, helpers, and shared logic
- `types/` for shared TypeScript types