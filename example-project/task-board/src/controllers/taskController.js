import Task from '../models/Task.js';

/**
 * Get all tasks with optional filters
 * Query params: boardId, columnId, status, priority
 */
export async function getTasks(req, res) {
  try {
    const { boardId, columnId, status, priority } = req.query;
    
    const filter = {};
    if (boardId) filter.boardId = boardId;
    if (columnId) filter.columnId = columnId;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    const tasks = await Task.find(filter)
      .sort({ columnId: 1, position: 1 })
      .lean();
    
    res.json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tasks'
    });
  }
}

/**
 * Get a single task by ID
 */
export async function getTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      task
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid task ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch task'
    });
  }
}

/**
 * Create a new task
 */
export async function createTask(req, res) {
  try {
    const task = await Task.create(req.body);
    
    res.status(201).json({
      success: true,
      task
    });
  } catch (error) {
    console.error('Error creating task:', error);
    
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
      error: 'Failed to create task'
    });
  }
}

/**
 * Update a task
 */
export async function updateTask(req, res) {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true,          // Return updated document
        runValidators: true // Run schema validators
      }
    );
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      task
    });
  } catch (error) {
    console.error('Error updating task:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid task ID format'
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
      error: 'Failed to update task'
    });
  }
}

/**
 * Delete a task
 */
export async function deleteTask(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid task ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to delete task'
    });
  }
}

/**
 * Update task position (for drag-and-drop)
 */
export async function updateTaskPosition(req, res) {
  try {
    const { columnId, position } = req.body;
    
    if (!columnId || position === undefined) {
      return res.status(400).json({
        success: false,
        error: 'columnId and position are required'
      });
    }
    
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { columnId, position },
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      task
    });
  } catch (error) {
    console.error('Error updating task position:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update task position'
    });
  }
}
