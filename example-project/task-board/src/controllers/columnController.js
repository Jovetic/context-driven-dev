import Column from '../models/Column.js';
import Task from '../models/Task.js';

/**
 * Get all columns for a specific board
 * Query params: boardId (required)
 */
export async function getColumns(req, res) {
  try {
    const { boardId } = req.query;
    
    if (!boardId) {
      return res.status(400).json({
        success: false,
        error: 'boardId query parameter is required'
      });
    }
    
    const columns = await Column.find({ boardId })
      .sort({ position: 1 })
      .lean();
    
    res.json({
      success: true,
      count: columns.length,
      columns
    });
  } catch (error) {
    console.error('Error fetching columns:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch columns'
    });
  }
}

/**
 * Get a single column by ID
 */
export async function getColumn(req, res) {
  try {
    const column = await Column.findById(req.params.id);
    
    if (!column) {
      return res.status(404).json({
        success: false,
        error: 'Column not found'
      });
    }
    
    res.json({
      success: true,
      column
    });
  } catch (error) {
    console.error('Error fetching column:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid column ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch column'
    });
  }
}

/**
 * Create a new column
 */
export async function createColumn(req, res) {
  try {
    const column = await Column.create(req.body);
    
    res.status(201).json({
      success: true,
      column
    });
  } catch (error) {
    console.error('Error creating column:', error);
    
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
      error: 'Failed to create column'
    });
  }
}

/**
 * Update a column
 */
export async function updateColumn(req, res) {
  try {
    const column = await Column.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true,          // Return updated document
        runValidators: true // Run schema validators
      }
    );
    
    if (!column) {
      return res.status(404).json({
        success: false,
        error: 'Column not found'
      });
    }
    
    res.json({
      success: true,
      column
    });
  } catch (error) {
    console.error('Error updating column:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid column ID format'
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
      error: 'Failed to update column'
    });
  }
}

/**
 * Delete a column (cascade delete tasks in this column)
 */
export async function deleteColumn(req, res) {
  try {
    const column = await Column.findById(req.params.id);
    
    if (!column) {
      return res.status(404).json({
        success: false,
        error: 'Column not found'
      });
    }
    
    // Cascade delete: Remove all tasks in this column
    await Task.deleteMany({ columnId: column._id });
    await column.deleteOne();
    
    res.json({
      success: true,
      message: 'Column and all associated tasks deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting column:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid column ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to delete column'
    });
  }
}

/**
 * Reorder columns (update positions)
 * Body: { columns: [{ id, position }, ...] }
 */
export async function reorderColumns(req, res) {
  try {
    const { columns } = req.body;
    
    if (!columns || !Array.isArray(columns)) {
      return res.status(400).json({
        success: false,
        error: 'columns array is required in request body'
      });
    }
    
    // Update each column's position
    const updatePromises = columns.map(({ id, position }) =>
      Column.findByIdAndUpdate(id, { position }, { new: true })
    );
    
    const updatedColumns = await Promise.all(updatePromises);
    
    res.json({
      success: true,
      columns: updatedColumns
    });
  } catch (error) {
    console.error('Error reordering columns:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reorder columns'
    });
  }
}
