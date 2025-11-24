import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Board name is required'],
    minlength: [3, 'Board name must be at least 3 characters'],
    maxlength: [100, 'Board name cannot exceed 100 characters'],
    trim: true
  },
  
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  
  owner: {
    type: String,
    required: [true, 'Board owner is required'],
    trim: true
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

// Virtual for columns relationship (will be populated manually)
boardSchema.virtual('columns', {
  ref: 'Column',
  localField: '_id',
  foreignField: 'boardId'
});

// Ensure virtuals are included when converting to JSON
boardSchema.set('toJSON', { virtuals: true });
boardSchema.set('toObject', { virtuals: true });

// Index for efficient queries by owner
boardSchema.index({ owner: 1 });

export default mongoose.model('Board', boardSchema);
