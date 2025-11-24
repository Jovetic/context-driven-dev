# [Project Name] AI Coding Agent Instructions

**Last Updated:** 2025-11-24  
**Codebase:** [Brief description of your project]  
**Tech Stack:** [Languages, frameworks, tools]  
**Module System:** [CommonJS, ES Modules, etc.]

## 🚨 SESSION START - REQUIRED READING ORDER

1. **ALWAYS FIRST:** `.github/DEPENDENCY_GRAPH.json` → Router tells you which context file to load
2. **Load targeted context:** `.github/ai-context/` → Modular files (flows, schemas, troubleshooting)
3. **Check current work:** `ROADMAP.md` → Active features, priorities, recent completions
4. **Reference docs:** `docs/` → Documentation hub

## 📊 DOCS-FIRST WORKFLOW (MANDATORY)

**⚠️ RULE: Read `.github/DEPENDENCY_GRAPH.json` BEFORE any code search**

### Workflow Steps
1. **Router** → `.github/DEPENDENCY_GRAPH.json` shows which context file to load
2. **Targeted context** → Load specific file from `.github/ai-context/`
3. **Code verification** → ONLY if needed: `grep_search`, `semantic_search`, `read_file`

### Context File Router
| Question Type | Load This File |
|--------------|----------------|
| [Feature X] implementation | `flows/feature_x.json` |
| Database schema | `schemas/database_models.json` |
| Troubleshooting errors | `troubleshooting/decision_trees.json` |
| Avoid known mistakes | `troubleshooting/anti_patterns.json` |
| Recent changes | `metadata/recent_changes.json` |

---

## 🏗️ ARCHITECTURE PATTERNS

### Service Landscape
```
[Describe your services/modules here]
```

### Code Organization
```
src/
├── routes/          → [Description]
├── controllers/     → [Description]
├── services/        → [Description]
├── models/          → [Description]
└── middleware/      → [Description]
```

### Key Infrastructure
- **Database:** [Type, connection pattern]
- **Authentication:** [JWT, OAuth, etc.]
- **Deployment:** [Docker, K8s, serverless]
- **Logging:** [Where to find logs]

---

## ⚠️ CRITICAL ANTI-PATTERNS

**See `.github/ai-context/troubleshooting/anti_patterns.json` for full list**

**Quick Reference**:
- ❌ [Common mistake] → ✅ [Correct approach]
- ❌ [Another mistake] → ✅ [Correct approach]

---

## 🗂️ KEY FILES & PATTERNS

**Authentication:**
- `src/middleware/auth.js` → [Description]

**Database:**
- `src/models/` → [Description]

**API:**
- `src/routes/` → [Description]

---

## 🔧 QUICK COMMANDS

```bash
# Development
[command] # [description]

# Testing
[command] # [description]

# Deployment
[command] # [description]
```

---

## 📝 UPDATE PROTOCOL

**When to Update:**
- New features → Update relevant flow JSON
- Bug fixes → Add to `troubleshooting/decision_trees.json`
- Discovered anti-patterns → Add to `troubleshooting/anti_patterns.json`
- Schema changes → Update `schemas/database_models.json`

**How to Update:**
```bash
./scripts/update-ai-context.sh "Description of change"
```

---

**Last Updated**: 2025-11-24  
**Maintained By**: [Your Name]
