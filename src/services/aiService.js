import { buildPrompt, parseAIResponse, validateReactCode, SYSTEM_PROMPT } from '../utils/aiPrompts.js';

export const generateReactComponent = async (userDescription, apiKey) => {
  if (!apiKey) {
    throw new Error('API key is required. Please set your OpenAI API key.');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: buildPrompt(userDescription)
          }
        ],
        temperature: 0.7,
        max_tokens: 2500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
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
