# Contributing to AnVIL Portal

Thank you for your interest in contributing to the AnVIL Portal! This document provides guidelines for contributing to the project.

## Pull Request Guidelines

### PR Title Format

All pull request titles must follow a specific format to maintain consistency and traceability:

**Required Format:**
```
type: description starting with lowercase (#123)
```

Where:
- `type` is a valid semantic commit type (see below)
- Description must start with a lowercase letter
- Ticket number must be included at the end in parentheses, e.g., `(#123)`

**Valid Semantic Commit Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit
- `content`: Content-related changes

**Examples of Valid PR Titles:**
- ✅ `feat: add new consortia page (#456)`
- ✅ `fix: correct date formatting in events (#789)`
- ✅ `docs: update README with setup instructions (#123)`
- ✅ `fix(events): resolve timezone bug (#234)` (with optional scope)

**Examples of Invalid PR Titles:**
- ❌ `feat: Add new feature (#123)` - Description starts with uppercase
- ❌ `feat: add new feature` - Missing ticket number
- ❌ `Add new feature (#123)` - Missing semantic type
- ❌ `feat:add new feature (#123)` - Missing space after colon

### Automated Validation

A GitHub Actions workflow automatically validates PR titles when:
- A PR is opened
- A PR title is edited
- New commits are pushed to a PR

If your PR title doesn't match the required format, the workflow will fail and provide feedback with examples and common issues.

## Development Guidelines

### Setting Up Your Environment

1. Fork the repository
2. Clone your fork: `git clone git@github.com:YOUR-USERNAME/anvil-portal.git`
3. Install dependencies: `npm ci`
4. Start the development server: `npm run dev`

### Code Quality

- **Linting**: Run `npm run lint` before committing
- **Formatting**: Run `npm run check-format` to verify code formatting
- **TypeScript**: Ensure no TypeScript errors with `npx tsc --noEmit`
- **Pre-commit hooks**: Husky is configured to run checks automatically

### Building and Testing

- **Development build**: `npm run build-dev:anvil-portal`
- **Production build**: `npm run build-prod:anvil-portal`
- **Start server**: `npm start` (after building)

### Commit Messages

Commit messages should also follow the conventional commits format:
```
type: description
```

or with scope:
```
type(scope): description
```

This is enforced by commitlint.

## Content Contributions

For information about creating or modifying site content, see the [Content Guide](https://anvilproject.org/content-guide).

## Questions?

If you have questions about contributing, please open an issue in the repository.
