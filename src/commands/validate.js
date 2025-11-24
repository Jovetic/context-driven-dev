import { readFile } from 'fs/promises';
import { glob } from 'glob';
import chalk from 'chalk';
import ora from 'ora';
import { validateAntiPatterns } from '../validators/anti-patterns.js';
import { validateFlows } from '../validators/flows.js';
import { validateSchemas } from '../validators/schemas.js';
import { validateDependencyGraph } from '../validators/dependency-graph.js';

export async function validateCommand(path, options) {
  const spinner = ora('Scanning for context files...').start();
  
  try {
    // Find all JSON files in ai-context directory
    const pattern = `${path}/**/*.json`;
    const files = await glob(pattern);
    
    spinner.succeed(`Found ${files.length} context files`);
    
    let errors = 0;
    let warnings = 0;
    
    // Validate each file based on its type
    for (const file of files) {
      const fileSpinner = ora(`Validating ${chalk.cyan(file)}`).start();
      
      try {
        // Read and parse JSON
        const content = await readFile(file, 'utf-8');
        const data = JSON.parse(content);
        
        // Determine file type and validate
        let result;
        if (file.includes('anti_patterns.json')) {
          result = validateAntiPatterns(data, file);
        } else if (file.includes('/flows/')) {
          result = validateFlows(data, file);
        } else if (file.includes('/schemas/')) {
          result = validateSchemas(data, file);
        } else if (file.includes('DEPENDENCY_GRAPH.json')) {
          result = validateDependencyGraph(data, file);
        } else {
          result = { valid: true, errors: [], warnings: [] };
        }
        
        if (result.valid) {
          fileSpinner.succeed(chalk.green(`✓ ${file}`));
        } else {
          fileSpinner.fail(chalk.red(`✗ ${file}`));
          errors += result.errors.length;
          warnings += result.warnings.length;
          
          // Print errors
          result.errors.forEach(err => {
            console.log(chalk.red(`  ✗ ${err}`));
          });
          
          // Print warnings
          result.warnings.forEach(warn => {
            console.log(chalk.yellow(`  ⚠ ${warn}`));
          });
        }
      } catch (parseError) {
        fileSpinner.fail(chalk.red(`✗ ${file}`));
        console.log(chalk.red(`  ✗ JSON Parse Error: ${parseError.message}`));
        errors++;
      }
    }
    
    // Summary
    console.log('\n' + chalk.bold('Summary:'));
    console.log(`  Files validated: ${files.length}`);
    console.log(`  Errors: ${errors > 0 ? chalk.red(errors) : chalk.green(errors)}`);
    console.log(`  Warnings: ${warnings > 0 ? chalk.yellow(warnings) : chalk.green(warnings)}`);
    
    if (errors > 0) {
      process.exit(1);
    }
    
    if (options.strict && warnings > 0) {
      console.log(chalk.yellow('\n⚠ Strict mode: Warnings treated as failures'));
      process.exit(1);
    }
    
  } catch (error) {
    spinner.fail('Validation failed');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}
