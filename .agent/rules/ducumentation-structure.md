---
trigger: always_on
---

Documentation must live under `/docs`.

Recommended structure:

/docs
 ├─ overview.md              // Project summary & philosophy
 ├─ architecture.md          // App structure, routing, data flow
 ├─ ui-system.md             // UI components & design rules
 ├─ board-system.md          // Shared board logic
 ├─ auth-and-roles.md        // User/Admin model (future-proof)
 ├─ data-models.md           // Interfaces & entities
 ├─ decisions/
 │    ├─ 001-board-design.md
 │    ├─ 002-admin-separation.md
 │    └─ ...
 └─ changelog.md
