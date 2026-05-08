# React AI Generator

An AI-powered React component generator that transforms natural language descriptions into fully functional React components with SASS styling.

## Features

✨ **AI-Powered Generation** — Describe what you want, get React code  
🎨 **SASS Styling** — Modern, maintainable styles with SCSS  
⚛️ **React Hooks** — Uses modern React hooks patterns  
📦 **Ready to Use** — Generated components are immediately functional  
👀 **Live Preview** — See your generated components in real-time  

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- An OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation

```bash
npm install
```

### Configuration

1. Run the development server:
```bash
npm run dev
```

2. Open http://localhost:3000 in your browser

3. Click the ⚙️ **Settings** button and enter your OpenAI API key

## Usage

1. Enter your API key in the settings
2. Describe the React component you want (e.g., "Create a todo list with add, delete, and complete functionality")
3. Click "Generate Component"
4. View the live preview and generated code
5. Copy the component code and use it in your project

## Example Prompts

- "Create a todo list where I can add, delete, and mark items as complete"
- "Build a beautiful contact form with name, email, and message fields"
- "Make a timer that can start, pause, and reset with time display"
- "Create a dark mode toggle switch with smooth animations"
- "Build a counter with increment, decrement, and reset buttons"
- "Create a weather app component that displays current temperature"
- "Build a shopping cart with add, remove, and quantity update"

## Project Structure

```
src/
├── components/
│   ├── CodeGenerator.jsx          # Main generator component
│   ├── CodePreview.jsx            # Live code preview
│   ├── InputForm.jsx              # User input form
│   ├── CodeDisplay.jsx            # Code display with syntax highlighting
│   └── Settings.jsx               # API key configuration
├── services/
│   └── aiService.js               # OpenAI API integration
├── utils/
│   ├── aiPrompts.js               # Prompt engineering
│   └── codeFormatter.js           # Code formatting utilities
├── styles/
│   ├── main.scss                  # Main stylesheet
│   ├── variables.scss             # SASS variables
│   ├── mixins.scss                # SASS mixins
│   └── components/                # Component styles
├── App.jsx                        # Root component
└── index.jsx                      # Entry point
```

## Technologies

- **React 18** — UI framework
- **Vite** — Build tool
- **SASS/SCSS** — Styling
- **OpenAI API** — Code generation
- **Babel Standalone** — In-browser JSX compilation

## How It Works

### AI Prompt Engineering

The app uses a sophisticated prompt engineering system:

1. **System Prompt** — Instructs the AI to generate production-ready React code with specific constraints
2. **User Prompt** — Structures user input for consistent, high-quality outputs
3. **JSON Validation** — Ensures generated code is valid and parseable
4. **Code Validation** — Checks for React patterns and JSX syntax

### Component Generation

When you describe a component, the AI generates:

- **JSX Code** — Fully functional React component using hooks
- **SCSS Styles** — Modern, maintainable styles with BEM naming convention
- **PropTypes** — Type safety for all props
- **Usage Example** — How to use the generated component

### Live Preview

The component runs in a sandboxed iframe with:
- Modern UI design
- Smooth animations
- Responsive layout
- Full functionality

## Customization

### Styling

Edit `src/styles/variables.scss` to customize:
- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Transitions

### Prompt Engineering

Edit `src/utils/aiPrompts.js` to:
- Modify the system prompt
- Change generation parameters
- Add validation rules

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
