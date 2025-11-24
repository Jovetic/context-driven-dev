#!/usr/bin/env node
import AIClient from '../src/utils/aiClient.js';

/**
 * Demo: AI-to-AI collaboration via Socket.IO
 * Shows how two AIs can communicate in real-time
 */

console.log('🎬 Starting AI Collaboration Demo\n');

// Simulate AI #1 (monitoring)
const ai1 = new AIClient('AI #1 (Monitoring)');

// Simulate AI #2 (building)
const ai2 = new AIClient('AI #2 (Builder)');

// Wait for connections
setTimeout(() => {
  console.log('\n--- Demo Scenario: AI #2 builds Board model ---\n');
  
  // AI #2 starts working
  setTimeout(() => {
    ai2.updateStatus('Starting Board model implementation');
  }, 1000);
  
  // AI #2 asks a question
  setTimeout(() => {
    ai2.askQuestion(
      'Should Board deletion cascade delete to columns?',
      ['src/models/Board.js', 'relationships']
    );
  }, 2000);
  
  // AI #1 answers
  setTimeout(() => {
    ai1.sendAnswer(
      'auto-response',
      'Yes! Use Mongoose pre-remove hook. Check Task.js for pattern.',
      ['src/models/Task.js', 'anti_patterns.json']
    );
  }, 4000);
  
  // AI #2 continues
  setTimeout(() => {
    ai2.updateStatus('Implementing cascade delete with pre-remove hook');
  }, 6000);
  
  // AI #2 reports blocker
  setTimeout(() => {
    ai2.reportBlocker(
      'Not sure about validation patterns',
      'Board controller implementation'
    );
  }, 8000);
  
  // AI #1 helps
  setTimeout(() => {
    ai1.sendAnswer(
      'blocker-response',
      'Use Mongoose schema validation. Return { error, details: [...] } on 400.',
      ['src/controllers/taskController.js', 'task_crud.json']
    );
  }, 10000);
  
  // AI #2 updates context
  setTimeout(() => {
    ai2.notifyContextUpdate('schemas/board_model.json', 'created');
  }, 12000);
  
  // AI #2 completes feature
  setTimeout(() => {
    ai2.announceCompletion('Board CRUD API', true);
  }, 14000);
  
  // Clean up
  setTimeout(() => {
    console.log('\n🎬 Demo complete! Both AIs collaborated successfully.\n');
    ai1.disconnect();
    ai2.disconnect();
    process.exit(0);
  }, 16000);
  
}, 2000);
