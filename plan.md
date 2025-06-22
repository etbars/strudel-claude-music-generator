# Strudel + Claude API: Text-to-Music Generator

## Project Overview
This project aims to create a text-to-music generator by integrating Claude API with Strudel, a web-based environment for live coding algorithmic patterns. Users will be able to input natural language descriptions, which Claude will interpret and convert into Strudel code to generate corresponding music.

## Architecture

```
                  +-------------+
                  |   User UI   |
                  +------+------+
                         |
                         | Text Prompt
                         v
                  +-------------+
                  | Claude API  |
                  +------+------+
                         |
                         | Generated Strudel Code
                         v
                  +-------------+
                  |   Strudel   |
                  +------+------+
                         |
                         | Audio Output
                         v
                  +-------------+
                  |    User     |
                  +-------------+
```

## Implementation Plan

### Phase 1: Setup and Environment Configuration
1. **Clone Strudel Repository**
   ```bash
   git clone https://codeberg.org/uzu/strudel.git
   cd strudel
   pnpm i
   pnpm dev
   ```

2. **Set Up Claude API Integration**
   - Create an Anthropic account and obtain API key
   - Set up secure environment for API key storage
   - Create a basic API wrapper for Claude

3. **Create Project Structure**
   ```
   strudel-claude-music-generator/
   ├── backend/
   │   ├── server.js        # Express server for API handling
   │   ├── claude.js        # Claude API integration
   │   └── strudel.js       # Strudel code generation and execution
   ├── frontend/
   │   ├── index.html       # Main UI
   │   ├── styles.css       # Styling
   │   └── app.js          # Frontend logic
   ├── .env                 # Environment variables (gitignored)
   └── package.json         # Dependencies
   ```

### Phase 2: Claude API Integration

1. **Prompt Engineering**
   - Design effective prompts for Claude to generate Strudel code
   - Create a library of examples for few-shot learning
   - Develop a system that can translate musical concepts to Strudel patterns

2. **Code Generation**
   - Implement validation for generated code
   - Create fallback mechanisms for invalid code
   - Develop a feedback loop to improve code generation

3. **API Middleware**
   - Create an Express server to handle API requests
   - Implement rate limiting and error handling
   - Set up secure communication between frontend and backend

### Phase 3: Strudel Integration

1. **Code Execution**
   - Create a mechanism to safely execute generated Strudel code
   - Implement error handling for code execution
   - Develop a way to preview generated code before execution

2. **Audio Output**
   - Ensure proper audio output configuration
   - Implement controls for volume, tempo, and other parameters
   - Add ability to export generated music

### Phase 4: User Interface

1. **Input Interface**
   - Create a clean, intuitive text input area
   - Implement history of previous prompts
   - Add suggestion system for common musical terms

2. **Output Interface**
   - Display generated Strudel code with syntax highlighting
   - Create visualization for the audio output
   - Implement controls for playback

3. **User Experience**
   - Add loading indicators during API calls
   - Implement error messages for failed generations
   - Create a tutorial system for new users

### Phase 5: Testing and Refinement

1. **Testing**
   - Test with various musical descriptions
   - Gather feedback on code generation quality
   - Identify common failure patterns

2. **Refinement**
   - Improve prompt engineering based on test results
   - Optimize Claude API usage
   - Enhance the UI based on user feedback

### Phase 6: Deployment

1. **Local Deployment**
   - Package the application for easy local installation
   - Create documentation for setup and usage

2. **Optional Web Deployment**
   - Set up a cloud hosting solution
   - Implement user authentication if needed
   - Configure secure API key management

## Technical Considerations

### Claude API Integration
- Use the latest Claude model (Claude 3 Opus or newer)
- Implement streaming responses for faster feedback
- Design prompts that include Strudel documentation and examples

### Strudel Integration
- Understand Strudel's pattern language and capabilities
- Focus on core musical concepts: rhythm, melody, harmony, timbre
- Leverage Strudel's sample libraries and synthesizers

### Security Considerations
- Never expose API keys in client-side code
- Validate and sanitize all user inputs
- Implement proper error handling

## Example Prompts for Claude

### Basic Prompts
- "Create a relaxing ambient piece with piano and soft pads"
- "Generate a techno beat at 140 BPM with heavy bass"
- "Make a jazz-inspired melody with walking bass"

### Advanced Prompts
- "Create a piece that starts with gentle piano, builds with strings, and climaxes with percussion before fading out"
- "Generate a polyrhythmic pattern with 3/4 in one hand and 4/4 in the other"
- "Make a melody that follows the Fibonacci sequence for note durations"

## Resources

- [Strudel Documentation](https://strudel.cc/learn)
- [Claude API Documentation](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## Next Steps

1. Set up the development environment
2. Create a basic Claude API wrapper
3. Implement a simple UI for text input
4. Develop the first version of the prompt engineering system
5. Test with basic musical descriptions
