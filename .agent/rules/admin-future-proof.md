---
trigger: manual
---

Admin features are not implemented yet.

Rules:
- Do not mix admin UI with user UI
- All admin-related logic must be isolated behind:
  - feature flags
  - role checks
  - separate components

User-facing components should NOT know about admin logic.
Admin extensions should be additive, not modifying existing code.