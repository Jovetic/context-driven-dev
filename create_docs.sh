#!/bin/bash

# Create CONTRIBUTING.md
cat > CONTRIBUTING.md << 'EOF'
# Contributing to Context-Driven Development

Thank you for your interest in contributing to CDD!

## 🎯 Ways to Contribute

### 1. Share Your Implementation
If you've used CDD in your project, we'd love to hear about it:
- Open an issue with "Case Study" label
- Share metrics (velocity improvements, LOC, timeline)
- What worked well, what could be improved

### 2. Improve Templates
- Better context file structures
- Additional example flows
- Domain-specific templates (web apps, APIs, ML projects)

### 3. Build Tooling
- VS Code extension for context management
- CLI tools for context validation
- Automation scripts

### 4. Documentation
- Fix typos, improve clarity
- Add examples
- Translate to other languages

## 📝 Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test with a real project if possible
5. Commit (`git commit -m 'Add amazing feature'`)
6. Push (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🤝 Code of Conduct

- Be respectful and constructive
- Focus on improving the methodology
- Share knowledge openly
- Help others learn

## 💬 Questions?

Open an issue with "Question" label or reach out to [@Jovetic](https://github.com/Jovetic)
EOF

# Create FAQ.md
cat > docs/FAQ.md << 'EOF'
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
EOF

echo "✅ Documentation files created"
