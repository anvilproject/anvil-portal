# Contributing to AnVIL Portal

Thank you for your interest in contributing to the AnVIL Portal! This document provides guidelines to help ensure a consistent and high-quality workflow for all contributors.

## Contribution Workflow

### 1. GitHub Issues

**Always create a GitHub issue before submitting a Pull Request.**

- Every PR must be associated with a GitHub issue
- The issue should clearly describe the problem, feature request, or improvement
- Use the issue to discuss the approach before implementing changes
- Reference the issue number in your commits and PR title

### 2. Pull Requests

**Keep PRs focused on a single issue.**

- Each PR should address exactly one GitHub issue
- Avoid combining multiple unrelated changes in a single PR
- This makes code review easier and helps maintain a clear project history
- If you have multiple changes, create separate issues and PRs for each

### 3. Commit Messages

**Use semantic commit messages with issue references.**

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) format and include the GitHub issue number.

#### Format

```
<type>: <description> (#<issue-number>)
```

#### Examples

```
feat: add user authentication (#123)
fix: resolve navigation bug on mobile (#456)
chore: update dependencies (#789)
docs: improve installation instructions (#321)
```

#### Allowed Types

- **feat**: A new feature
- **fix**: A bug fix
- **chore**: Routine tasks, maintenance, or tooling changes
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Changes to build system or dependencies
- **ci**: Changes to CI configuration files and scripts
- **revert**: Reverting a previous commit
- **content**: Content updates (specific to this project)

#### Enforcement

This project uses git hooks to automatically enforce these conventions:

- Commit messages must include an issue reference (`#xxx`)
- Commit messages must follow the Conventional Commits format

You can bypass these checks with `--no-verify` if absolutely necessary, but this is strongly discouraged.

### 4. Pull Request Titles

**PR titles should follow the same format as commit messages.**

```
<type>: <description> (#<issue-number>)
```

Example:

```
feat: add search functionality to publications page (#234)
```

## Getting Started

See the [README.md](../README.md) for information on:

- Setting up your development environment
- Installing dependencies
- Running the development server
- Content contribution guidelines

## Code Review Process

1. Create a GitHub issue describing your proposed changes
2. Fork the repository and create a new branch
3. Make your changes following the guidelines above
4. Ensure your code passes all linting and formatting checks (`npm run lint`, `npm run check-format`)
5. Submit a PR referencing the issue number
6. Address any feedback from code reviewers
7. Once approved, a maintainer will merge your PR

## Questions?

If you have questions about contributing, please open an issue with the `question` label or reach out to the maintainers.

Thank you for contributing to the AnVIL Portal!
