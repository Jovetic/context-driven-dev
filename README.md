# Context-Driven Development (CDD)

> A systematic approach to AI-assisted development using structured context files

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 What is Context-Driven Development?

**Context-Driven Development (CDD)** is a methodology for building software with AI assistance that maintains architectural consistency, accumulates knowledge, and accelerates development velocity over time.

Instead of treating each AI conversation as isolated, CDD creates a **persistent knowledge base** that helps AI assistants understand your codebase instantly, remember past decisions, and avoid repeated mistakes.

## 💡 The Problem

**Traditional AI-Assisted Development**:
```
Session 1: "Build feature A" → AI generates code (fast)
Session 2: "Build feature B" → Re-explain architecture (slower)
Session 3: "Build feature C" → Re-explain + fix inconsistencies (slowest)
```

**Result**: Declining velocity, inconsistent patterns, repeated mistakes

## ✨ The CDD Solution

**Context-Driven Development**:
```
Session 1: AI reads context → Builds feature A → Updates context
Session 2: AI reads updated context → Builds feature B (faster)
Session 3: AI knows A+B patterns → Builds feature C (even faster)
```

**Result**: Increasing velocity, consistent patterns, accumulated knowledge

## 🏗️ Core Architecture

### Modular Context Files

```
.github/
├── copilot-instructions.md          # Primary entry point for AI
├── DEPENDENCY_GRAPH.json            # Router: which context to load when
└── ai-context/
    ├── flows/
    │   ├── provisioning.json        # Step-by-step process flows
    │   ├── credential_lifecycle.json
    │   └── restart_unpause.json
    ├── schemas/
    │   └── database_models.json     # Data structures
    ├── troubleshooting/
    │   ├── decision_trees.json      # Diagnostic workflows
    │   ├── anti_patterns.json       # Known mistakes to avoid
    │   └── verification_commands.json
    └── metadata/
        └── recent_changes.json      # Change history
```

### Key Principles

1. **Modular**: Load only what's needed (fast, efficient)
2. **Routed**: DEPENDENCY_GRAPH.json tells AI which context file to use
3. **Accumulated**: Each session adds to knowledge base
4. **Self-Updating**: Scripts automate context maintenance
5. **Machine-Readable**: JSON format (not just human docs)

## 🚀 Real-World Results

**Case Study: ClubNeXus Platform**
- **Built**: 72,000 lines of production code
- **Timeline**: 3 weeks
- **Architecture**: 6 microservices, multi-tenant SaaS
- **Outcome**: 5 live customers, stable production system
- **Velocity**: Increasing over time (not declining)

## 📚 Quick Start

### 1. Copy Template Structure

```bash
# Clone this repository
git clone https://github.com/Jovetic/context-driven-dev.git

# Copy template to your project
cp -r context-driven-dev/template/.github your-project/
```

### 2. Customize for Your Project

Edit `.github/copilot-instructions.md` with your:
- Project name and description
- Tech stack
- Architecture decisions
- Coding standards

### 3. Add Context Files

Create context files in `.github/ai-context/`:
- Document your workflows in `flows/`
- Define data models in `schemas/`
- Capture common issues in `troubleshooting/`

### 4. Start Building with Self-Improving AI

**First session**:
```
You: "Build authentication system"
AI: [Reads context] → Builds feature → Documents patterns used
```

**Second session**:
```
AI: [Reads updated context from Session 1]
You: "Add password reset"
AI: Already knows auth patterns → Applies consistently → Documents new patterns
```

**Third session**:
```
AI: [Reads accumulated knowledge from Sessions 1+2]
You: "Why won't users authenticate?"
AI: Checks decision_trees.json → Diagnoses in seconds → Fixes → Updates anti-patterns
```

**Your AI assistant will**:
- ✅ Understand your architecture instantly (reads context)
- ✅ Follow your coding standards (documented in context)
- ✅ Avoid known anti-patterns (learns from past fixes)
- ✅ Maintain consistency across sessions (accumulates knowledge)
- ✅ **Get smarter every session** (self-updating context)

## 🎯 Best Practices

### AI Updates Context Automatically

**Critical principle**: The AI maintains its own knowledge base autonomously.

**After fixing a bug**:
```
AI: [Detects fix was applied]
AI: [Updates anti_patterns.json automatically]
AI: [Commits change with description]
You: [Review commit in git log]
```

**After building a feature**:
```
AI: [Recognizes new pattern created]
AI: [Documents in flows/*.json]
AI: [Commits update]
You: [Nothing - or review if you want]
```

**Next session starts**:
```
AI: [Checks recently changed files]
AI: [Reads updated context]
AI: [Already knows new patterns and anti-patterns]
You: "Build next feature"
AI: [Applies accumulated knowledge immediately]
```

**You never say "update the docs"** - AI does it proactively.

### The Self-Improving Loop (Fully Autonomous)

1. **Session starts** → AI checks `git log` for recent changes
2. **AI reads updated context** (copilot-instructions.md + relevant JSON files)
3. **You work together** (build features, fix bugs)
4. **AI proactively documents** (detects patterns, updates context files)
5. **AI commits changes** (descriptive messages, proper attribution)
6. **Session ends** → Knowledge preserved
7. **Next session** → Repeat from step 1 with MORE knowledge

**Critical**: You don't instruct AI to update docs. AI recognizes:
- "We just fixed credential injection bug" → Updates `anti_patterns.json`
- "We implemented new auth flow" → Updates `flows/authentication.json`
- "We changed database schema" → Updates `schemas/database_models.json`

**Result**: AI gets smarter every session WITHOUT manual documentation work

### Version Control Is Critical

All context updates go through git:
- Review AI's context changes like code review
- See what knowledge was added when
- Revert if AI documented something incorrectly
- Track architectural evolution over time

## 📖 Documentation

- **[Implementation Guide](docs/IMPLEMENTATION_GUIDE.md)** - Detailed setup instructions
- **[Context File Reference](docs/CONTEXT_FILE_REFERENCE.md)** - Complete file format specs
- **[Why CDD Works](docs/WHY_CDD.md)** - Theoretical foundation
- **[Case Study: ClubNeXus](docs/CASE_STUDY_CLUBNEXUS.md)** - Real-world example
- **[FAQ](docs/FAQ.md)** - Common questions

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Citation

If you use Context-Driven Development, please cite:

```bibtex
@misc{jovetic2025cdd,
  author = {Christian Jovetic},
  title = {Context-Driven Development: Systematic AI-Assisted Development},
  year = {2025},
  publisher = {GitHub},
  url = {https://github.com/Jovetic/context-driven-dev}
}
```

---

**Created by**: [Christian Jovetic](https://github.com/Jovetic)  
**First Implementation**: ClubNeXus Platform (November 2025)  
**Status**: Production-tested methodology
