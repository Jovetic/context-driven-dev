/**
 * Validate DEPENDENCY_GRAPH.json structure
 */
export function validateDependencyGraph(data, file) {
  const errors = [];
  const warnings = [];
  
  // Check for routing rules
  if (!data.routing_rules && !data.routes) {
    errors.push('Missing routing rules - DEPENDENCY_GRAPH should map questions to context files');
  }
  
  // If routing rules exist, validate structure
  const routes = data.routing_rules || data.routes || {};
  
  Object.keys(routes).forEach(key => {
    const route = routes[key];
    
    if (!route.file && !route.files) {
      errors.push(`Route "${key}" missing target file(s)`);
    }
    
    if (!route.keywords && !route.description) {
      warnings.push(`Route "${key}" should have keywords or description for matching`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
