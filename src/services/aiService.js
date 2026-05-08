import { buildPrompt, parseAIResponse, validateReactCode, SYSTEM_PROMPT } from '../utils/aiPrompts.js';

export const generateReactComponent = async (userDescription, apiKey) => {
  if (!apiKey) {
    throw new Error('API key is required. Please set your Hugging Face API key.');
  }

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: `${SYSTEM_PROMPT}\n\n${buildPrompt(userDescription)}`,
        parameters: {
          max_new_tokens: 2500,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status} - ${errorData.error?.[0] || errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Handle both array and object responses from Hugging Face
    let aiResponse = '';
    if (Array.isArray(data)) {
      aiResponse = data[0]?.generated_text || '';
    } else {
      aiResponse = data.generated_text || '';
    }
    
    // Extract just the response part (remove the prompt)
    const promptLength = `${SYSTEM_PROMPT}\n\n${buildPrompt(userDescription)}`.length;
    aiResponse = aiResponse.substring(promptLength).trim();
    
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
