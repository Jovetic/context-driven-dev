/**
 * Validate flow documentation files
 */
export function validateFlows(data, file) {
  const errors = [];
  const warnings = [];
  
  // Check for AI instructions
  if (!data._ai_instructions) {
    warnings.push('Missing "_ai_instructions" metadata - add purpose and when_to_use');
  } else {
    if (!data._ai_instructions.purpose) {
      warnings.push('Missing "_ai_instructions.purpose"');
    }
    if (!data._ai_instructions.when_to_use) {
      warnings.push('Missing "_ai_instructions.when_to_use"');
    }
  }
  
  // Check for flow steps (common pattern)
  if (data.flow && Array.isArray(data.flow)) {
    data.flow.forEach((step, idx) => {
      if (!step.step && !step.phase) {
        warnings.push(`Flow step ${idx + 1} missing "step" or "phase" identifier`);
      }
      
      if (!step.description && !step.action) {
        warnings.push(`Flow step ${idx + 1} missing "description" or "action"`);
      }
    });
  }
  
  // Check for last_updated timestamp
  if (!data.last_updated) {
    warnings.push('Missing "last_updated" timestamp - add to track freshness');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
