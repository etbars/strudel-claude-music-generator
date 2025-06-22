# Strudel + Claude: AI-Powered Music Composition Tool

 **Generate sophisticated Strudel music code using natural language with Claude AI**

This project creates professional-quality musical compositions by combining the power of Anthropic's Claude AI with Strudel's advanced live coding environment. Simply describe the music you want, and the system generates complex, playable Strudel code with advanced patterns, modulation, and effects.

## Features

- **Advanced Music Generation**: Creates sophisticated compositions with complex patterns, polyrhythms, and harmonic progressions
- **Professional Effects**: Automatic application of reverb, delay, filters, and spatial audio
- **Dynamic Modulation**: Generates evolving textures with sine waves, perlin noise, and complex modulation
- **Multi-Layered Arrangements**: Combines drums, bass, leads, and atmospheric elements
- **Genre Intelligence**: Understands different musical styles (house, ambient, jazz, cyberpunk, etc.)
- **Real-Time Playback**: Integrated Strudel REPL for immediate audio feedback
- **Copy-Paste Ready**: Generates clean, error-free code that works immediately

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Anthropic Claude API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/strudel-claude-music-generator.git
   cd strudel-claude-music-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your CLAUDE_API_KEY
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## Example Generations

### Cyberpunk Track
**Prompt**: "epic cyberpunk track with complex modulation"

```javascript
// Epic cyberpunk track with modulation
setcpm(140/4)

stack(
  s("bd [~ bd] sd ~").gain(0.9),
  s("[hh hh] hh [hh hh] hh").gain(0.7).pan(sine(1/4).range(0.2, 0.8)),
  note("c2 [~ c2] g2 [~ c2]").sound("sawtooth").lpf(sine(1/8).range(300, 2000)).gain(0.6),
  note("e4 [g4 e4] d4 [f4 d4]").sound("square").gain(0.4).room(0.6).delay(0.3),
  note("c5 g5 e5 d5").sound("sine").gain(0.3).pan(sine(1/3).range(0.3, 0.7))
)
```

### Ambient Soundscape
**Prompt**: "atmospheric ambient soundscape with evolving textures"

```javascript
// Atmospheric ambient soundscape
setcpm(60/4)
stack(
  note("c2 [~ c2] e2 [~ g2]").s("space").gain(0.6).room(0.8),
  note("g4 a4 [~ c5] e5").s("piano").gain(0.4).delay(0.5),
  s("[~ hh]*4").gain(0.3).room(0.6),
  note("c3 ~ e3 ~ g3 ~ a3 ~").sound("sine").gain(0.5).lpf(500)
)
```

## Project Structure

```
strudel-claude-music-generator/
├── backend/
│   ├── server.js           # Express server with API endpoints
│   ├── claude.js           # Enhanced Claude integration with comprehensive docs
│   ├── claude_enhanced.js  # Advanced multi-step generation pipeline
│   ├── generator.js        # Sophisticated composition logic
│   ├── sounds.js          # Curated sound library with genre mapping
│   └── patterns.js        # Verified pattern templates
├── frontend/
│   ├── index.html         # Modern UI with Strudel REPL integration
│   ├── styles.css         # Clean, responsive styling
│   └── app.js            # Frontend logic with real-time feedback
├── .env.example          # Environment configuration template
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## API Endpoints

- `POST /api/generate` - Enhanced code generation with comprehensive documentation
- `POST /api/generate/advanced` - Multi-step generation pipeline
- `POST /api/generate/patterns` - Pattern-assisted generation
- `GET /api/sounds` - Available sound library with genre filtering
- `GET /api/patterns` - Pattern templates for different styles
- `POST /api/validate/sound` - Sound compatibility validation

## Advanced Features

### Comprehensive Strudel Documentation
The system includes extensive documentation covering:
- **Mini-notation patterns**: Subdivisions, rests, multiplication, angle brackets
- **Sound sources**: Drums, melodic samples, oscillators, GM sounds
- **Effects processing**: Reverb, delay, filters, ADSR, distortion
- **Pattern transformations**: Speed, reverse, degradation, jux
- **Modulation**: Sine waves, perlin noise, random values
- **Composition techniques**: Layering, sequencing, dynamics, harmony

### Musical Intelligence
- **Genre awareness**: Understands musical styles and applies appropriate sounds/patterns
- **Harmonic coherence**: Maintains scale consistency and chord progressions
- **Rhythmic sophistication**: Generates polyrhythms and complex timing
- **Dynamic arrangement**: Creates evolving compositions with multiple layers
- **Professional effects**: Applies spatial audio, modulation, and processing

## Configuration

### Environment Variables
```bash
CLAUDE_API_KEY=your_anthropic_api_key_here
PORT=3000
STRUDEL_URL=http://localhost:3000
```

### Sound Library
The system includes a curated library of confirmed working sounds:
- **Synthesis**: triangle, sawtooth, square, sine
- **Drums**: bd, sd, hh, oh, cp, rim + bank support
- **Melodic**: piano, epiano, space, wind, metal, jazz
- **GM Sounds**: gm_acoustic_bass, gm_synth_bass_1/2, gm_lead_1/2

## Usage Tips

1. **Be specific**: "Dark techno with rolling bassline" works better than "make music"
2. **Mention genre**: The system understands house, ambient, jazz, cyberpunk, etc.
3. **Request complexity**: Ask for "polyrhythms", "modulation", or "multiple layers"
4. **Copy and test**: Generated code works immediately in any Strudel environment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Strudel](https://strudel.tidalcycles.org/) - The amazing live coding environment
- [Anthropic Claude](https://www.anthropic.com/) - Powerful AI for music generation
- The live coding and algorithmic music communities

---

**Ready to create music with AI? Start generating sophisticated compositions now!** 
