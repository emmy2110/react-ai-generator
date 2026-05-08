import { buildPrompt, parseAIResponse, validateReactCode, SYSTEM_PROMPT } from '../utils/aiPrompts.js';

export const generateReactComponent = async (userDescription, apiKey) => {
  if (!apiKey) {
    throw new Error('API key is required. Please set your Anthropic Claude API key.');
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2500,
        messages: [
          {
            role: 'user',
            content: `${SYSTEM_PROMPT}\n\n${buildPrompt(userDescription)}`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;
    
    const parsed = parseAIResponse(aiResponse);
    
    // Validate the generated React code
    const validation = validateReactCode(parsed.jsx);
    if (!validation.isValid) {
      console.warn('Generated code validation warnings:', validation.checks);
    }
    
    return parsed;
  } catch (error) {
    console.error('Error generating component:', error);
    throw error;
  }
};
