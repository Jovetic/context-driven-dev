# CDD CLI - Context-Driven Development Command Line Tool

Validation and management tool for Context-Driven Development projects.

## Installation

```bash
# From the cli directory
npm install
npm link

# Or install globally (once published)
npm install -g @context-driven-dev/cli
```

## Commands

### `cdd validate [path]`

Validate JSON syntax and structure of AI context files.

```bash
# Validate default location (.github/ai-context)
cdd validate

# Validate custom path
cdd validate ./docs/ai-context

# Strict mode (warnings fail build)
cdd validate --strict

# Auto-fix common issues (backup created)
cdd validate --fix
```

**Validates:**
- JSON syntax errors
- Required fields in anti_patterns.json
- Flow documentation structure
- DEPENDENCY_GRAPH routing rules
- Schema definitions

### `cdd audit [path]`

Check for stale or outdated context entries.

```bash
# Audit with default threshold (90 days)
cdd audit

# Custom staleness threshold
cdd audit --stale-threshold 60

# JSON output for CI/CD
cdd audit --format json
```

**Checks:**
- `last_updated` timestamps
- Individual entry dates (like recent_changes)
- Reports entries older than threshold

### `cdd analyze-gaps [path]`

Identify missing documentation based on codebase analysis.

```bash
# Analyze current project
cdd analyze-gaps

# With suggestions
cdd analyze-gaps --suggest
```

**Detects:**
- Missing .github/ai-context directory
- Missing critical files (DEPENDENCY_GRAPH.json, anti_patterns.json)
- Undocumented component types (services, models, controllers)
- Gaps between code and context coverage

## Usage in CI/CD

### GitHub Actions

```yaml
name: Validate Context

on: [pull_request]

jobs:
  validate-cdd:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g @context-driven-dev/cli
      - run: cdd validate --strict
      - run: cdd audit --stale-threshold 90
```

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

if ! cdd validate .github/ai-context; then
  echo "❌ Context validation failed"
  exit 1
fi
```

## Exit Codes

- `0` - Success
- `1` - Validation errors or stale entries found

## Examples

**Successful validation:**
```
$ cdd validate
✔ Scanning for context files... (12 files)
✔ .github/ai-context/troubleshooting/anti_patterns.json
✔ .github/ai-context/flows/provisioning.json
✔ .github/ai-context/DEPENDENCY_GRAPH.json

Summary:
  Files validated: 12
  Errors: 0
  Warnings: 0
```

**Validation with warnings:**
```
$ cdd validate
✔ Scanning for context files... (12 files)
✔ .github/ai-context/troubleshooting/anti_patterns.json
✗ .github/ai-context/flows/new_feature.json
  ⚠ Missing "_ai_instructions.purpose"
  ⚠ Missing "last_updated" timestamp

Summary:
  Files validated: 12
  Errors: 0
  Warnings: 2
```

**Audit findings:**
```
$ cdd audit --stale-threshold 60
✔ Audit complete: 3 stale entries found

⚠ Found 3 stale entries (>60 days old):

  .github/ai-context/metadata/recent_changes.json (entry 5)
    Last updated: 2025-08-15 (98 days ago)
    Title: Old feature implementation

💡 Tip: Review these entries and update or archive as needed.
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Watch mode
npm run test:watch
```

## License

MIT
