import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import CodeDisplay from './CodeDisplay';
import CodePreview from './CodePreview';
import Settings from './Settings';
import { generateReactComponent } from '../services/aiService';
import '../styles/components/codeGenerator.scss';

const CodeGenerator = () => {
  const [apiKey, setApiKey] = useState('');
  const [generatedComponent, setGeneratedComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load API key from localStorage on mount
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleApiKeyChange = (newKey) => {
    setApiKey(newKey);
  };

  const handleGenerate = async (description) => {
    if (!apiKey) {
      setError('Please set your OpenAI API key in Settings first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedComponent(null);

    try {
      const result = await generateReactComponent(description, apiKey);
      setGeneratedComponent(result);
    } catch (err) {
      setError(err.message || 'Failed to generate component. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="code-generator">
      <header className="code-generator__header">
        <div className="code-generator__header-content">
          <h1 className="code-generator__title">✨ React AI Generator</h1>
          <p className="code-generator__subtitle">Transform your ideas into React components powered by AI</p>
        </div>
        <Settings onApiKeyChange={handleApiKeyChange} initialApiKey={apiKey} />
      </header>

      <main className="code-generator__main">
        <div className="code-generator__input-section">
          <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>

        {error && (
          <div className="code-generator__error">
            <p className="code-generator__error-title">❌ Error</p>
            <p className="code-generator__error-message">{error}</p>
          </div>
        )}

        {generatedComponent && (
          <div className="code-generator__output">
            <div className="code-generator__output-section">
              <CodePreview 
                jsx={generatedComponent.jsx}
                scss={generatedComponent.scss}
                componentName={generatedComponent.componentName}
              />
            </div>

            <div className="code-generator__code-section">
              <CodeDisplay 
                code={generatedComponent.jsx}
                language="jsx"
                title={`${generatedComponent.componentName}.jsx`}
              />
              <CodeDisplay 
                code={generatedComponent.scss}
                language="scss"
                title={`${generatedComponent.componentName}.scss`}
              />
            </div>

            {generatedComponent.usage && (
              <div className="code-generator__usage">
                <h3 className="code-generator__usage-title">Usage Example</h3>
                <CodeDisplay 
                  code={generatedComponent.usage}
                  language="jsx"
                  title="How to use this component"
                />
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="code-generator__footer">
        <p>Made with ❤️ using React & OpenAI</p>
      </footer>
    </div>
  );
};

export default CodeGenerator;
