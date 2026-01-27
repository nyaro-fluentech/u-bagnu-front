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

## SEO Guidelines (IMPORTANT)

SEO is a critical priority for this project. Follow these guidelines for all development work:

### Metadata

- **Every page** must have unique, descriptive `title` and `description` metadata
- Use the template pattern in `layout.tsx`: `"%s | U Bagnu"` for child pages
- Include relevant keywords naturally in descriptions (récupération sportive, bain froid, Corse, etc.)
- Keep titles under 60 characters, descriptions under 160 characters

### Semantic HTML

- Use proper heading hierarchy: one `<h1>` per page, followed by `<h2>`, `<h3>`, etc.
- Use semantic elements: `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<main>`
- Add `id` attributes to sections for anchor navigation (e.g., `id="services"`, `id="about"`)

### Images

- **Always** include descriptive `alt` attributes on all `<Image>` components
- Use descriptive file names (e.g., `sauna-infrarouge.jpg` not `image-1.jpg`)
- Prefer Next.js `<Image>` component for automatic optimization
- Add `width` and `height` props to prevent layout shift
- Consider adding `loading="eager"` for above-the-fold images

### Performance (Core Web Vitals)

- Minimize JavaScript bundle size
- Use `next/font` for font optimization (already configured)
- Lazy load below-the-fold content and images
- Avoid layout shifts (CLS) - always define dimensions for media

### Structured Data

- Add JSON-LD structured data for local business when appropriate
- Include organization, service, and location schema

### Links & Navigation

- Use descriptive anchor text (not "click here")
- Internal links should use Next.js `<Link>` component
- External links should have `rel="noopener noreferrer"`

### Accessibility (impacts SEO)

- Ensure sufficient color contrast
- Add `aria-label` to icon-only buttons
- Make all interactive elements keyboard accessible
- Use `lang="fr"` on `<html>` element (already configured)

### Files

- `app/layout.tsx` - Global metadata configuration
- `app/sitemap.ts` - Auto-generated sitemap
- `app/robots.ts` - Search engine crawling rules
- `public/img/og-image.jpg` - Open Graph image (1200x630px) - TODO: create this image
