import { readFile } from 'fs/promises';
import { glob } from 'glob';
import chalk from 'chalk';
import ora from 'ora';

export async function auditCommand(path, options) {
  const spinner = ora('Auditing context files for staleness...').start();
  
  try {
    const pattern = `${path}/**/*.json`;
    const files = await glob(pattern);
    
    const staleThreshold = parseInt(options.staleThreshold);
    const now = new Date();
    const thresholdDate = new Date(now.getTime() - staleThreshold * 24 * 60 * 60 * 1000);
    
    const staleEntries = [];
    
    for (const file of files) {
      const content = await readFile(file, 'utf-8');
      const data = JSON.parse(content);
      
      // Check last_updated timestamp
      if (data.last_updated) {
        const lastUpdated = new Date(data.last_updated);
        if (lastUpdated < thresholdDate) {
          staleEntries.push({
            file,
            lastUpdated: data.last_updated,
            daysOld: Math.floor((now - lastUpdated) / (24 * 60 * 60 * 1000))
          });
        }
      }
      
      // Check individual entries with dates (like recent_changes)
      if (data.recent_changes && Array.isArray(data.recent_changes)) {
        data.recent_changes.forEach((change, idx) => {
          if (change.date) {
            const changeDate = new Date(change.date);
            if (changeDate < thresholdDate) {
              staleEntries.push({
                file: `${file} (entry ${idx + 1})`,
                lastUpdated: change.date,
                daysOld: Math.floor((now - changeDate) / (24 * 60 * 60 * 1000)),
                title: change.title || 'Untitled'
              });
            }
          }
        });
      }
    }
    
    spinner.succeed(`Audit complete: ${staleEntries.length} stale entries found`);
    
    if (staleEntries.length === 0) {
      console.log(chalk.green('\n✓ All context files are up-to-date!'));
      return;
    }
    
    // Display results
    console.log(chalk.yellow(`\n⚠ Found ${staleEntries.length} stale entries (>${staleThreshold} days old):\n`));
    
    staleEntries.forEach(entry => {
      console.log(chalk.cyan(`  ${entry.file}`));
      console.log(`    Last updated: ${entry.lastUpdated} (${entry.daysOld} days ago)`);
      if (entry.title) {
        console.log(`    Title: ${entry.title}`);
      }
      console.log('');
    });
    
    console.log(chalk.yellow('💡 Tip: Review these entries and update or archive as needed.'));
    
  } catch (error) {
    spinner.fail('Audit failed');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}
