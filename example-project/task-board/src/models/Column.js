import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Column name is required'],
    minlength: [2, 'Column name must be at least 2 characters'],
    maxlength: [50, 'Column name cannot exceed 50 characters'],
    trim: true
  },
  
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'Board ID is required']
  },
  
  position: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

// Index for efficient queries and sorting
columnSchema.index({ boardId: 1, position: 1 });

// Pre-save hook to manage position
columnSchema.pre('save', async function(next) {
  if (this.isNew && this.position === 0) {
    // Auto-increment position for new columns
    const maxPosition = await this.constructor.findOne({ boardId: this.boardId })
      .sort('-position')
      .select('position');
    
    this.position = maxPosition ? maxPosition.position + 1 : 0;
  }
  next();
});

export default mongoose.model('Column', columnSchema);
