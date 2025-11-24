/**
 * Validate schema documentation files
 */
export function validateSchemas(data, file) {
  const errors = [];
  const warnings = [];
  
  // Check for AI instructions
  if (!data._ai_instructions) {
    warnings.push('Missing "_ai_instructions" metadata');
  }
  
  // Check for model/schema definitions
  if (!data.models && !data.schemas && !data.schema) {
    warnings.push('No schema definitions found - expected "models", "schemas", or "schema" key');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
