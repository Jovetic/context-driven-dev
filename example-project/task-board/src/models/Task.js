import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters'],
    trim: true
  },
  
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },
  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  
  assignedTo: {
    type: String,
    trim: true
  },
  
  dueDate: {
    type: Date
  },
  
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'Board ID is required']
  },
  
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
    required: [true, 'Column ID is required']
  },
  
  position: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

// Indexes for efficient queries
taskSchema.index({ boardId: 1, status: 1 });
taskSchema.index({ columnId: 1, position: 1 });

// Virtual for task age in days
taskSchema.virtual('ageInDays').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Pre-save hook to manage position
taskSchema.pre('save', async function(next) {
  if (this.isNew && this.position === 0) {
    // Auto-increment position for new tasks
    const maxPosition = await this.constructor.findOne({ columnId: this.columnId })
      .sort('-position')
      .select('position');
    
    this.position = maxPosition ? maxPosition.position + 1 : 0;
  }
  next();
});

export default mongoose.model('Task', taskSchema);
