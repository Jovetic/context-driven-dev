import { mkdir, writeFile, access } from 'fs/promises';
import { join } from 'path';
import chalk from 'chalk';
import ora from 'ora';

export async function initCommand(path, options) {
  const spinner = ora('Initializing Context-Driven Development structure...').start();
  
  try {
    const basePath = path || '.';
    const aiContextPath = join(basePath, '.github', 'ai-context');
    
    // Check if already initialized
    try {
      await access(aiContextPath);
      spinner.warn('CDD structure already exists');
      console.log(chalk.yellow('\n⚠ .github/ai-context already exists'));
      
      if (!options.force) {
        console.log(chalk.cyan('  Use --force to overwrite existing files\n'));
        return;
      }
      console.log(chalk.cyan('  --force flag detected, proceeding...\n'));
    } catch {
      // Directory doesn't exist, continue
    }
    
    // Create directory structure
    await mkdir(join(aiContextPath, 'flows'), { recursive: true });
    await mkdir(join(aiContextPath, 'schemas'), { recursive: true });
    await mkdir(join(aiContextPath, 'troubleshooting'), { recursive: true });
    await mkdir(join(aiContextPath, 'metadata'), { recursive: true });
    
    // Create copilot-instructions.md
    const copilotInstructions = `# [Project Name] AI Coding Agent Instructions

**Last Updated:** ${new Date().toISOString().split('T')[0]}  
**Tech Stack:** [Languages, frameworks, tools]  
**Purpose:** [Brief project description]

## 🚨 SESSION START - REQUIRED READING

1. **ALWAYS FIRST:** \`.github/DEPENDENCY_GRAPH.json\` → Tells you which context file to load
2. **Load targeted context:** \`.github/ai-context/\` → Modular documentation (flows, schemas, troubleshooting)
3. **Reference docs:** \`README.md\` → User documentation

## 🤖 YOUR ROLE: AUTONOMOUS KNOWLEDGE CURATOR

After EVERY session where you:
- Fix a bug → Update \`troubleshooting/anti_patterns.json\`
- Build a feature → Update relevant \`flows/*.json\`
- Make architectural decision → Update this file

Do this **proactively, without being asked**.

## 🏗️ ARCHITECTURE

\`\`\`
[Add your architecture overview here]
\`\`\`

## ⚠️ CRITICAL PATTERNS

**See \`.github/ai-context/troubleshooting/anti_patterns.json\` for details**

- ❌ [Common mistake] → ✅ [Correct approach]

## 🔧 KEY COMMANDS

\`\`\`bash
# Development
[command] # [description]

# Testing
[command] # [description]
\`\`\`

## 🗂️ KEY FILES

- \`[file]\` → [Purpose]

---

**Maintained By:** [Your name] + AI (autonomous context curator)
`;
    
    await writeFile(join(basePath, '.github', 'copilot-instructions.md'), copilotInstructions);
    
    // Create DEPENDENCY_GRAPH.json
    const dependencyGraph = {
      last_updated: new Date().toISOString().split('T')[0],
      version: "1.0.0",
      description: "Routes AI questions to appropriate context files",
      context_router: {
        feature_implementation: {
          patterns: ["how to implement", "build feature", "add functionality"],
          load: "ai-context/flows/feature_template.json",
          description: "Step-by-step implementation guides"
        },
        database_schema: {
          patterns: ["database structure", "model schema", "data relationships"],
          load: "ai-context/schemas/database_models.json",
          description: "Complete database architecture"
        },
        troubleshooting: {
          patterns: ["error", "broken", "not working", "fails"],
          load: "ai-context/troubleshooting/decision_trees.json",
          description: "Diagnostic workflows for common issues"
        },
        anti_patterns: {
          patterns: ["avoid", "don't do", "mistake", "wrong way"],
          load: "ai-context/troubleshooting/anti_patterns.json",
          description: "Known mistakes and correct approaches"
        }
      },
      priority_order: [
        "Always check anti_patterns first to avoid known mistakes",
        "Load relevant flow for implementation guidance",
        "Reference schemas for data structure questions"
      ]
    };
    
    await writeFile(
      join(basePath, '.github', 'DEPENDENCY_GRAPH.json'),
      JSON.stringify(dependencyGraph, null, 2)
    );
    
    // Create anti_patterns.json
    const antiPatterns = {
      _ai_instructions: {
        purpose: "Document known mistakes and correct approaches",
        when_to_use: "Before implementing anything - check here first",
        update_protocol: "Add entry whenever you discover a bug or mistake"
      },
      last_updated: new Date().toISOString().split('T')[0],
      critical_never_do: [
        "Add critical mistakes here as you discover them"
      ],
      anti_patterns: {
        example_pattern: {
          wrong: "Example of incorrect approach",
          correct: "Example of correct approach",
          why_bad: "Explanation of why the wrong approach fails",
          discovered: new Date().toISOString().split('T')[0],
          example: "Code example if applicable"
        }
      }
    };
    
    await writeFile(
      join(aiContextPath, 'troubleshooting', 'anti_patterns.json'),
      JSON.stringify(antiPatterns, null, 2)
    );
    
    // Create feature_template.json
    const featureTemplate = {
      _ai_instructions: {
        purpose: "Template for documenting feature implementation flows",
        when_to_use: "When implementing [feature type]",
        how_to_use: "Copy this template and fill in specifics for your feature"
      },
      last_updated: new Date().toISOString().split('T')[0],
      feature: "[Feature Name]",
      flow: [
        {
          step: 1,
          phase: "Setup",
          action: "Describe what to do",
          files: ["List files to modify"],
          why: "Explain reasoning"
        },
        {
          step: 2,
          phase: "Implementation",
          action: "Describe implementation",
          files: ["List files to create/modify"]
        },
        {
          step: 3,
          phase: "Testing",
          action: "How to verify it works",
          commands: ["test command"]
        }
      ]
    };
    
    await writeFile(
      join(aiContextPath, 'flows', 'feature_template.json'),
      JSON.stringify(featureTemplate, null, 2)
    );
    
    // Create database_models.json
    const databaseModels = {
      _ai_instructions: {
        purpose: "Document database schema and relationships",
        when_to_use: "When working with data models or database queries"
      },
      last_updated: new Date().toISOString().split('T')[0],
      database_type: "[PostgreSQL, MySQL, MongoDB, etc]",
      models: {
        example_model: {
          table: "table_name",
          fields: {
            id: "primary key",
            name: "string",
            created_at: "timestamp"
          },
          relationships: {
            has_many: ["other_model"],
            belongs_to: ["parent_model"]
          }
        }
      }
    };
    
    await writeFile(
      join(aiContextPath, 'schemas', 'database_models.json'),
      JSON.stringify(databaseModels, null, 2)
    );
    
    // Create decision_trees.json
    const decisionTrees = {
      _ai_instructions: {
        purpose: "Troubleshooting decision trees for common issues",
        when_to_use: "When debugging or investigating errors"
      },
      last_updated: new Date().toISOString().split('T')[0],
      troubleshooting: {
        example_error: {
          symptom: "Describe what the user sees",
          possible_causes: [
            {
              cause: "Most common cause",
              check: "How to verify this is the issue",
              fix: "How to resolve it"
            }
          ]
        }
      }
    };
    
    await writeFile(
      join(aiContextPath, 'troubleshooting', 'decision_trees.json'),
      JSON.stringify(decisionTrees, null, 2)
    );
    
    spinner.succeed('CDD structure initialized!');
    
    // Success message
    console.log(chalk.green('\n✓ Created Context-Driven Development structure:\n'));
    console.log(chalk.cyan('  .github/copilot-instructions.md'));
    console.log(chalk.cyan('  .github/DEPENDENCY_GRAPH.json'));
    console.log(chalk.cyan('  .github/ai-context/'));
    console.log(chalk.cyan('    ├── flows/feature_template.json'));
    console.log(chalk.cyan('    ├── schemas/database_models.json'));
    console.log(chalk.cyan('    └── troubleshooting/'));
    console.log(chalk.cyan('        ├── anti_patterns.json'));
    console.log(chalk.cyan('        └── decision_trees.json'));
    
    console.log(chalk.yellow('\n📝 Next steps:\n'));
    console.log('  1. Edit .github/copilot-instructions.md with your project details');
    console.log('  2. Customize DEPENDENCY_GRAPH.json routing rules');
    console.log('  3. Start documenting patterns as you build');
    console.log('  4. Run: cdd validate .github/ai-context\n');
    
  } catch (error) {
    spinner.fail('Initialization failed');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}
