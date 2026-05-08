import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/inputForm.scss';

const InputForm = ({ onSubmit, isLoading }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
      setDescription('');
    }
  };

  const examplePrompts = [
    'Create a todo list with add, delete, and complete functionality',
    'Build a beautiful contact form with validation',
    'Make a timer that can start, pause, and reset',
    'Create a dark mode toggle switch with animations',
    'Build a counter with increment, decrement, and reset buttons'
  ];

  return (
    <div className="input-form">
      <form onSubmit={handleSubmit} className="input-form__form">
        <div className="input-form__group">
          <label htmlFor="description" className="input-form__label">
            Describe your React component
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Create a todo list where I can add, delete, and mark items as complete..."
            className="input-form__textarea"
            rows="4"
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="input-form__btn"
          disabled={!description.trim() || isLoading}
        >
          {isLoading ? 'Generating...' : '✨ Generate Component'}
        </button>
      </form>

      <div className="input-form__examples">
        <p className="input-form__examples-title">Try these examples:</p>
        <div className="input-form__examples-list">
          {examplePrompts.map((prompt, index) => (
            <button
              key={index}
              className="input-form__example-btn"
              onClick={() => setDescription(prompt)}
              disabled={isLoading}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

InputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

InputForm.defaultProps = {
  isLoading: false
};

export default InputForm;
