import Board from '../models/Board.js';
import Column from '../models/Column.js';
import Task from '../models/Task.js';

/**
 * Get all boards with optional owner filter
 * Query params: owner
 */
export async function getBoards(req, res) {
  try {
    const { owner } = req.query;
    
    const filter = {};
    if (owner) filter.owner = owner;
    
    const boards = await Board.find(filter)
      .sort({ createdAt: -1 })
      .lean();
    
    res.json({
      success: true,
      count: boards.length,
      boards
    });
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch boards'
    });
  }
}

/**
 * Get a single board by ID with populated columns
 */
export async function getBoard(req, res) {
  try {
    const board = await Board.findById(req.params.id);
    
    if (!board) {
      return res.status(404).json({
        success: false,
        error: 'Board not found'
      });
    }
    
    // Manually populate columns for this board
    const columns = await Column.find({ boardId: board._id })
      .sort({ position: 1 })
      .lean();
    
    res.json({
      success: true,
      board: {
        ...board.toObject(),
        columns
      }
    });
  } catch (error) {
    console.error('Error fetching board:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid board ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch board'
    });
  }
}

/**
 * Create a new board
 */
export async function createBoard(req, res) {
  try {
    const board = await Board.create(req.body);
    
    res.status(201).json({
      success: true,
      board
    });
  } catch (error) {
    console.error('Error creating board:', error);
    
    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create board'
    });
  }
}

/**
 * Update a board
 */
export async function updateBoard(req, res) {
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true,          // Return updated document
        runValidators: true // Run schema validators
      }
    );
    
    if (!board) {
      return res.status(404).json({
        success: false,
        error: 'Board not found'
      });
    }
    
    res.json({
      success: true,
      board
    });
  } catch (error) {
    console.error('Error updating board:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid board ID format'
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update board'
    });
  }
}

/**
 * Delete a board (cascade delete columns and tasks)
 */
export async function deleteBoard(req, res) {
  try {
    const board = await Board.findById(req.params.id);
    
    if (!board) {
      return res.status(404).json({
        success: false,
        error: 'Board not found'
      });
    }
    
    // Cascade delete: Remove all columns and tasks for this board
    await Column.deleteMany({ boardId: board._id });
    await Task.deleteMany({ boardId: board._id });
    await board.deleteOne();
    
    res.json({
      success: true,
      message: 'Board and all associated columns and tasks deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting board:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid board ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to delete board'
    });
  }
}
