import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/codePreview.scss';

const CodePreview = ({ jsx, scss, componentName }) => {
  const iframeRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jsx || !iframeRef.current) return;

    try {
      // Create HTML content for the iframe
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${componentName}</title>
            <script src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 2rem;
              }
              #root {
                background: white;
                border-radius: 12px;
                padding: 2rem;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-width: 800px;
                margin: 0 auto;
              }
              ${scss || ''}
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              const PropTypes = window.React.PropTypes || { node: () => {} };
              
              ${jsx}
              
              ReactDOM.render(<${componentName} />, document.getElementById('root'));
            </script>
          </body>
        </html>
      `;

      const iframe = iframeRef.current;
      iframe.srcdoc = htmlContent;
      setError(null);
    } catch (err) {
      console.error('Preview error:', err);
      setError(err.message);
    }
  }, [jsx, scss, componentName]);

  return (
    <div className="code-preview">
      <h3 className="code-preview__title">Live Preview</h3>
      {error && (
        <div className="code-preview__error">
          <p className="code-preview__error-title">Preview Error</p>
          <p className="code-preview__error-message">{error}</p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="code-preview__iframe"
        title="Component Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
};

CodePreview.propTypes = {
  jsx: PropTypes.string,
  scss: PropTypes.string,
  componentName: PropTypes.string
};

CodePreview.defaultProps = {
  jsx: '',
  scss: '',
  componentName: 'Component'
};

export default CodePreview;
