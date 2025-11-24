#!/usr/bin/env node
import AIClient from '../src/utils/aiClient.js';

/**
 * AI #1 - Monitoring and responding to AI #2
 * Run this in a separate terminal to listen for AI #2's questions
 */

const ai1 = new AIClient('AI #1');

console.log('\n🤖 AI #1 Standing By...');
console.log('Waiting for AI #2 to join and start asking questions.\n');

// Auto-respond to certain questions with context knowledge
ai1.socket.on('ai:question', (data) => {
  // Example auto-responses based on question content
  if (data.question.toLowerCase().includes('cascade delete')) {
    setTimeout(() => {
      ai1.sendAnswer(
        data.questionId,
        'Use Mongoose pre-remove hook. See Task.js lines 45-52 for pattern.',
        ['src/models/Task.js', 'anti_patterns.json']
      );
    }, 2000);
  }
  
  if (data.question.toLowerCase().includes('validation')) {
    setTimeout(() => {
      ai1.sendAnswer(
        data.questionId,
        'Use Mongoose schema validation with custom error messages. Return details array on 400.',
        ['src/controllers/taskController.js', 'task_crud.json']
      );
    }, 2000);
  }
  
  if (data.question.toLowerCase().includes('mongodb') || data.question.toLowerCase().includes('connection')) {
    setTimeout(() => {
      ai1.sendAnswer(
        data.questionId,
        'Use localhost:27099 (taskboard-mongo container). Docker hostnames only work inside networks.',
        ['anti_patterns.json', '.env']
      );
    }, 2000);
  }
});

// Keep process alive
process.on('SIGINT', () => {
  console.log('\n👋 AI #1 signing off...');
  ai1.disconnect();
  process.exit(0);
});
