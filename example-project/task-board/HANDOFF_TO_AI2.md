# AI #2 Handoff Instructions

## Your Mission
Build the **Board and Column models** using ONLY the context files in `.github/ai-context/`. 

This tests if Context-Driven Development works across AI sessions.

## ⚠️ CRITICAL RULES
1. **Read `.github/DEPENDENCY_GRAPH.json` FIRST** - It routes you to relevant context
2. **Do NOT ask AI #1 for help** - Context files should contain everything you need
3. **Update context files autonomously** - Document as you build
4. **Commit your updates** - Show autonomous protocol works

## What AI #1 Built
- ✅ Task model (src/models/Task.js)
- ✅ Task controller with 6 CRUD operations
- ✅ Task routes (GET, POST, PUT, DELETE, PATCH)
- ✅ All endpoints tested and working

## What You Should Build

### 1. Board Model
**Requirements:**
- Board has name, description, owner
- Board has many columns (relationship)
- Timestamps (createdAt, updatedAt)

**File:** `src/models/Board.js`

### 2. Column Model
**Requirements:**
- Column has name, boardId reference
- Column has position (for ordering)
- Timestamps

**File:** `src/models/Column.js`

### 3. Board Controller
**Operations:**
- createBoard
- getBoards
- getBoard (with columns populated)
- updateBoard
- deleteBoard (should cascade delete columns)

**File:** `src/controllers/boardController.js`

### 4. Column Controller
**Operations:**
- createColumn (for specific board)
- getColumns (for specific board)
- updateColumn
- deleteColumn
- reorderColumns

**File:** `src/controllers/columnController.js`

### 5. Routes
**File:** `src/routes/boards.js`
**File:** `src/routes/columns.js`

Mount in `src/server.js`

## How to Start

1. **Read context files first:**
   ```bash
   cat .github/DEPENDENCY_GRAPH.json
   cat .github/ai-context/schemas/task_model.json
   cat .github/ai-context/flows/task_crud.json
   cat .github/ai-context/troubleshooting/anti_patterns.json
   ```

2. **Look for patterns in existing code:**
   - Task model structure
   - Controller error handling
   - Route organization

3. **Build incrementally:**
   - Board model → Board controller → Board routes → Test
   - Column model → Column controller → Column routes → Test

4. **Update context autonomously:**
   - Create `schemas/board_model.json`
   - Create `schemas/column_model.json`
   - Create `flows/board_crud.json`
   - Update `recent_changes.json` with your session
   - Add any mistakes to `anti_patterns.json`

5. **Test your work:**
   ```bash
   # Server should already be running on port 3000
   curl http://localhost:3000/health
   
   # Test your endpoints
   curl -X POST http://localhost:3000/api/boards -H "Content-Type: application/json" -d '{"name": "My Board"}'
   ```

## Success Criteria

✅ Board CRUD working
✅ Column CRUD working  
✅ Boards can have multiple columns
✅ Deleting board cascades to columns
✅ Context files updated autonomously
✅ Git commits made with autonomous updates

## CDD Validation Points

This tests:
- **Context Router**: Did DEPENDENCY_GRAPH.json help you find relevant info?
- **Anti-patterns**: Did anti_patterns.json prevent mistakes?
- **Autonomous Protocol**: Did you update context without being asked?
- **Cross-session**: Could you build without asking AI #1?

## Environment

**MongoDB:** Already running on `localhost:27099` (taskboard-mongo container)
**Server:** Running on `http://localhost:3000`
**.env:** Already configured

You're good to go! Start by reading the context files. 🚀
