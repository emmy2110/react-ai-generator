import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/settings.scss';

const Settings = ({ onApiKeyChange, initialApiKey = '' }) => {
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [isVisible, setIsVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isSaved) {
      const timer = setTimeout(() => setIsSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaved]);

  const handleSave = () => {
    onApiKeyChange(apiKey);
    localStorage.setItem('openai_api_key', apiKey);
    setIsSaved(true);
  };

  return (
    <div className="settings">
      <button 
        className="settings__toggle"
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Toggle settings"
      >
        ⚙️ Settings
      </button>

      {isVisible && (
        <div className="settings__panel">
          <div className="settings__header">
            <h2 className="settings__title">Configuration</h2>
            <button 
              className="settings__close"
              onClick={() => setIsVisible(false)}
              aria-label="Close settings"
            >
              ✕
            </button>
          </div>

          <div className="settings__form">
            <div className="settings__group">
              <label htmlFor="api-key" className="settings__label">
                OpenAI API Key
              </label>
              <input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="settings__input"
              />
              <p className="settings__hint">
                Get your API key at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">platform.openai.com</a>
              </p>
            </div>

            <button 
              onClick={handleSave}
              className={`settings__btn ${isSaved ? 'settings__btn--saved' : ''}`}
            >
              {isSaved ? '✓ Saved' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Settings.propTypes = {
  onApiKeyChange: PropTypes.func.isRequired,
  initialApiKey: PropTypes.string
};

export default Settings;
