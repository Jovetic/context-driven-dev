import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import taskRoutes from './routes/tasks.js';
import boardRoutes from './routes/boards.js';
import columnRoutes from './routes/columns.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    socketio: 'enabled'
  });
});

// API routes
app.use('/api/tasks', taskRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/columns', columnRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Socket.IO - AI Collaboration System
io.on('connection', (socket) => {
  console.log('🤖 AI agent connected:', socket.id);
  
  // AI joins a room
  socket.on('join', (room) => {
    socket.join(room);
    const agentName = socket.handshake.auth?.name || socket.id;
    console.log(`🤖 ${agentName} joined room: ${room}`);
    
    // Notify others in room
    socket.to(room).emit('ai:joined', {
      agent: agentName,
      socketId: socket.id,
      timestamp: new Date().toISOString()
    });
  });
  
  // Forward all ai:* events to room members
  socket.onAny((event, data) => {
    if (event.startsWith('ai:')) {
      const agentName = socket.handshake.auth?.name || socket.id;
      const enrichedData = {
        ...data,
        from: agentName,
        socketId: socket.id,
        timestamp: new Date().toISOString()
      };
      
      console.log(`📡 [${event}] from ${agentName}:`, data.message || data.question || data.status);
      
      // Broadcast to room (not back to sender)
      socket.to('ai-collaboration').emit(event, enrichedData);
    }
  });
  
  socket.on('disconnect', () => {
    console.log('🤖 AI agent disconnected:', socket.id);
  });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB');
    httpServer.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Socket.IO enabled for AI collaboration`);
      console.log(`✓ Health check: http://localhost:${PORT}/health`);
      console.log(`✓ API endpoints:`);
      console.log(`  - http://localhost:${PORT}/api/tasks`);
      console.log(`  - http://localhost:${PORT}/api/boards`);
      console.log(`  - http://localhost:${PORT}/api/columns`);
    });
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
  });

export { io };
