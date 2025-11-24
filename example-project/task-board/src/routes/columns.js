import express from 'express';
import {
  getColumns,
  getColumn,
  createColumn,
  updateColumn,
  deleteColumn,
  reorderColumns
} from '../controllers/columnController.js';

const router = express.Router();

// GET /api/columns?boardId=xxx - Get all columns for a board
router.get('/', getColumns);

// GET /api/columns/:id - Get single column
router.get('/:id', getColumn);

// POST /api/columns - Create new column
router.post('/', createColumn);

// PUT /api/columns/:id - Update column
router.put('/:id', updateColumn);

// DELETE /api/columns/:id - Delete column (cascade)
router.delete('/:id', deleteColumn);

// PATCH /api/columns/reorder - Reorder columns
router.patch('/reorder', reorderColumns);

export default router;
