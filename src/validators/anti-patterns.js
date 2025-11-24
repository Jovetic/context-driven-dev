/**
 * Validate anti_patterns.json structure
 */
export function validateAntiPatterns(data, file) {
  const errors = [];
  const warnings = [];
  
  // Check required top-level structure
  if (!data.anti_patterns) {
    errors.push('Missing "anti_patterns" object');
    return { valid: false, errors, warnings };
  }
  
  if (!data.critical_never_do || !Array.isArray(data.critical_never_do)) {
    warnings.push('Missing or invalid "critical_never_do" array');
  }
  
  // Validate each anti-pattern entry
  const patterns = Object.keys(data.anti_patterns);
  
  if (patterns.length === 0) {
    warnings.push('No anti-patterns defined');
  }
  
  patterns.forEach(key => {
    const pattern = data.anti_patterns[key];
    
    // Required fields
    if (!pattern.wrong) {
      errors.push(`Pattern "${key}" missing "wrong" field`);
    }
    
    if (!pattern.correct) {
      errors.push(`Pattern "${key}" missing "correct" field`);
    }
    
    if (!pattern.why_bad && !pattern.impact) {
      warnings.push(`Pattern "${key}" should have "why_bad" or "impact" explanation`);
    }
    
    // Check for discovered date (good practice)
    if (!pattern.discovered) {
      warnings.push(`Pattern "${key}" missing "discovered" date - add for historical context`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
