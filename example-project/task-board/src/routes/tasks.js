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
router.get('/tasks', getTasks);              // GET /api/tasks?boardId=...&status=...
router.get('/tasks/:id', getTask);           // GET /api/tasks/:id
router.post('/tasks', createTask);           // POST /api/tasks
router.put('/tasks/:id', updateTask);        // PUT /api/tasks/:id
router.delete('/tasks/:id', deleteTask);     // DELETE /api/tasks/:id

// Special route for drag-and-drop
router.patch('/tasks/:id/position', updateTaskPosition);  // PATCH /api/tasks/:id/position

export default router;
