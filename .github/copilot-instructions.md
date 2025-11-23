# AnVIL Portal - GitHub Copilot Instructions

## Repository Overview

This repository contains the front-facing AnVIL (Analysis, Visualization, and Informatics Lab-space) user portal located at [https://anvilproject.org](https://anvilproject.org). AnVIL is an NHGRI initiative for democratizing genomic data access, sharing, and computing across large genomic-related datasets.

## Technology Stack

- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Emotion (CSS-in-JS) with Material-UI (MUI) v7
- **Content**: MDX for documentation and content pages
- **Build Tools**: Node.js 20.10.0, npm
- **Code Quality**: ESLint, Prettier, Husky for pre-commit hooks

## Project Structure

### Key Directories

- `components/` - React components organized by feature (Events, Consortia, News, Home, Overview, Releases, etc.)
- `pages/` - Next.js pages and routing
- `docs/` - MDX documentation files for various sections (learn, guides, faq, team, events, news, etc.)
- `site-config/` - Configuration files split by environment (dev/prod) for the anvil-portal
- `styles/` - Global styles and theme configuration
- `theme/` - Material-UI theme customization
- `scripts/` - Build and utility scripts
- `views/` - View components
- `routes/` - Routing utilities
- `providers/` - React context providers
- `analytics/` - Analytics integration
- `content/` - Shared content utilities and constants
- `common/` - Common utilities and shared code
- `public/` - Static assets

### Component Organization

Components follow a consistent structure:

- Each feature has its own directory under `components/`
- Within each feature: `components/`, `hooks/`, `common/` subdirectories
- Components are co-located with their specific logic and utilities

## Development Workflow

### Setup

1. **Install dependencies**: `npm ci` (use clean install for reproducible builds)
2. **Environment setup**: Development environment is configured via `./scripts/dev.sh anvil-portal` which copies the appropriate `.env` file from `site-config/anvil-portal/dev/.env`
3. **Start dev server**: `npm run dev` (runs on http://localhost:3000)

### Build Commands

- **Development build**: `npm run build-dev:anvil-portal` - Builds for development environment
- **Production build**: `npm run build-prod:anvil-portal` - Builds for production environment
- **Start static server**: `npm start` - Serves the built output from the `out/` directory

Both build commands:

1. Run the common build script to set up environment files
2. Set the version using `./scripts/set-version.sh`
3. Run `next build` to create the production bundle
4. Run `npm run postbuild` to generate sitemap

### Code Quality

- **Linting**: `npm run lint` - Runs Next.js ESLint with custom rules
- **Format checking**: `npm run check-format` - Runs Prettier to check code formatting
- **Pre-commit hooks**: Husky is configured to run checks before commits

### Content Management

- **Convert CSER publications**: `npm run convert-cser-publications`
- **Convert GREGoR publications**: `npm run convert-gregor-publications`
- **Update ingestion chart**: `npm run update-ingestion-chart`
- **Add CSER materials**: `npm run add-cser-materials`

## Coding Standards

### TypeScript

- **Strict mode enabled**: All TypeScript strict checks are enforced
- **Explicit return types required**: Functions must have explicit return type annotations (except in style files)
- **Type safety**: Use proper TypeScript types, avoid `any`
- **No implicit any**: All parameters and variables should have explicit types

### Code Style

- **Imports**: Use the `prettier-plugin-organize-imports` which automatically organizes and sorts imports
- **Object keys**: Must be sorted alphabetically (enforced by ESLint)
- **Destructured keys**: Must be sorted (enforced by `sort-destructure-keys` plugin)
- **Interface keys**: Must be sorted alphabetically, case-insensitive (enforced by `typescript-sort-keys/interface`)
- **String enums**: Must be sorted alphabetically (enforced by `typescript-sort-keys/string-enum`)
- **Formatting**: Prettier is configured and enforced (`.prettierrc.json`)
- **No console statements**: Avoid console.log in production code

### Documentation

- **JSDoc required**: All functions require JSDoc comments with:
  - Description of what the function does
  - `@param` tags for all parameters with descriptions
  - `@returns` tag with description of return value
  - Hyphen before parameter descriptions
- **ESLint comments**: All ESLint disable comments must have a description explaining why

### Component Guidelines

- **Functional components**: Use functional components with hooks
- **TypeScript**: All components should be TypeScript (.tsx)
- **Props interfaces**: Define explicit interfaces for component props
- **Styling**: Use Emotion styled components or MUI's `sx` prop for styling
- **File naming**: Components use PascalCase, utilities use camelCase
- **Co-location**: Keep related files close to where they're used

### MDX Content

- **Front matter**: Include `title` and `description` metadata
- **Custom components**: Available MDX components include `<Alert>`, `<Card>`, `<AnalysisPortals>`, etc.
- **Images**: Store in appropriate directories and reference with absolute paths starting with `/`
- **Links**: Use markdown links or Next.js `Link` component for internal navigation

## Testing

- **Test framework**: Jest with React Testing Library
- **Test files**: Should be co-located with components or in `__tests__` directories
- **Coverage**: Aim for good test coverage of critical paths
- No existing test infrastructure is currently set up, so tests are not required for contributions

## Git Workflow

### Commit Messages

Commits must follow the conventional commits format enforced by commitlint:

- **Types**: `build`, `chore`, `ci`, `content`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`
- **Format**: `type: description` or `type(scope): description`
- **Examples**:
  - `feat: add new consortia page`
  - `fix(events): correct date formatting`
  - `docs: update README with setup instructions`
  - `content: add new publication to CSER`

### Branch Strategy

- Development work is done in feature branches
- Deployment scripts exist for different environments:
  - `cc-anvilproject.consortia.dev-deploy.sh` for development
  - `cgl-anvilproject.consortia.prod-deploy.sh` for production

## Dependencies and Security

- **Dependency management**: Use `npm ci` for reproducible installs
- **Security**: Be mindful of protected genomic data - ensure secure handling in any data-related features
- **Audit**: Address security vulnerabilities flagged by `npm audit`
- **Updates**: Use dependabot for dependency updates (configured in `.github/dependabot.yml`)

## Common Patterns and Conventions

### Path Aliases

- Base URL is set to `.` (project root)
- Images can be referenced via `images/*` path alias

### Environment Configuration

- Environment-specific configurations are stored in `site-config/anvil-portal/{env}/`
- `.env` files are copied to `.env.development` or `.env.production` by build scripts
- Configuration includes navigation, social media links, announcements, and more

### Navigation

- Navigation is configured per-environment in `site-config/anvil-portal/dev/navigation/`
- Each major section (learn, news, faq, team, overview, champions, events, help, data-releases, guides, privacy, consortia) has its own navigation configuration file

### Styling

- Use Emotion's `styled` API or Material-UI's `sx` prop
- Follow the theme configuration in `theme/` directory
- Maintain consistency with existing component styles

## External Dependencies

### Key Libraries

- `@databiosphere/findable-ui` - Core UI library
- `@observablehq/plot` - Data visualization
- `echarts` and `echarts-for-react` - Charting
- `@tanstack/react-virtual` - Virtualization
- `gray-matter` - Front matter parsing
- `isomorphic-dompurify` - HTML sanitization (important for security)
- `react-gtm-module` - Google Tag Manager integration
- `date-fns` and `moment-timezone` - Date/time handling

### Transpiled Packages

The project uses two transpilation mechanisms:

**Via `transpilePackages` (Next.js native):**

- axios
- @databiosphere/findable-ui
- @observablehq/plot
- @tanstack/react-table
- @tanstack/react-virtual

**Via `next-transpile-modules` plugin:**

- echarts
- zrender

## When Making Changes

1. **Understand the context**: Review related components and configurations
2. **Follow existing patterns**: Look at similar features for guidance
3. **Test locally**: Run `npm run dev` to test changes
4. **Check code quality**: Run `npm run lint` and `npm run check-format`
5. **Review documentation**: Update MDX files if changing user-facing features
6. **Update configuration**: Modify site-config files if adding new sections or navigation
7. **Commit properly**: Use conventional commit format
8. **Security first**: Ensure any data handling is secure, especially for protected genomic data

## Content Guide

For detailed information about creating and modifying site content, refer to the content guide at: [https://anvilproject.org/content-guide](https://anvilproject.org/content-guide)

## Important Notes

- Node.js version 20.10.0 is required (specified in `engines` in package.json)
- The project uses Next.js static export (generates static HTML)
- MDX is used extensively for content pages
- Material-UI v7 is a major dependency - follow MUI patterns
- Analytics are integrated via Google Tag Manager
- The site supports multiple environments (dev/prod) with different configurations
- Always use `isomorphic-dompurify` for sanitizing any HTML to prevent XSS vulnerabilities
