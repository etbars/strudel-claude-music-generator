// server.js - Main Express server for the Strudel + Claude text-to-music generator
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateStrudelCode } from './claude.js';
import { 
  generateStrudelCode as generateEnhancedCode, 
  generateWithPatterns, 
  generateWithSynthesisPresets 
} from './claude_enhanced.js';
import { generateAdvancedStrudelCode } from './generator.js';
import { 
  COMPREHENSIVE_SOUND_LIBRARY, 
  DRUM_MACHINES, 
  VCSL_INSTRUMENTS, 
  MELODIC_SAMPLES, 
  EXPANDED_GENRE_SOUNDS,
  getSoundsForGenre,
  getRandomSoundsForGenre,
  getAllDrumMachines,
  getDrumMachinesByGenre
} from './expanded_sounds.js';
import { ALL_SOUNDS, getSoundsByGenre, isValidSound } from './sounds.js';
import { getPatternsByGenre, COMPLETE_PATTERNS } from './patterns.js';
import { getAllPresets, getPresetByInstrument, PRESET_CATEGORIES } from './synthesis_presets.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Proxy middleware for Strudel REPL
const strudelUrl = process.env.STRUDEL_URL || 'http://localhost:4321';
app.use('/strudel-proxy', createProxyMiddleware({
  target: strudelUrl,
  changeOrigin: true,
  pathRewrite: { '^/strudel-proxy': '' },
  onProxyRes: (proxyRes) => {
    // Add CORS headers
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  },
  logLevel: 'debug'
}));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API endpoint to provide configuration to frontend
app.get('/api/config', (req, res) => {
  try {
    // Use the proxy URL instead of the direct Strudel URL
    const baseUrl = `http://localhost:${PORT}`;
    res.json({
      strudelUrl: `${baseUrl}/strudel-proxy/`,
      directStrudelUrl: process.env.STRUDEL_URL || 'http://localhost:4321/'
    });
  } catch (error) {
    console.error('Error providing config:', error);
    res.status(500).json({ error: 'Failed to provide configuration' });
  }
});

// API endpoint to generate Strudel code from text
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const strudelCode = await generateStrudelCode(prompt);
    res.json({ code: strudelCode });
  } catch (error) {
    console.error('Error generating Strudel code:', error);
    res.status(500).json({ 
      error: 'Failed to generate Strudel code',
      details: error.message 
    });
  }
});

// Enhanced API endpoint for multi-step generation
app.post('/api/generate/advanced', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const result = await generateAdvancedStrudelCode(prompt);
    res.json(result);
  } catch (error) {
    console.error('Error in advanced generation:', error);
    res.status(500).json({ 
      error: 'Failed to generate advanced Strudel code',
      details: error.message 
    });
  }
});

// Pattern-assisted generation endpoint
app.post('/api/generate/patterns', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const strudelCode = await generateWithPatterns(prompt);
    res.json({ code: strudelCode });
  } catch (error) {
    console.error('Error in pattern-assisted generation:', error);
    res.status(500).json({ 
      error: 'Failed to generate pattern-assisted code',
      details: error.message 
    });
  }
});

// Synthesis preset-assisted generation endpoint
app.post('/api/generate/synthesis', async (req, res) => {
  try {
    const { prompt, preset } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const strudelCode = await generateWithSynthesisPresets(prompt, preset);
    res.json({ code: strudelCode });
  } catch (error) {
    console.error('Error in synthesis preset-assisted generation:', error);
    res.status(500).json({ 
      error: 'Failed to generate synthesis preset-assisted code',
      details: error.message 
    });
  }
});

// Get expanded sound library
app.get('/api/sounds/expanded', (req, res) => {
  try {
    const { category, genre } = req.query;
    
    if (genre) {
      const genreSounds = getSoundsForGenre(genre);
      return res.json({
        success: true,
        genre,
        sounds: genreSounds
      });
    }
    
    if (category) {
      const sounds = COMPREHENSIVE_SOUND_LIBRARY.getSoundsByCategory(category);
      return res.json({
        success: true,
        category,
        sounds
      });
    }
    
    // Return full library
    res.json({
      success: true,
      library: {
        drumMachines: DRUM_MACHINES,
        vcslInstruments: VCSL_INSTRUMENTS,
        melodicSamples: MELODIC_SAMPLES,
        genreSounds: EXPANDED_GENRE_SOUNDS
      }
    });
  } catch (error) {
    console.error('Error fetching expanded sounds:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch expanded sound library' 
    });
  }
});

// Get drum machines
app.get('/api/drums/machines', (req, res) => {
  try {
    const { genre } = req.query;
    
    if (genre) {
      const machines = getDrumMachinesByGenre(genre);
      return res.json({
        success: true,
        genre,
        machines
      });
    }
    
    const allMachines = getAllDrumMachines();
    res.json({
      success: true,
      machines: allMachines,
      details: DRUM_MACHINES
    });
  } catch (error) {
    console.error('Error fetching drum machines:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch drum machines' 
    });
  }
});

// Generate random sounds for genre
app.get('/api/sounds/random/:genre', (req, res) => {
  try {
    const { genre } = req.params;
    const { count = 5 } = req.query;
    
    const randomSounds = getRandomSoundsForGenre(genre, parseInt(count));
    
    res.json({
      success: true,
      genre,
      count: randomSounds.length,
      sounds: randomSounds
    });
  } catch (error) {
    console.error('Error generating random sounds:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate random sounds' 
    });
  }
});

// Enhanced generation with expanded sound library
app.post('/api/generate/enhanced', async (req, res) => {
  try {
    const { prompt, useRealSamples = true, genre } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'Prompt is required' 
      });
    }
    
    // Enhance prompt with sound library info
    let enhancedPrompt = prompt;
    
    if (useRealSamples && genre) {
      const genreSounds = getSoundsForGenre(genre);
      if (genreSounds) {
        enhancedPrompt += `\n\nUse these real samples for ${genre}:
- Drums: ${genreSounds.drums.join(', ')}
- Banks: ${genreSounds.banks.join(', ')}
- Melodic: ${genreSounds.melodic.join(', ')}
- Effects: ${genreSounds.effects.join(', ')}

Prefer real samples over synthesis when possible.`;
      }
    }
    
    const result = await generateWithSynthesisPresets(enhancedPrompt);
    
    res.json({
      success: true,
      code: result,
      metadata: {
        useRealSamples,
        genre,
        soundLibrary: 'expanded'
      }
    });
  } catch (error) {
    console.error('Error in enhanced generation:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate enhanced code' 
    });
  }
});

// Sound library endpoint
app.get('/api/sounds', (req, res) => {
  try {
    const { genre, category } = req.query;
    
    if (genre) {
      const genreSounds = getSoundsByGenre(genre);
      res.json({ sounds: genreSounds, genre });
    } else {
      res.json({ 
        sounds: ALL_SOUNDS,
        categories: ['drums', 'melodic', 'gm', 'synth']
      });
    }
  } catch (error) {
    console.error('Error fetching sounds:', error);
    res.status(500).json({ error: 'Failed to fetch sound library' });
  }
});

// Pattern library endpoint
app.get('/api/patterns', (req, res) => {
  try {
    const { genre } = req.query;
    
    if (genre) {
      const genrePatterns = getPatternsByGenre(genre);
      res.json({ patterns: genrePatterns, genre });
    } else {
      res.json({ patterns: COMPLETE_PATTERNS });
    }
  } catch (error) {
    console.error('Error fetching patterns:', error);
    res.status(500).json({ error: 'Failed to fetch pattern library' });
  }
});

// Synthesis preset library endpoint
app.get('/api/presets', (req, res) => {
  try {
    const { instrument } = req.query;
    
    if (instrument) {
      const instrumentPresets = getPresetByInstrument(instrument);
      res.json({ presets: instrumentPresets, instrument });
    } else {
      res.json({ presets: getAllPresets(), categories: PRESET_CATEGORIES });
    }
  } catch (error) {
    console.error('Error fetching presets:', error);
    res.status(500).json({ error: 'Failed to fetch preset library' });
  }
});

// Sound validation endpoint
app.post('/api/validate/sound', (req, res) => {
  try {
    const { sound } = req.body;
    
    if (!sound) {
      return res.status(400).json({ error: 'Sound parameter is required' });
    }
    
    const isValid = isValidSound(sound);
    res.json({ sound, isValid });
  } catch (error) {
    console.error('Error validating sound:', error);
    res.status(500).json({ error: 'Failed to validate sound' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Make sure to:');
  console.log('1. Set up your .env file with CLAUDE_API_KEY');
  console.log('2. Run the Strudel development server separately');
  
  // Debug logging for environment variables
  const apiKeyPrefix = process.env.CLAUDE_API_KEY ? process.env.CLAUDE_API_KEY.substring(0, 10) + '...' : 'undefined';
  console.log(`API Key prefix: ${apiKeyPrefix}`);
  console.log(`Strudel URL: ${process.env.STRUDEL_URL}`);
});
