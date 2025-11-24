import { io } from 'socket.io-client';
import chalk from 'chalk';

/**
 * AI Collaboration Client
 * Connect to Socket.IO server for real-time AI-to-AI communication
 */
class AIClient {
  constructor(agentName, serverUrl = 'http://localhost:3000') {
    this.agentName = agentName;
    this.socket = io(serverUrl, {
      auth: { name: agentName }
    });
    
    this.setupListeners();
  }
  
  setupListeners() {
    this.socket.on('connect', () => {
      console.log(chalk.green(`✓ ${this.agentName} connected to collaboration server`));
      this.socket.emit('join', 'ai-collaboration');
    });
    
    this.socket.on('disconnect', () => {
      console.log(chalk.yellow(`✗ ${this.agentName} disconnected`));
    });
    
    // Listen for other AI joining
    this.socket.on('ai:joined', (data) => {
      console.log(chalk.blue(`🤖 ${data.agent} joined the collaboration`));
    });
    
    // Listen for questions
    this.socket.on('ai:question', (data) => {
      console.log(chalk.magenta(`\n❓ Question from ${data.from}:`));
      console.log(chalk.white(`   ${data.question}`));
      if (data.context) {
        console.log(chalk.gray(`   Context: ${data.context.join(', ')}`));
      }
    });
    
    // Listen for answers
    this.socket.on('ai:answer', (data) => {
      console.log(chalk.green(`\n✅ Answer from ${data.from}:`));
      console.log(chalk.white(`   ${data.answer}`));
      if (data.context) {
        console.log(chalk.gray(`   References: ${data.context.join(', ')}`));
      }
    });
    
    // Listen for status updates
    this.socket.on('ai:status', (data) => {
      console.log(chalk.cyan(`📊 ${data.from}: ${data.status}`));
    });
    
    // Listen for blockers
    this.socket.on('ai:blocker', (data) => {
      console.log(chalk.red(`\n🚫 Blocker from ${data.from}:`));
      console.log(chalk.white(`   Issue: ${data.issue}`));
      console.log(chalk.white(`   Blocking: ${data.blocking}`));
    });
    
    // Listen for context updates
    this.socket.on('ai:context-updated', (data) => {
      console.log(chalk.yellow(`📝 ${data.from} updated: ${data.file} (${data.action})`));
    });
    
    // Listen for feature completion
    this.socket.on('ai:feature-complete', (data) => {
      console.log(chalk.green(`\n🎉 ${data.from} completed: ${data.feature}`));
      console.log(chalk.white(`   Tests passing: ${data.tests_passing ? '✓' : '✗'}`));
    });
  }
  
  // Send a question to other AIs
  askQuestion(question, context = []) {
    this.socket.emit('ai:question', {
      id: Date.now().toString(),
      question,
      context,
      urgency: 'medium'
    });
  }
  
  // Send an answer
  sendAnswer(questionId, answer, context = []) {
    this.socket.emit('ai:answer', {
      questionId,
      answer,
      context
    });
  }
  
  // Update status
  updateStatus(status) {
    this.socket.emit('ai:status', { status });
  }
  
  // Report a blocker
  reportBlocker(issue, blocking) {
    this.socket.emit('ai:blocker', { issue, blocking });
  }
  
  // Notify about context file update
  notifyContextUpdate(file, action = 'updated') {
    this.socket.emit('ai:context-updated', { file, action });
  }
  
  // Announce feature completion
  announceCompletion(feature, tests_passing = true) {
    this.socket.emit('ai:feature-complete', { feature, tests_passing });
  }
  
  // Disconnect
  disconnect() {
    this.socket.disconnect();
  }
}

export default AIClient;
