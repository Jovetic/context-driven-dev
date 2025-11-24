# Frequently Asked Questions

## General Questions

### Q: What AI assistants work with CDD?
**A:** Any AI coding assistant that can read files in your repository:
- GitHub Copilot (in VS Code, IDEs)
- Claude (via API or chat)
- ChatGPT (with file uploads)
- Cursor IDE
- Codeium

### Q: Do I need all the context files?
**A:** No. Start with:
1. `copilot-instructions.md` (entry point)
2. `DEPENDENCY_GRAPH.json` (router)
3. `anti_patterns.json` (critical mistakes)

Add others as your project grows.

### Q: How big should context files be?
**A:** Keep them focused:
- ✅ Single flow per file (< 500 lines JSON)
- ❌ Everything in one giant file

AI can load faster and more accurately with modular files.

### Q: Can I use this for non-code projects?
**A:** Yes! CDD works for any AI-assisted work:
- Writing (book chapters, blog posts)
- Design (component libraries)
- Research (methodology, findings)

## Technical Questions

### Q: What if my AI assistant doesn't read context automatically?
**A:** Explicitly prompt it:
```
"Before we start, please read .github/copilot-instructions.md 
and .github/DEPENDENCY_GRAPH.json to understand the project structure."
```

### Q: How do I prevent context files from getting stale?
**A:** Two approaches:
1. Use `update-ai-context.sh` script after each major change
2. Set calendar reminder to review monthly

### Q: Should I commit context files to git?
**A:** Absolutely! Context files are documentation. Track them like code:
- Version control shows evolution of knowledge
- Team members see architectural decisions
- AI has consistent view across contributors

### Q: Can I use CDD with multiple AI assistants?
**A:** Yes! Context files are AI-agnostic. Works with any assistant that reads files.

### Q: How does this compare to traditional documentation?
**A:** CDD is complementary:
- **Traditional docs**: Human-focused, narrative, examples
- **CDD context**: Machine-focused, structured, actionable

Both are valuable.

## Methodology Questions

### Q: Does CDD make me dependent on AI?
**A:** No more than using an IDE makes you dependent on syntax highlighting.

CDD documents decisions. Whether AI or humans read those docs is secondary.

### Q: What if I want to onboard a human developer?
**A:** CDD files help humans too! They provide:
- Architectural overview (copilot-instructions.md)
- Common pitfalls (anti_patterns.json)
- Implementation guides (flows/*.json)

Many teams report faster human onboarding with CDD docs.

### Q: How do I measure if CDD is working?
**A:** Track these metrics:
- Time to implement similar features (should decrease)
- Consistency across codebase (fewer pattern variations)
- Bug recurrence (same bugs should not repeat)
- AI re-explanation frequency (should approach zero)

### Q: Can I sell software built with CDD?
**A:** Yes! CDD is MIT licensed. Build whatever you want, commercially or otherwise.

The methodology helps you build faster. What you build is yours.

## Autonomous Context Maintenance

### Q: How do I test if the autonomous protocol is working?
**A:** The autonomous protocol (where AI updates context without prompting) requires proper initialization:

**Method 1: Generate Instructions Button**
1. In VS Code/Cursor, click the ✨ **Generate Instructions** button (sparkle icon)
2. This forces AI to re-read `.github/copilot-instructions.md` fresh
3. Give AI a task (fix bug, implement feature)
4. Watch for autonomous context updates without asking

**Method 2: New Chat Session**
1. End current session completely
2. Start fresh chat
3. First message: AI should reference the autonomous protocol
4. Complete a task
5. AI should detect context-worthy event and update files

**What to Look For:**
```
✅ AI completes task (bug fix, feature)
✅ AI autonomously detects "this is worth documenting"
✅ AI updates relevant context file (anti_patterns.json, flows/*.json)
✅ AI commits with message: "docs(ai-context): [what learned]"
✅ AI announces: "Updated [file] with [learning]"
```

**Common Issue:** If AI doesn't update context automatically, the autonomous protocol may not be active in current session. Use Generate Instructions to reload.

### Q: Does autonomous maintenance work in all AI assistants?
**A:** Depends on the assistant's capabilities:
- ✅ **GitHub Copilot**: Yes, reads copilot-instructions.md on session start
- ✅ **Cursor IDE**: Yes, supports instruction files
- ⚠️ **Claude/ChatGPT**: Semi-autonomous - requires "Generate Instructions" trigger
- ❌ **Basic autocomplete**: No autonomous capabilities

**Key insight**: The protocol works best with AI assistants that can:
1. Read project files proactively
2. Execute git commands
3. Persist across multiple turns in conversation

### Q: How do I verify context updates are correct?
**A:** Use git for review:
```bash
# See what AI changed
git log .github/ai-context/ --oneline

# Review specific update
git show <commit-hash>

# Undo incorrect update
git revert <commit-hash>
```

**Philosophy**: Over-document by default, review via git. Easier to revert bad updates than miss good ones.

### Q: What if AI updates context too aggressively?
**A:** Adjust the autonomous protocol instructions:
```markdown
## Update Triggers (in copilot-instructions.md)
- Critical bugs only (not minor fixes)
- Major features only (not small tweaks)
- Architectural decisions only (not implementation details)
```

Customize the threshold to match your project's needs.
