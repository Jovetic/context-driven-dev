# Task Board - CDD Testing Project

A simple Kanban board application built to test and demonstrate Context-Driven Development methodology.

## Features (Planned)

- [ ] Create boards
- [ ] Add columns (Todo, In Progress, Done)
- [ ] Create/edit/delete tasks
- [ ] Drag-and-drop tasks between columns
- [ ] Task priorities and labels
- [ ] Simple REST API

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Frontend**: Vanilla JS (keep it simple for CDD testing)

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## CDD Testing

This project uses Context-Driven Development. AI agents should:

1. Read `.github/copilot-instructions.md` first
2. Check `.github/DEPENDENCY_GRAPH.json` for context routing
3. Update context files as features are built
4. Document patterns in `.github/ai-context/`

## Development

Features will be built incrementally to test CDD workflow.

**Next to build:**
- Task model (Mongoose schema)
- Board model
- CRUD API endpoints
- Basic frontend

Each feature should autonomously update relevant context files.
