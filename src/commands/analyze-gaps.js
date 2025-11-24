import { readFile, readdir, stat } from 'fs/promises';
import { join } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { glob } from 'glob';

export async function analyzeGapsCommand(path, options) {
  const spinner = ora('Analyzing codebase for documentation gaps...').start();
  
  try {
    // Find source files
    const sourceFiles = await glob(`${path}/{src,lib}/**/*.{js,ts,jsx,tsx}`, {
      ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']
    });
    
    // Check if ai-context exists
    const contextPath = join(path, '.github/ai-context');
    let contextExists = false;
    try {
      await stat(contextPath);
      contextExists = true;
    } catch {
      // Directory doesn't exist
    }
    
    const gaps = [];
    
    // Gap 1: No ai-context directory at all
    if (!contextExists) {
      gaps.push({
        type: 'missing_structure',
        severity: 'high',
        description: 'No .github/ai-context directory found',
        suggestion: 'Initialize CDD structure with: mkdir -p .github/ai-context/{flows,schemas,troubleshooting,metadata}'
      });
      spinner.warn('No ai-context directory found');
      console.log(chalk.yellow('\n⚠ Context-Driven Development not initialized\n'));
      gaps.forEach(gap => {
        console.log(chalk.red(`  ✗ ${gap.description}`));
        console.log(chalk.cyan(`    → ${gap.suggestion}\n`));
      });
      return;
    }
    
    // Gap 2: Missing critical files
    const criticalFiles = [
      'DEPENDENCY_GRAPH.json',
      'troubleshooting/anti_patterns.json'
    ];
    
    for (const file of criticalFiles) {
      const filePath = join(contextPath, file);
      try {
        await stat(filePath);
      } catch {
        gaps.push({
          type: 'missing_file',
          severity: 'high',
          file,
          description: `Missing critical file: ${file}`,
          suggestion: `Create ${file} from template`
        });
      }
    }
    
    // Gap 3: Source files without corresponding context
    const srcDirs = new Set();
    sourceFiles.forEach(file => {
      const parts = file.split('/');
      if (parts.includes('src') || parts.includes('lib')) {
        const srcIdx = parts.findIndex(p => p === 'src' || p === 'lib');
        if (srcIdx < parts.length - 1) {
          srcDirs.add(parts[srcIdx + 1]); // e.g., 'services', 'models', 'controllers'
        }
      }
    });
    
    // Check if major components are documented
    const majorComponents = ['services', 'models', 'controllers', 'routes', 'utils'];
    const undocumented = [];
    
    for (const comp of majorComponents) {
      if (srcDirs.has(comp)) {
        // Check if there's documentation for this component type
        const flowFiles = await glob(`${contextPath}/flows/*${comp}*.json`);
        if (flowFiles.length === 0) {
          undocumented.push(comp);
        }
      }
    }
    
    if (undocumented.length > 0) {
      gaps.push({
        type: 'undocumented_components',
        severity: 'medium',
        components: undocumented,
        description: `Found ${undocumented.length} major component types without flow documentation`,
        suggestion: `Document patterns for: ${undocumented.join(', ')}`
      });
    }
    
    spinner.succeed(`Analysis complete: ${gaps.length} gaps identified`);
    
    if (gaps.length === 0) {
      console.log(chalk.green('\n✓ No major documentation gaps found!'));
      console.log(chalk.gray('  Your Context-Driven Development setup looks good.\n'));
      return;
    }
    
    // Display gaps
    console.log(chalk.yellow(`\n📋 Found ${gaps.length} documentation gaps:\n`));
    
    gaps.forEach((gap, idx) => {
      const severityColor = gap.severity === 'high' ? chalk.red : chalk.yellow;
      console.log(severityColor(`${idx + 1}. [${gap.severity.toUpperCase()}] ${gap.description}`));
      console.log(chalk.cyan(`   → ${gap.suggestion}\n`));
    });
    
    if (options.suggest) {
      console.log(chalk.bold('\n💡 Suggested Actions:\n'));
      console.log('1. Create missing critical files from template/');
      console.log('2. Document major component patterns (one flow per component type)');
      console.log('3. Add anti-patterns as you discover bugs');
      console.log('4. Update DEPENDENCY_GRAPH.json to route questions efficiently\n');
    }
    
  } catch (error) {
    spinner.fail('Analysis failed');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}
