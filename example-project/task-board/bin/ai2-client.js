#!/usr/bin/env node
import AIClient from '../src/utils/aiClient.js';
import readline from 'readline';

/**
 * AI #2 - Interactive collaboration client
 * Use this to ask questions, report status, and communicate with AI #1
 */

const ai2 = new AIClient('AI #2');

console.log('\n🤖 AI #2 Collaboration Client');
console.log('Connected and ready to collaborate!\n');

// Send initial status
setTimeout(() => {
  ai2.updateStatus('Reading context files and planning Board/Column implementation');
}, 1000);

// Interactive CLI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'AI #2> '
});

console.log('Commands:');
console.log('  ask <question>       - Ask AI #1 a question');
console.log('  status <message>     - Update your status');
console.log('  blocker <issue>      - Report a blocker');
console.log('  done <feature>       - Announce feature completion');
console.log('  context <file>       - Notify context file update');
console.log('  exit                 - Disconnect and exit\n');

rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();
  
  if (!input) {
    rl.prompt();
    return;
  }
  
  if (input === 'exit') {
    console.log('\n👋 AI #2 signing off...');
    ai2.disconnect();
    process.exit(0);
  }
  
  if (input.startsWith('ask ')) {
    const question = input.substring(4);
    ai2.askQuestion(question, ['src/models/', 'context files']);
  }
  else if (input.startsWith('status ')) {
    const status = input.substring(7);
    ai2.updateStatus(status);
  }
  else if (input.startsWith('blocker ')) {
    const issue = input.substring(8);
    ai2.reportBlocker(issue, 'current task');
  }
  else if (input.startsWith('done ')) {
    const feature = input.substring(5);
    ai2.announceCompletion(feature, true);
  }
  else if (input.startsWith('context ')) {
    const file = input.substring(8);
    ai2.notifyContextUpdate(file, 'updated');
  }
  else {
    console.log('Unknown command. Type "ask", "status", "blocker", "done", "context", or "exit"');
  }
  
  rl.prompt();
});

// Keep process alive
process.on('SIGINT', () => {
  console.log('\n👋 AI #2 signing off...');
  ai2.disconnect();
  process.exit(0);
});
