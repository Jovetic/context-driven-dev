# Task Board - AI Coding Agent Instructions

**Project**: Kanban Task Board  
**Purpose**: Test and demonstrate Context-Driven Development methodology  
**Tech Stack**: Node.js (ES modules), Express, MongoDB, Mongoose  
**Status**: In development - Features being built incrementally

## Quick Start for AI Agents

1. **Read this file first** - Get project overview
2. **Check DEPENDENCY_GRAPH.json** - Find relevant context files
3. **Build features** - Implement requested functionality
4. **Update context autonomously** - Document patterns without being asked

## Project Architecture

```
src/
├── models/       → Mongoose schemas (Task, Board, Column)
├── routes/       → Express route handlers
├── controllers/  → Business logic
├── services/     → Reusable business operations
├── middleware/   → Auth, validation, error handling
└── server.js     → Express app entry point
```

## Key Patterns

**Module System**: ES modules (`import`/`export`)  
**Database**: MongoDB with Mongoose ODM  
**API Style**: REST with JSON responses  
**Error Handling**: Try/catch in controllers, middleware for global errors

## Current Features

- ✅ Basic Express server
- ✅ Health check endpoint
- ⏳ Task CRUD (next to build)
- ⏳ Board management
- ⏳ Column management
- ⏳ Frontend UI

## Development Workflow

**When building a feature:**
1. Create model in `src/models/`
2. Create routes in `src/routes/`
3. Create controller in `src/controllers/`
4. Wire up in `server.js`
5. **Autonomously update** relevant context files

**Context files to update:**
- `flows/` - Document feature implementation flow
- `schemas/` - Document data models
- `anti_patterns.json` - Add mistakes to avoid

## Testing CDD

This project is specifically designed to test Context-Driven Development:
- AI should read context files before coding
- AI should update context files after implementing features
- Each feature is an opportunity to prove autonomous documentation

## Next to Build

**Priority 1: Task Model & API**
- Mongoose schema for Task
- CRUD endpoints (POST, GET, PUT, DELETE)
- Basic validation

**Priority 2: Board & Column Models**
- Board schema (has many columns)
- Column schema (has many tasks)
- Nested CRUD operations

**Priority 3: Frontend**
- Simple HTML/CSS/JS
- Drag-and-drop (optional)
- API integration

Start with Priority 1 and autonomously document as you go!
