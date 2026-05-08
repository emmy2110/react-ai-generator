import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard, downloadAsFile } from '../utils/codeFormatter.js';
import '../styles/components/codeDisplay.scss';

const CodeDisplay = ({ code, language = 'jsx', title = 'Code' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const ext = language === 'scss' ? 'scss' : 'jsx';
    downloadAsFile(code, `component.${ext}`);
  };

  return (
    <div className="code-display">
      <div className="code-display__header">
        <h3 className="code-display__title">{title}</h3>
        <div className="code-display__actions">
          <button 
            className={`code-display__btn ${copied ? 'code-display__btn--copied' : ''}`}
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
          <button 
            className="code-display__btn"
            onClick={handleDownload}
            title="Download file"
          >
            💾 Download
          </button>
        </div>
      </div>
      <pre className="code-display__pre">
        <code className={`code-display__code language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

CodeDisplay.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  title: PropTypes.string
};

export default CodeDisplay;
