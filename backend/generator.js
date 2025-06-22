// generator.js - Multi-step music generation system
import Anthropic from '@anthropic-ai/sdk';
import { getSoundsByGenre, isValidSound, ALL_SOUNDS } from './sounds.js';
import { getPatternsByGenre, COMPLETE_PATTERNS, RHYTHM_PATTERNS, MELODIC_PATTERNS } from './patterns.js';

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// Enhanced system prompts for each generation step
const STRUCTURE_PROMPT = `You are a music structure expert. Analyze the user's request and determine:

1. **Genre**: What style of music (house, techno, ambient, jazz, classical, etc.)
2. **Tempo**: BPM or relative speed (slow, medium, fast)
3. **Key**: Musical key (C major, A minor, etc.)
4. **Form**: Song structure (intro, verse, chorus, bridge, outro, or continuous)
5. **Complexity**: Simple, intermediate, or advanced
6. **Mood**: Energetic, relaxed, dark, bright, etc.

Respond in JSON format:
{
  "genre": "house",
  "tempo": "medium",
  "key": "C major",
  "form": "continuous",
  "complexity": "intermediate",
  "mood": "energetic",
  "sections": ["intro", "main", "breakdown", "outro"],
  "duration": "2-3 minutes"
}`;

const INSTRUMENTATION_PROMPT = `You are an instrumentation expert. Based on the musical structure, select appropriate instruments and sounds.

Available sound categories:
- Drums: bd, sd, hh, oh, cp, kick, snare, hat, crash, ride, tom, perc
- Bass: gm_synth_bass_1, gm_synth_bass_2, gm_acoustic_bass, gm_electric_bass_finger
- Piano: gm_acoustic_grand_piano, gm_electric_piano_1, piano
- Strings: gm_string_ensemble_1, gm_violin, gm_cello
- Brass: gm_trumpet, gm_trombone, gm_french_horn
- Synths: gm_lead_1_square, gm_lead_2_sawtooth, gm_pad_1_new_age, gm_pad_2_warm
- Effects: Various reverb, delay, filter settings

Respond in JSON format:
{
  "drums": ["bd", "sd", "hh"],
  "bass": ["gm_synth_bass_1"],
  "melody": ["gm_lead_2_sawtooth"],
  "harmony": ["gm_pad_2_warm"],
  "percussion": ["perc"],
  "effects": ["room", "delay", "lpf"]
}`;

const PATTERN_PROMPT = `You are a pattern generation expert for Strudel. Create sophisticated musical patterns using the selected instruments.

Key Strudel concepts:
- Basic patterns: s("bd sd"), note("c3 e3 g3")
- Stacking: stack(pattern1, pattern2, pattern3)
- Timing: fast(2), slow(4), "*2", "~" for rests
- Effects: .room(0.5), .delay(0.25), .gain(0.8), .lpf(1000)
- Modulation: sine.range(0.5, 1.0).slow(4)
- Advanced: .swing(2), .jux(rev), .every(4, fast(2))

Create patterns that are:
1. Musically interesting and sophisticated
2. Use only the provided instruments
3. Include proper effects and dynamics
4. Match the genre and mood
5. Are syntactically correct Strudel code

Generate complete, runnable Strudel code with comments.`;

const INTEGRATION_PROMPT = `You are a final integration expert. Take the generated patterns and create a cohesive, polished piece.

Focus on:
1. **Balance**: Proper gain levels and mixing
2. **Dynamics**: Variation in intensity and texture
3. **Effects**: Appropriate reverb, delay, filtering
4. **Structure**: Clear musical form and development
5. **Polish**: Professional sound quality

Create the final Strudel code that sounds great and is ready to play.`;

/**
 * Step 1: Analyze musical structure from user prompt
 */
async function generateStructure(prompt) {
  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 500,
      system: STRUCTURE_PROMPT,
      messages: [
        { role: "user", content: `Analyze this music request: "${prompt}"` }
      ],
    });

    const content = response.content[0].text;
    
    // Try to parse JSON response
    try {
      return JSON.parse(content);
    } catch (e) {
      // Fallback if JSON parsing fails
      return {
        genre: extractGenre(prompt),
        tempo: "medium",
        key: "C major",
        form: "continuous",
        complexity: "intermediate",
        mood: "neutral"
      };
    }
  } catch (error) {
    console.error('Error in structure generation:', error);
    throw error;
  }
}

/**
 * Step 2: Select instrumentation based on structure
 */
async function generateInstrumentation(structure) {
  try {
    // Get genre-specific sounds as suggestions
    const genreSounds = getSoundsByGenre(structure.genre);
    
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 400,
      system: INSTRUMENTATION_PROMPT,
      messages: [
        { 
          role: "user", 
          content: `Select instruments for: ${JSON.stringify(structure)}
          
          Genre-specific suggestions: ${JSON.stringify(genreSounds, null, 2)}` 
        }
      ],
    });

    const content = response.content[0].text;
    
    try {
      const instrumentation = JSON.parse(content);
      
      // Validate all sounds exist
      const validatedInstrumentation = {};
      Object.entries(instrumentation).forEach(([category, sounds]) => {
        validatedInstrumentation[category] = sounds.filter(sound => isValidSound(sound));
      });
      
      return validatedInstrumentation;
    } catch (e) {
      // Fallback instrumentation
      return getDefaultInstrumentation(structure.genre);
    }
  } catch (error) {
    console.error('Error in instrumentation generation:', error);
    return getDefaultInstrumentation(structure.genre);
  }
}

/**
 * Step 3: Generate musical patterns
 */
async function generatePatterns(structure, instrumentation) {
  try {
    // Check if we have a pre-built pattern for this genre
    const existingPatterns = getPatternsByGenre(structure.genre);
    
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1200,
      system: PATTERN_PROMPT,
      messages: [
        { 
          role: "user", 
          content: `Create Strudel patterns for:
          
          Structure: ${JSON.stringify(structure)}
          Instrumentation: ${JSON.stringify(instrumentation)}
          
          Existing pattern examples: ${JSON.stringify(existingPatterns, null, 2)}
          
          Generate sophisticated, interesting patterns that use the selected instruments.` 
        }
      ],
    });

    const content = response.content[0].text;
    
    // Extract code from response
    const codeBlockRegex = /```(?:javascript|js)?\s*([\s\S]*?)```/;
    const match = content.match(codeBlockRegex);
    
    if (match && match[1]) {
      return match[1].trim();
    } else {
      // Fallback to existing pattern if available
      const fallbackPattern = Object.values(existingPatterns)[0];
      return fallbackPattern ? fallbackPattern.pattern : generateFallbackPattern(structure, instrumentation);
    }
  } catch (error) {
    console.error('Error in pattern generation:', error);
    return generateFallbackPattern(structure, instrumentation);
  }
}

/**
 * Step 4: Final integration and polish
 */
async function integrateAndPolish(structure, instrumentation, patterns) {
  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      system: INTEGRATION_PROMPT,
      messages: [
        { 
          role: "user", 
          content: `Polish and integrate this music:
          
          Structure: ${JSON.stringify(structure)}
          Instrumentation: ${JSON.stringify(instrumentation)}
          Generated Patterns: ${patterns}
          
          Create the final, polished Strudel code.` 
        }
      ],
    });

    const content = response.content[0].text;
    
    // Extract final code
    const codeBlockRegex = /```(?:javascript|js)?\s*([\s\S]*?)```/;
    const match = content.match(codeBlockRegex);
    
    if (match && match[1]) {
      return match[1].trim();
    } else {
      // Return the patterns as-is if integration fails
      return patterns;
    }
  } catch (error) {
    console.error('Error in integration:', error);
    return patterns;
  }
}

/**
 * Main multi-step generation function
 */
export async function generateAdvancedStrudelCode(prompt) {
  try {
    console.log('🎵 Starting multi-step generation...');
    
    // Step 1: Analyze structure
    console.log('📊 Step 1: Analyzing musical structure...');
    const structure = await generateStructure(prompt);
    console.log('Structure:', structure);
    
    // Step 2: Select instrumentation
    console.log('🎼 Step 2: Selecting instrumentation...');
    const instrumentation = await generateInstrumentation(structure);
    console.log('Instrumentation:', instrumentation);
    
    // Step 3: Generate patterns
    console.log('🎹 Step 3: Generating musical patterns...');
    const patterns = await generatePatterns(structure, instrumentation);
    console.log('Patterns generated');
    
    // Step 4: Final integration
    console.log('✨ Step 4: Final integration and polish...');
    const finalCode = await integrateAndPolish(structure, instrumentation, patterns);
    
    console.log('🎉 Multi-step generation complete!');
    
    return {
      code: finalCode,
      metadata: {
        structure,
        instrumentation,
        generationSteps: ['structure', 'instrumentation', 'patterns', 'integration']
      }
    };
    
  } catch (error) {
    console.error('Error in advanced generation:', error);
    
    // Fallback to simple generation
    console.log('🔄 Falling back to simple generation...');
    return {
      code: generateFallbackPattern({ genre: extractGenre(prompt) }, {}),
      metadata: {
        fallback: true,
        error: error.message
      }
    };
  }
}

// Utility functions
function extractGenre(prompt) {
  const genres = ['house', 'techno', 'ambient', 'jazz', 'classical', 'rock', 'pop', 'funk'];
  const lowerPrompt = prompt.toLowerCase();
  
  for (const genre of genres) {
    if (lowerPrompt.includes(genre)) {
      return genre;
    }
  }
  
  return 'house'; // Default genre
}

function getDefaultInstrumentation(genre) {
  const defaults = {
    house: {
      drums: ['bd', 'sd', 'hh'],
      bass: ['gm_synth_bass_1'],
      melody: ['gm_lead_2_sawtooth'],
      harmony: ['gm_pad_2_warm']
    },
    techno: {
      drums: ['bd', 'sd', 'hh'],
      bass: ['gm_synth_bass_1'],
      melody: ['gm_lead_2_sawtooth'],
      effects: ['distort', 'lpf']
    },
    ambient: {
      drums: ['perc'],
      melody: ['gm_pad_1_new_age'],
      harmony: ['gm_string_ensemble_1'],
      effects: ['room', 'delay']
    },
    jazz: {
      drums: ['bd', 'sd', 'hh'],
      bass: ['gm_acoustic_bass'],
      melody: ['gm_trumpet'],
      harmony: ['gm_acoustic_grand_piano']
    }
  };
  
  return defaults[genre] || defaults.house;
}

function generateFallbackPattern(structure, instrumentation) {
  const genre = structure.genre || 'house';
  
  // Use existing complete patterns as fallback
  const genrePatterns = Object.values(COMPLETE_PATTERNS).filter(p => p.genre === genre);
  
  if (genrePatterns.length > 0) {
    return genrePatterns[0].pattern;
  }
  
  // Ultimate fallback
  return `stack(
    s("bd ~ bd ~").gain(1.0),
    s("~ sd ~ sd").gain(0.8),
    s("hh*2").gain(0.6)
  )`;
}
