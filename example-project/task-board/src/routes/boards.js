import express from 'express';
import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
} from '../controllers/boardController.js';

const router = express.Router();

// GET /api/boards - Get all boards (optionally filter by owner)
router.get('/', getBoards);

// GET /api/boards/:id - Get single board with columns
router.get('/:id', getBoard);

// POST /api/boards - Create new board
router.post('/', createBoard);

// PUT /api/boards/:id - Update board
router.put('/:id', updateBoard);

// DELETE /api/boards/:id - Delete board (cascade)
router.delete('/:id', deleteBoard);

export default router;
