# Context-Driven Development CLI - AI Coding Agent Instructions

**Last Updated:** 2025-11-24  
**Project:** @context-driven-dev/cli  
**Tech Stack:** Node.js 18+, ES Modules, Commander.js, Chalk, Ora, Glob  
**Purpose:** CLI tool for validating and managing Context-Driven Development files

## 🚨 SESSION START - REQUIRED READING ORDER

1. **ALWAYS FIRST:** `.github/ai-context/flows/validation_cli.json` → Complete architecture and extension patterns
2. **Reference docs:** `README.md` → Usage examples and command documentation
3. **Templates:** `template/.github/` → Example context structure this tool validates

## 🤖 YOUR ROLE: DOGFOODING CDD

**This project uses Context-Driven Development methodology on itself (meta!).**

After EVERY change:
- Update `.github/ai-context/flows/validation_cli.json` with new patterns
- Document bugs as anti-patterns (when we add anti_patterns.json here)
- Run `npm test` to verify (when tests exist)
- Run `cdd validate .github/ai-context` to validate our own context

## 🏗️ ARCHITECTURE OVERVIEW

### Command Flow
```
bin/cdd.js (CLI entry)
  ├─> src/commands/validate.js → Validates JSON syntax & structure
  ├─> src/commands/audit.js → Checks for stale context entries
  └─> src/commands/analyze-gaps.js → Identifies missing documentation

Each command imports validators:
  ├─> src/validators/anti-patterns.js
  ├─> src/validators/flows.js
  ├─> src/validators/schemas.js
  └─> src/validators/dependency-graph.js
```

### Module System: ES Modules (Critical!)
- **ALL imports MUST include `.js` extension**: `import { x } from './file.js'`
- **package.json has `"type": "module"`** - no CommonJS
- Use `import`/`export`, never `require()`/`module.exports`

### Validation Pattern
```javascript
export function validateType(data, file) {
  const errors = [];   // Hard failures
  const warnings = []; // Suggestions
  
  // Validation logic
  
  return { valid: errors.length === 0, errors, warnings };
}
```

## ⚠️ CRITICAL PATTERNS

### Adding New Validators
1. Create `src/validators/new-type.js` with `export function validateNewType(data, file)`
2. Import in `src/commands/validate.js`: `import { validateNewType } from '../validators/new-type.js';`
3. Add conditional: `if (file.includes('new-type')) { result = validateNewType(data, file); }`

**Example:** See `src/validators/anti-patterns.js` for structure

### Adding New Commands
1. Create `src/commands/new-command.js` with `export async function newCommand(path, options)`
2. Import in `bin/cdd.js`: `import { newCommand } from '../src/commands/new-command.js';`
3. Add Commander definition:
```javascript
program
  .command('new-command')
  .argument('[path]', 'Description', 'default')
  .option('--flag', 'Description')
  .action(newCommand);
```

**Example:** See `src/commands/audit.js` for complete implementation

### Error Handling
- Commands use **try/catch** around async operations
- Validators return **structured objects** `{valid, errors, warnings}`
- **Exit code 0** = success, **1** = failure (important for CI/CD)
- Use `process.exit(1)` on validation errors

### Output Styling
- `ora()` for spinners: `.start()` → `.succeed()` / `.fail()`
- `chalk.green()` success, `chalk.red()` error, `chalk.yellow()` warning, `chalk.cyan()` info
- Symbols: `✓ ✗ ⚠ 💡` for visual clarity

## 🔧 DEVELOPMENT COMMANDS

```bash
# Setup
npm install          # Install dependencies
npm link            # Make 'cdd' command globally available

# Testing (when tests exist)
npm test            # Run Jest with ES modules
npm run test:watch  # Watch mode

# Validation (dogfooding)
cdd validate .github/ai-context  # Validate our own context files
cdd analyze-gaps .              # Check for documentation gaps
```

## 🗂️ KEY FILES & THEIR PURPOSE

**Entry point:**
- `bin/cdd.js` → CLI interface, Commander.js program definition

**Commands (orchestrate validation):**
- `src/commands/validate.js` → Main validation flow, calls type-specific validators
- `src/commands/audit.js` → Staleness detection based on `last_updated` timestamps
- `src/commands/analyze-gaps.js` → Compares source code vs documented patterns

**Validators (domain logic):**
- `src/validators/anti-patterns.js` → Checks `wrong`, `correct`, `why_bad` fields
- `src/validators/flows.js` → Checks `_ai_instructions`, `flow` steps, `last_updated`
- `src/validators/schemas.js` → Checks `models`/`schemas` structure
- `src/validators/dependency-graph.js` → Checks `routing_rules`, `file` targets

**Templates (examples):**
- `template/.github/copilot-instructions.md` → Template for users to customize
- `template/.github/DEPENDENCY_GRAPH.json` → Example router configuration
- `template/.github/ai-context/` → Example flows, schemas, troubleshooting files

**Scripts:**
- `scripts/update-ai-context.sh` → Helper to update context with git commit
- `create_docs.sh` → Generates CONTRIBUTING.md and FAQ.md

## 🧪 VALIDATION RULES REFERENCE

### Anti-Patterns (`anti_patterns.json`)
**Required:**
- `anti_patterns` object
- Each pattern: `wrong`, `correct`

**Recommended (warnings if missing):**
- `critical_never_do` array
- `why_bad` or `impact` per pattern
- `discovered` date for historical context

### Flows (`flows/*.json`)
**Recommended (warnings if missing):**
- `_ai_instructions.purpose` and `.when_to_use`
- Flow steps with `step`/`phase` identifiers
- `last_updated` timestamp

### Dependency Graph (`DEPENDENCY_GRAPH.json`)
**Required:**
- `routing_rules` or `routes` object
- Each route: `file` or `files` target

**Recommended:**
- `keywords` or `description` per route

## 📝 AUTONOMOUS UPDATE PROTOCOL

**When you add a new feature:**
1. Update `.github/ai-context/flows/validation_cli.json` with implementation details
2. Add to `extension_patterns` or `future_enhancements` sections
3. Update this file's "Adding New Validators/Commands" section if patterns changed

**When you fix a bug:**
1. Document the mistake in `validation_cli.json` under `common_issues`
2. Add fix verification to prevent recurrence

**When architecture changes:**
1. Update `architecture` section in `validation_cli.json`
2. Update the "Architecture Overview" in this file

## 🎯 COMMON TASKS

### "Add validation for a new context file type"
1. Read `.github/ai-context/flows/validation_cli.json` → `extension_patterns.adding_new_validator`
2. Create `src/validators/new-type.js` following the return pattern
3. Import and add conditional in `src/commands/validate.js`
4. Update `validation_cli.json` with new validator documentation

### "Add a new CLI command"
1. Read `.github/ai-context/flows/validation_cli.json` → `extension_patterns.adding_new_command`
2. Create `src/commands/new-command.js` with async function export
3. Import and add `.command()` in `bin/cdd.js`
4. Update README.md with command documentation

### "Fix JSON parsing error handling"
1. Check `src/commands/validate.js` → try/catch around `JSON.parse()`
2. Errors caught and displayed with line context
3. Pattern: `fileSpinner.fail()` → `console.log(chalk.red())` → `errors++`

## 🚀 CI/CD INTEGRATION

This tool is designed for automated validation:

```yaml
# .github/workflows/validate-context.yml
- run: npm install -g @context-driven-dev/cli
- run: cdd validate --strict
- run: cdd audit --stale-threshold 90
```

**Exit codes matter:**
- 0 = pass (continue workflow)
- 1 = fail (block PR/merge)

## 🔮 FUTURE ENHANCEMENTS

**High Priority:**
- Auto-fix implementation (`--fix` flag) with backup
- JSON schema definitions for validation
- Better error messages with line numbers

**See `.github/ai-context/flows/validation_cli.json` → `future_enhancements` for complete roadmap**

---

**Last Updated:** 2025-11-24  
**Maintained By:** Christian Jovetic + AI (autonomous context curator)  
**Dogfooding Status:** ✅ Using CDD methodology to build CDD tooling
