#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { validateCommand } from '../src/commands/validate.js';
import { auditCommand } from '../src/commands/audit.js';
import { analyzeGapsCommand } from '../src/commands/analyze-gaps.js';

const program = new Command();

program
  .name('cdd')
  .description('Context-Driven Development CLI - Validate and manage AI context files')
  .version('0.1.0');

program
  .command('validate')
  .description('Validate JSON syntax and structure of AI context files')
  .argument('[path]', 'Path to ai-context directory', '.github/ai-context')
  .option('--strict', 'Enable strict validation (fail on warnings)')
  .option('--fix', 'Auto-fix common issues (backup created)')
  .action(validateCommand);

program
  .command('audit')
  .description('Check for stale or outdated context entries')
  .argument('[path]', 'Path to ai-context directory', '.github/ai-context')
  .option('--stale-threshold <days>', 'Days before entry considered stale', '90')
  .option('--format <format>', 'Output format (table|json)', 'table')
  .action(auditCommand);

program
  .command('analyze-gaps')
  .description('Identify missing documentation based on codebase analysis')
  .argument('[path]', 'Path to project root', '.')
  .option('--suggest', 'Suggest specific context files to create')
  .action(analyzeGapsCommand);

program.parse();
