# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

혜광교회 (Hae-Gwang Church) website built with Next.js 16 App Router and TypeScript. A Korean church website with bulletin boards, announcements, and congregation features.

**Key Context**:
- Target users include elderly congregation members → prioritize simple, clear UI
- Korean content in UI, English in code (comments and variable names)
- Long-term maintainability is critical (avoid over-engineering)
- Documentation is mandatory for all features and decisions

## Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

**Note**: There is no test framework configured in this project.

## Architecture

### Directory Structure

```
app/                    # Next.js App Router pages
├── (routes)/          # Route groups with sub-navigation
│   ├── about/         # Church info pages
│   ├── sunday-school/ # Sunday school departments
│   ├── nurturing/     # Education/devotion pages
│   ├── news/          # Announcements, bulletins
│   └── fellowship/    # Board system (grace/thanks/daily)
├── layout.tsx         # Root layout with header/footer
└── page.tsx           # Homepage

components/
├── ui/                # shadcn/ui base components (DO NOT edit directly)
├── fellowship/        # Reusable board components
└── *.tsx              # Layout components (header, footer, navigation)

lib/
├── constants/         # Configuration (e.g., fellowship.ts)
├── mock/              # Mock data generators (temporary until Supabase)
└── utils.ts           # Utility functions (cn for classnames)

types/                 # TypeScript type definitions

docs/                  # Project documentation (MUST READ before major changes)
├── overview.md
├── architecture.md
├── ui-system.md
├── board-system.md
└── decisions/         # Architecture Decision Records (ADRs)

supabase/
└── migrations/        # Database schema (future integration)
```

### Key Patterns

**Reusable Board System**: The fellowship section (`/fellowship/grace`, `/fellowship/thanks`, `/fellowship/daily`) uses shared components in `components/fellowship/`. All three boards use identical UI with category passed via props. This is a core pattern - DO NOT duplicate board code.

**Route Redirects**: Section root paths redirect to first subpage:
- `/about` → `/about/greeting`
- `/fellowship` → `/fellowship/grace`
- etc.

**Sub-Navigation**: Each section has a `layout.tsx` that includes `<SubNavigation>` for consistent tab navigation within that section.

**Server Components First**: Pages are server components by default. Only use `'use client'` when absolutely necessary (interactivity, hooks, browser APIs).

### UI Stack

- **Tailwind CSS** with `tailwind-merge` for class merging
- **shadcn/ui** components in `components/ui/` (installed via CLI, don't edit manually)
- **Lucide React** for icons
- **next-themes** for dark mode support

### Data Flow (Current → Future)

**Current**: Mock data for development
```
Page Component → lib/mock/fellowship-data.ts → types/fellowship.ts → Board Components
```

**Future**: Supabase integration planned
```
Page Component → Supabase Client → types/fellowship.ts → Board Components
```

**Important**: All data interfaces are defined in `types/` to prepare for easy Supabase migration. UI components should NOT be tightly coupled to data source.

## Code Conventions

### File Naming
- File names: `kebab-case` (`board-list.tsx`)
- Component names: `PascalCase` (`BoardList`)
- Named exports preferred over default exports

### File Headers
- **Every file must include a header comment** explaining what the file does
- Keep it concise (1-3 lines)
- This helps navigate the codebase autonomously in fresh sessions

**Example**:
```typescript
// Board list component - displays fellowship posts in a table format with pagination
```

### TypeScript
- Strict mode enabled
- No `any` types allowed
- All data models must have interfaces in `types/`

### React
- Functional components only (no class components)
- Keep components small and focused
- Extract reusable logic into custom hooks
- Avoid complex logic inside JSX

### Content
- UI text: Korean (한글)
- Code: English (comments, variables, functions)
- Documentation: Korean preferred for context, English acceptable

## Key Types

```typescript
// types/fellowship.ts
type BoardCategory = 'grace' | 'thanks' | 'daily'

interface FellowshipPost {
  id: string
  title: string
  content: string
  author_name: string
  view_count: number
  is_pinned: boolean
  created_at: string
  // ... see types/fellowship.ts for complete definition
}

interface FellowshipPostListItem {
  // Optimized version for list views (excludes content)
}
```

## Important Constraints

### Before Adding Libraries
- **STOP**: Explain why the library is necessary
- Prefer simple, explicit solutions over dependencies
- Consider long-term maintenance cost

### Before Major Changes
- **READ**: Relevant documentation in `/docs`
- Check if similar patterns exist elsewhere
- Document your decision in `/docs/decisions` if architectural

### When Creating Components
- Check if a similar component exists
- Use existing UI components from `components/ui/`
- Follow the reusable board pattern for new board-like features

## Development Workflow

1. **Understand** → Read relevant docs in `/docs`
2. **Define Types** → Create/update interfaces in `types/`
3. **Mock Data** → Create mock data in `lib/mock/` (if needed)
4. **Build Components** → Reusable components in `components/`
5. **Create Pages** → Compose components in `app/`
6. **Document** → Update `/docs` for significant changes

## Common Tasks

### Adding a New Board Category
1. Add category to `BoardCategory` type in `types/fellowship.ts`
2. Add config to `FELLOWSHIP_CATEGORIES` in `lib/constants/fellowship.ts`
3. Create route folder in `app/fellowship/[new-category]/`
4. Reuse existing `components/fellowship/` components
5. Update sub-navigation in `app/fellowship/layout.tsx`

### Adding a New Page Section
1. Create route in `app/(routes)/[section]/`
2. Add `layout.tsx` with `<SubNavigation>` if needed
3. Create `page.tsx` for each subsection
4. Update main navigation in `components/navigation.tsx`
5. Document in `/docs/architecture.md`

### Styling Guidelines
- Use Tailwind utility classes
- For complex/repeated patterns, use `cn()` utility
- Respect dark mode (use semantic colors like `bg-background`, `text-foreground`)
- Mobile-first responsive design (start with mobile, add `md:`, `lg:` for larger screens)

## Planned Features (Not Yet Implemented)

**Phase 2** (Near future):
- Supabase database integration
- User authentication (Supabase Auth)
- Post creation/editing (authenticated users only)
- Comments system

**Phase 3** (Future):
- Admin panel
- Image uploads
- Search functionality
- Push notifications

## Troubleshooting

### Common Issues

**Issue**: `legacyBehavior` warning with Next.js Link
**Solution**: Use `<Link>` directly without nested `<a>` tag (Next.js 13+ pattern)

**Issue**: Dark mode not working
**Solution**: Ensure using semantic Tailwind classes (`bg-background` not `bg-white`)

**Issue**: Type errors with fellowship data
**Solution**: Check `types/fellowship.ts` - all interfaces are defined there

## Additional Resources

- [README.md](./README.md) - Quick start guide
- [PRD.md](./PRD.md) - Product requirements (Korean)
- [docs/overview.md](./docs/overview.md) - Project philosophy
- [docs/architecture.md](./docs/architecture.md) - Detailed architecture
- [docs/board-system.md](./docs/board-system.md) - Board implementation details

## Project Philosophy

From `/docs/overview.md`:

1. **Clarity over cleverness** - Simple, explicit solutions preferred
2. **Separation of concerns** - Clear boundaries between routing, components, logic
3. **Type safety** - Prevent errors at compile time
4. **Documentation** - All major decisions must be documented

**Remember**: This is a church website for real people, including elderly users. Prioritize clarity, accessibility, and maintainability over technical sophistication.

## Rules

you should follow the rules under `./agent/rules`