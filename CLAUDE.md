# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Production build (outputs standalone)
pnpm lint         # Run ESLint
```

## Architecture

This is a Next.js 16 App Router project with React 19, TypeScript, and Tailwind CSS v4.

### Directory Structure

- `app/` - Next.js App Router pages and page-specific components
  - `app/_components/` - Components scoped to pages (prefixed with `_` to exclude from routing)
  - `app/_components/sections/` - Full-page section components
- `components/ui/` - Shared UI components (shadcn/ui pattern with CVA variants)
- `lib/utils.ts` - Utility functions including `cn()` for className merging

### Styling

- Tailwind CSS v4 with `@import "tailwindcss"` syntax in `globals.css`
- CSS variables for theming defined in `:root` (primary color: `#2954a4`)
- Custom fonts: Outfit (body), Bricolage Grotesque (headings) via `next/font`
- Font utilities: `font-outfit`, `font-bricolage-grotesque`, `font-inter`
- tw-animate-css for animations

### Animations

GSAP with ScrollTrigger is used for scroll-based animations. Animation components are "headless" (return `null`) and manipulate DOM via refs/queries:
- `header-animation.tsx` - Header fade on scroll through sections
- `services-scroll-animation.tsx` - Horizontal scroll pinning for services cards

### Code Style

- No semicolons
- Double quotes for strings
- 2 space indentation
- Prettier with tailwindcss plugin auto-sorts classes
