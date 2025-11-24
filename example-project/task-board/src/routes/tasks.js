import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskPosition
} from '../controllers/taskController.js';

const router = express.Router();

// Task CRUD routes
router.get('/', getTasks);              // GET /api/tasks?boardId=...&status=...
router.get('/:id', getTask);            // GET /api/tasks/:id
router.post('/', createTask);           // POST /api/tasks
router.put('/:id', updateTask);         // PUT /api/tasks/:id
router.delete('/:id', deleteTask);      // DELETE /api/tasks/:id

// Special route for drag-and-drop
router.patch('/:id/position', updateTaskPosition);  // PATCH /api/tasks/:id/position

export default router;
