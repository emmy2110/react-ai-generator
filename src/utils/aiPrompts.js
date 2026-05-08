const SYSTEM_PROMPT = `You are an expert React developer specializing in creating modern, 
production-ready React components using hooks and SASS styling.

Your task is to generate complete, functional React components based on user descriptions.

**REQUIREMENTS:**
- Use React hooks (useState, useEffect, useCallback, useReducer, etc.)
- Write modern, clean ES6+ JavaScript
- Include SASS/SCSS for all styling
- Components must be self-contained and render immediately
- Always include PropTypes for type safety
- Code must be syntactically valid and runnable
- Use semantic HTML elements
- Ensure accessibility (ARIA labels, semantic structure)
- Follow React best practices and performance optimization

**OUTPUT FORMAT:**
Return ONLY valid, parseable JSON with this exact structure:
{
  "componentName": "string",
  "description": "string",
  "imports": ["string"],
  "jsx": "string (the complete React component code)",
  "scss": "string (the SASS styles with BEM naming)",
  "dependencies": ["string"],
  "usage": "string (example of how to use this component)"
}

**CONSTRAINTS:**
- No external libraries unless absolutely necessary
- No API calls unless explicitly requested
- No console.logs in production code
- Components must export as default
- All state must be managed with hooks
- SCSS should use nested structure and variables
- Make the component visually complete and ready to use`;

export const buildPrompt = (userDescription) => {
  return `Create a React component based on this description:
"${userDescription}"

**Specifications:**
- Component name should be descriptive (PascalCase)
- Include all necessary React hooks (useState, useEffect, etc.)
- Style with SASS/SCSS using BEM naming convention (e.g., .component__element--modifier)
- Make it visually appealing with modern, contemporary design
- Ensure it's fully functional and interactive
- Include comments for complex logic
- Add PropTypes for all props
- Use Flexbox or CSS Grid for layout
- Include smooth transitions and hover effects where appropriate
- The component should be self-contained and require no external props

Return as JSON matching the required format exactly.`;
};

export const parseAIResponse = (responseText) => {
  try {
    // Extract JSON from the response (sometimes AI wraps it in markdown code blocks)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate required fields
    const required = ['componentName', 'jsx', 'scss'];
    for (const field of required) {
      if (!parsed[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    return parsed;
  } catch (error) {
    console.error('Error parsing AI response:', error);
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
};

export const validateReactCode = (code) => {
  // Basic validation that the code looks like valid React
  const checks = {
    hasExport: /export\s+(default\s+)?function|const\s+\w+\s*=\s*\(\)|export\s+default/.test(code),
    hasReturn: /return\s*\(|return\s*<|return\s+\(/.test(code),
    hasJSX: /<[A-Z]|<[a-z]+/.test(code),
  };
  
  return {
    isValid: Object.values(checks).every(v => v),
    checks
  };
};

export { SYSTEM_PROMPT };
