# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AnVIL Portal is a Next.js 14 static site (anvilproject.org) for the NHGRI's Analysis, Visualization, and Informatics Lab-space initiative. It uses TypeScript with strict mode, MDX for content pages, and Material-UI v7 with Emotion for styling.

## Common Commands

```bash
# Development
npm ci                           # Install dependencies
npm run dev                      # Start dev server (localhost:3000)

# Building
npm run build-dev:anvil-portal   # Build for development environment
npm run build-prod:anvil-portal  # Build for production environment
npm start                        # Serve built output from out/

# Code quality
npm run lint                     # Run ESLint
npm run check-format             # Check Prettier formatting

# Content scripts
npm run convert-cser-publications
npm run convert-gregor-publications
npm run update-ingestion-chart
npm run add-cser-materials
```

## Architecture

### Routing and Content

The site uses Next.js static export with MDX content:
- **`pages/[...slug].tsx`** - Dynamic catch-all route that serves MDX content from `docs/`
- **`pages/`** - Contains specialized pages (events, learn, news, releases, search, index)
- **`docs/`** - MDX content files organized by section (learn, news, events, faq, consortia, etc.)
- Content is parsed with `gray-matter` for frontmatter and rendered with `next-mdx-remote`

### Configuration System

- **`config/config.ts`** - Loads site config based on `NEXT_PUBLIC_SITE_CONFIG` env var
- **`site-config/anvil-portal/{dev,prod}/`** - Environment-specific configurations
  - `config.ts` - Main config (analytics, theme, layout)
  - `navigation/` - Navigation configs per section
  - `announcements/`, `socialMedia.ts` - Feature-specific configs
- Build scripts (`scripts/common-build.sh`) copy appropriate `.env` files to `.env.development`/`.env.production`

### Component Structure

Components in `components/` are organized by feature:
- Each feature directory (Events, Home, Consortia, News, etc.) contains:
  - `components/` - Nested child components
  - `hooks/` - Feature-specific hooks
  - `common/` - Constants, entities, utilities
- Styling files use `.styles.ts` suffix with Emotion styled components

### Key Dependencies

- **`@databiosphere/findable-ui`** - Core UI library providing layout components, providers, and hooks
- **`@observablehq/plot`**, **`echarts`** - Data visualization
- **`isomorphic-dompurify`** - HTML sanitization (required for XSS prevention)

### Feature Flags

Feature flags for consortium pages (GREGoR, PRIMED) are managed via:
- `setFeatureFlags()` in `pages/_app.tsx`
- `useFeatureFlag()` hook from `@databiosphere/findable-ui`
- `components/Consortia/featureFlag/utils.ts` - Navigation filtering

## Code Standards

### ESLint Rules (enforced)

- **Sort keys alphabetically** in objects, interfaces, and string enums
- **Sort destructured keys** alphabetically
- **Explicit return types** required (except in `.styles.ts` files)
- **JSDoc required** with description, `@param` (with hyphen before description), and `@returns`
- **ESLint disable comments** must include description

### Commit Messages

Uses conventional commits (enforced by commitlint):
- Types: `build`, `chore`, `ci`, `content`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`
- Format: `type: description` or `type(scope): description`

### MDX Content

- Frontmatter requires `title` and `description`
- Custom MDX components available in `docs/common/constants.ts` (`MDX_COMPONENTS`)
- Set `enableOutline: true` in frontmatter to show table of contents

## Node Version

Node.js 20.10.0 is required (specified in `package.json` engines).
