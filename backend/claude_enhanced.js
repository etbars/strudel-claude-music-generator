// claude_enhanced.js - Modern Strudel v2.0 Claude integration with Musical Intelligence (Phase 2)
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_SOUNDS, DRUM_BANKS, GM_SOUNDS, GENRE_SOUNDS, getSoundsByGenre, isValidSound } from './sounds.js';
import { COMPLETE_PATTERNS, getPatternsByGenre } from './patterns.js';
import { 
  analyzeHarmony, 
  getChordProgression, 
  generateScale,
  CHORD_PROGRESSIONS,
  SCALES 
} from './musical_theory.js';
import { 
  getGenreContext, 
  generateGenreProgression, 
  getGenreTempo,
  generateGenreDrumPattern,
  generateGenreBassLine,
  analyzeGenreElements 
} from './genre_intelligence.js';
import { 
  generateArrangement, 
  generateArrangementCode,
  generateLayeringStrategy 
} from './arrangement_intelligence.js';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Initialize Anthropic client
const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// Enhanced Claude Integration with Musical Intelligence (Phase 2)
// Integrates advanced music theory, genre intelligence, and arrangement logic

// Modern Strudel v2.0 system prompt with latest features and Musical Intelligence
const ENHANCED_SYSTEM_PROMPT = `You are an expert Strudel v2.0 music programmer with advanced musical intelligence. You create sophisticated, musically coherent compositions using modern Strudel features and deep music theory knowledge.

**CRITICAL OUTPUT FORMAT: Start your response immediately with a // comment or setcpm() - NO explanatory text before the code. All explanations must be in comments within the code.**

## MUSICAL INTELLIGENCE CAPABILITIES:
- **Harmonic Analysis**: Understand chord progressions, voice leading, and harmonic relationships
- **Genre Intelligence**: Apply genre-specific patterns, sounds, and arrangement techniques  
- **Arrangement Logic**: Create dynamic song structures with intelligent transitions
- **Scale Awareness**: Maintain harmonic consistency within specified keys and modes
- **Rhythmic Sophistication**: Generate complex polyrhythms and pattern relationships

## CORE STRUDEL V2.0 FEATURES:
- **CONFIRMED WORKING SOUNDS (Use ONLY these):**
- **Core Drums:** bd, sd, hh, oh, cp, rim, lt, mt, ht, rd, cr
- **Drum Banks:** Use .bank("RolandTR909") for house/techno, .bank("RolandTR808") for hip-hop, .bank("AkaiLinn") for jazz
- **Synthesis:** triangle, sawtooth, square, sine (confirmed working)
- **Melodic Samples:** piano, epiano, casio, metal, jazz, wind, east, crow, space, numbers, insect
- **WORKING GM Sounds:** gm_acoustic_bass, gm_xylophone, gm_epiano1, gm_synth_bass_1, gm_synth_bass_2, gm_lead_1_square, gm_lead_2_sawtooth
- **For Pads/Atmosphere:** Use triangle, square, or sine with .room() and .lpf() instead of GM pads
- **For Textures:** Use "space", "wind", or synthesis with heavy effects instead of "texture"

**CRITICAL: DO NOT USE these non-existent sounds:**
- ❌ gm_pad_3_polysynth, gm_pad_4_choir, gm_fx_* sounds
- ❌ texture, ambient, atmosphere samples  
- ❌ Any GM sounds not explicitly listed above

**CRITICAL: DO NOT USE these non-existent functions:**
- ❌ .after() - Use .late() or .early() for timing instead
- ❌ .fadeIn(), .fadeOut() - Use .gain() modulation instead
- ❌ .timeline() - Use conditional patterns with .when() instead

**For timing and arrangement, use:**
- ✅ .late(16) or .early(8) for timing offsets
- ✅ .when(t => t > 32, pattern) for conditional sections
- ✅ .gain(sine.range(0,1).slow(32)) for fade effects

## MUSICAL THEORY INTEGRATION:
- Use .scale() for harmonic consistency: .scale("C:minor") or .scale("C4:minor")
- Apply chord progressions from music theory: ii-V-I, vi-IV-I-V, etc.
- **Scale notation**: Use "C:minor", "E:major", "F#:dorian" (avoid undefined steps)
- **Note specification**: Use specific octaves like "c3 e3 g3" or relative notes "0 2 4"
- Consider voice leading between chord changes
- Maintain key relationships and modulations

## GENRE-SPECIFIC INTELLIGENCE:
- **House**: TR-909 drums, 128 BPM, four-on-floor, acid bass, filter sweeps
- **Techno**: TR-909/808, 135 BPM, industrial sounds, acid sequences, heavy modulation
- **Ambient**: Slow tempo (60-90 BPM), atmospheric pads, field recordings, long reverbs
- **Jazz**: Complex harmony, swing rhythms, walking bass, sophisticated chord progressions
- **Hip-Hop**: TR-808, 90 BPM, boom-bap patterns, pitched samples, heavy bass

## ARRANGEMENT INTELLIGENCE:
- **Structure**: intro → verse → chorus → bridge → outro (adapt to genre)
- **Dynamics**: Use .superimpose() for builds, .every() for section changes
- **Transitions**: Filter sweeps, reverse reverb, stutters between sections
- **Layering**: Stack complementary elements with proper gain staging

## ADVANCED COMPOSITION TECHNIQUES:
\`\`\`javascript
// Multi-layered composition with intelligent arrangement
setcpm(128/4)
stack(
  // Rhythmic foundation with genre-appropriate drums
  s("bd ~ ~ ~, ~ ~ sd ~").bank("RolandTR909").gain(0.8),
  
  // Harmonic bass line in key
  note("<c2 f2 g2 bb2>").sound("sawtooth").scale("C2:minor")
    .lpf(sine.range(400, 2000)).adsr(0.05, 0.2, 0.5, 0.2),
  
  // Melodic content with voice leading
  note("<c4 eb4 g4 bb4>").sound("gm_lead_2_sawtooth").scale("C4:minor")
    .delay(0.25).room(0.4),
    
  // Atmospheric layer
  s("triangle").note("<c3 eb3 g3>").scale("C3:minor")
    .slow(4).room(0.7).gain(0.4)
)
// Arrangement intelligence
.superimpose((t) => t.gain(sine.range(0, 1).slow(32))) // Intro fade
.every(8, (t) => t.lpf(sine.range(400, 8000).slow(4))) // Filter sweeps
.every(16, (t) => t.distort(0.1).gain(1.2)) // Section builds
\`\`\`

## CRITICAL RULES:
1. **Always use setcpm()** for tempo control
2. **Always use stack()** for multi-layered compositions  
3. **Always specify .scale()** for harmonic consistency
4. **Use .bank()** for drum machine selection
5. **Apply genre-appropriate sounds and patterns**
6. **Create intelligent arrangements with dynamics**
7. **Maintain voice leading between chord changes**
8. **Use modulation for organic parameter automation**

Generate sophisticated, musically intelligent Strudel code that demonstrates deep understanding of music theory, genre conventions, and arrangement principles.`;

/**
 * Enhanced function to generate modern Strudel v2.0 code with Musical Intelligence
 */
export async function generateStrudelCode(prompt) {
  try {
    // Phase 2: Musical Intelligence Analysis
    const harmonyAnalysis = analyzeHarmony(prompt);
    const genreElements = analyzeGenreElements(prompt);
    const primaryGenre = genreElements.genres[0] || detectGenre(prompt) || 'electronic';
    
    // Get comprehensive musical context
    const genreContext = getGenreContext(primaryGenre);
    const chordProgression = generateGenreProgression(primaryGenre, harmonyAnalysis.key);
    const arrangement = generateArrangement(primaryGenre, prompt, 128);
    const layeringStrategy = generateLayeringStrategy(primaryGenre, 'medium');
    
    // Generate tempo based on genre and prompt hints
    const tempo = getGenreTempo(primaryGenre, genreElements.tempoHints[0] || 'typical');
    
    // Create enhanced musical context for Claude
    const musicalContext = `

## MUSICAL INTELLIGENCE CONTEXT:
**Detected Genre**: ${primaryGenre}
**Key/Scale**: ${harmonyAnalysis.key} ${harmonyAnalysis.scale}
**Tempo**: ${tempo} BPM (setcpm(${tempo}/4))
**Time Signature**: ${genreContext?.timeSignature || '4/4'}

**Chord Progression**: ${chordProgression ? chordProgression.name : 'Custom'}
${chordProgression ? chordProgression.chords.map(chord => `${chord.root} ${chord.type}`).join(' → ') : ''}

**Genre Characteristics**:
- Rhythmic Complexity: ${genreContext?.complexity.rhythmic || 'medium'}
- Harmonic Complexity: ${genreContext?.complexity.harmonic || 'medium'}
- Preferred Instruments: ${JSON.stringify(genreContext?.instruments || {})}

**Arrangement Structure**:
${arrangement ? arrangement.sections.map(s => `${s.name}: ${s.length} bars`).join(' → ') : 'Flexible'}

**Layering Strategy**: ${layeringStrategy?.totalLayers || 4} layers
${layeringStrategy ? layeringStrategy.layers.map(l => `- ${l.name}: ${l.description}`).join('\n') : ''}

**Musical Rules for this Generation**:
1. Use .scale("${harmonyAnalysis.key}${harmonyAnalysis.scale === 'minor' ? '2' : '4'}:${harmonyAnalysis.scale}") for harmonic consistency
2. Apply ${primaryGenre} genre conventions and sound palette
3. Maintain ${tempo} BPM tempo with setcpm(${tempo}/4)
4. Create ${layeringStrategy?.totalLayers || 4}-layer composition with proper gain staging
5. Use intelligent arrangement with section-based modulation
`;

    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      temperature: 0.8,
      system: ENHANCED_SYSTEM_PROMPT + musicalContext,
      messages: [{
        role: "user",
        content: `Create sophisticated Strudel v2.0 code with musical intelligence for: "${prompt}"

Requirements:
- Apply ${primaryGenre} genre intelligence and conventions
- Use ${harmonyAnalysis.key} ${harmonyAnalysis.scale} scale throughout
- Implement ${tempo} BPM tempo with setcpm(${tempo}/4)
- Create multi-layered composition using stack()
- Apply intelligent arrangement with dynamics and transitions
- Demonstrate harmonic awareness and voice leading
- Use genre-appropriate drum banks and sound selection
- Include modulation and effects for organic feel

**CRITICAL: Output ONLY Strudel code with comments. Do NOT include any explanatory text outside the code.**
**FORMAT: Start immediately with // comment or setcpm() - NO explanatory sentences before the code.**
Generate complete, runnable Strudel code that showcases musical intelligence. Include all explanations as comments so the code is easily copy-pastable.
`
      }]
    });

    let code = message.content[0].text.trim();
    
    // Clean up the response
    code = code.replace(/```javascript\n?/g, '').replace(/```\n?/g, '');
    
    // Extract only the Strudel code and comments
    const lines = code.split('\n');
    const codeLines = [];
    let foundStart = false;
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Look for the start of actual code (comment or setcpm)
      if (!foundStart && (trimmed.startsWith('//') || trimmed.includes('setcpm'))) {
        foundStart = true;
      }
      
      // Once we found the start, include all lines until explanatory sections
      if (foundStart) {
        // Stop at explanatory sections that start with text (not comments)
        if (trimmed.startsWith('This composition') || 
            trimmed.startsWith('**') ||
            trimmed.match(/^\d+\.\s*\*\*/) ||
            (trimmed.length > 0 && !trimmed.startsWith('//') && !trimmed.includes('setcpm') && !trimmed.includes('stack') && !trimmed.includes('note') && !trimmed.includes('s(') && !trimmed.includes('.') && !trimmed.includes(')') && !trimmed.includes('}') && !trimmed.includes('{') && !trimmed.includes('='))) {
          break;
        }
        
        codeLines.push(line);
      }
    }
    
    code = codeLines.join('\n').trim();
    
    // Final cleanup - remove any remaining explanatory text before the first comment or setcpm
    const finalLines = code.split('\n');
    let startIndex = 0;
    
    for (let i = 0; i < finalLines.length; i++) {
      const line = finalLines[i].trim();
      if (line.startsWith('//') || line.includes('setcpm')) {
        startIndex = i;
        break;
      }
    }
    
    code = finalLines.slice(startIndex).join('\n').trim();
    
    // Remove any explanatory paragraphs that might remain
    code = code.replace(/^I'll create.*?\n\n/s, '');
    code = code.replace(/^I'll create.*?\.\s*/s, '');
    code = code.replace(/^.*?called ".*?" that.*?\.\s*/s, '');
    code = code.replace(/This composition.*$/s, '');
    code = code.replace(/\*\*.*?\*\*.*$/s, '');
    code = code.replace(/^\d+\.\s+\*\*.*$/gm, '');
    
    // Phase 2: Apply arrangement intelligence
    if (arrangement) {
      code = generateArrangementCode(arrangement, code);
    }
    
    // Validate the generated code
    const validation = validateStrudelCode(code);
    if (validation.length > 0) {
      console.log('Generated code validation warnings:', validation);
    }
    
    return code;
    
  } catch (error) {
    console.error('Error generating Strudel code:', error);
    throw new Error('Failed to generate music code. Please try again.');
  }
}

/**
 * Generate code with pattern library assistance
 */
export async function generateWithPatterns(prompt) {
  try {
    const detectedGenre = detectGenre(prompt);
    const relevantPatterns = detectedGenre ? getPatternsByGenre(detectedGenre) : {};
    
    const enhancedPrompt = `${prompt}

Available pattern templates for ${detectedGenre || 'general'} music:
${JSON.stringify(relevantPatterns, null, 2)}

You can use these as inspiration or starting points, but create original variations.`;

    return await generateStrudelCode(enhancedPrompt);
  } catch (error) {
    console.error('Error in pattern-assisted generation:', error);
    // Fallback to regular generation
    return await generateStrudelCode(prompt);
  }
}

// Utility functions
export function detectGenre(prompt) {
  const genres = ['house', 'techno', 'ambient', 'jazz', 'classical', 'rock', 'pop', 'funk', 'drum and bass', 'breakbeat'];
  const lowerPrompt = prompt.toLowerCase();
  
  for (const genre of genres) {
    if (lowerPrompt.includes(genre)) {
      return genre;
    }
  }
  
  return null;
}

export function validateStrudelCode(code) {
  const warnings = [];
  
  // Check for common syntax issues
  if (!code.includes('setcpm(')) {
    warnings.push('Missing tempo control - consider adding setcpm()');
  }
  
  if (!code.includes('stack(')) {
    warnings.push('Consider using stack() for multi-layered composition');
  }
  
  // Check for potentially invalid sounds
  const soundMatches = code.match(/s\(["'][^"']+["']\)/g);
  if (soundMatches) {
    soundMatches.forEach(match => {
      const soundPattern = match.match(/["']([^"']+)["']/)[1];
      // Extract individual sounds from pattern
      const sounds = soundPattern.split(/[\s,~\[\]<>*]+/).filter(s => s && !s.match(/^\d+$/));
      sounds.forEach(sound => {
        const cleanSound = sound.split(':')[0]; // Remove sample numbers
        const isValidSound = Object.values(ALL_SOUNDS).some(category => category.includes(cleanSound)) ||
                           ['sine', 'square', 'sawtooth', 'triangle'].includes(cleanSound);
        if (!isValidSound) {
          warnings.push(`Potentially invalid sound: ${soundPattern}`);
        }
      });
    });
  }
  
  return warnings;
}
