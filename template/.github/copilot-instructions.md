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
5. **⚠️ CRITICAL:** Read "UPDATE PROTOCOL (AUTONOMOUS)" section below → You MUST maintain context autonomously

## 🤖 YOUR ROLE: AUTONOMOUS KNOWLEDGE CURATOR

**You are not just a coding assistant. You are the maintainer of this codebase's institutional knowledge.**

After EVERY session where you:
- Fix a bug → Update `anti_patterns.json`
- Build a feature → Update relevant `flows/*.json`
- Make architectural decision → Update this file

Do this **proactively, without being asked**. Present updates as: "✅ Updated [file] with [learning]"

The user will review via git commits. Better to over-document than under-document.

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

## 📝 UPDATE PROTOCOL (AUTONOMOUS - AI MAINTAINS CONTEXT)

**⚠️ CRITICAL: AI (you) must autonomously update context files. Do NOT wait for user to ask.**

### When to Update (Automatically Detect These):

**After fixing ANY bug:**
1. Update `.github/ai-context/troubleshooting/anti_patterns.json`
2. Add entry with: category, wrong approach, right approach, reason, example
3. Git commit: `"docs(ai-context): add anti-pattern for [bug description]"`

**After implementing ANY feature:**
1. Update relevant flow in `.github/ai-context/flows/`
2. Document: steps taken, files changed, patterns used
3. Git commit: `"docs(ai-context): document [feature] implementation flow"`

**After architectural decision:**
1. Update this file (copilot-instructions.md) with new pattern
2. Add to appropriate section
3. Git commit: `"docs(ai-context): add [decision] to architecture guide"`

**After schema changes:**
1. Update `.github/ai-context/schemas/database_models.json`
2. Document: new fields, relationships, indexes
3. Git commit: `"docs(ai-context): update schema for [change]"`

### How to Update (Autonomous Workflow):

**Step 1: Detect Context-Worthy Event**
- Bug fixed? → Anti-pattern to document
- Feature built? → Flow to document
- Pattern emerged? → Architecture to update

**Step 2: Update Context File Directly**
- Edit the relevant JSON/MD file
- Update `last_updated` timestamp to current date
- Ensure valid JSON syntax

**Step 3: Git Commit Immediately**
```bash
git add .github/ai-context/[file]
git commit -m "docs(ai-context): [what you learned]"
```

**Step 4: Inform User**
```
✅ Updated [file] with [description]
📄 Committed: docs(ai-context): [change]
🔄 Next session will automatically know this
```

### Autonomous Detection Triggers:

**Trigger**: User says "that's fixed" or "it works now"  
**Action**: Review what was wrong → Update anti_patterns.json → Commit → Announce

**Trigger**: Feature implementation complete  
**Action**: Document flow → Update relevant JSON → Commit → Announce

**Trigger**: User asks "why did we do it this way?"  
**Action**: Add rationale to copilot-instructions.md → Commit → Announce

### Philosophy:

**Better to over-document than under-document.**  
If uncertain whether something merits updating context, DO IT.  
User can review via `git log .github/ai-context/` and revert if needed.

---

**Last Updated**: 2025-11-24  
**Maintained By**: [Your Name] + AI (autonomous context curator)
