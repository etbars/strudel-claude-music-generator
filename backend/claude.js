// claude.js - Claude API integration for generating Strudel code
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Initialize Anthropic client
const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// System prompt for Claude to generate Strudel code
const SYSTEM_PROMPT = `You are an expert Strudel music code generator. Create sophisticated, musical compositions using the full power of Strudel.

**STRUDEL COMPREHENSIVE DOCUMENTATION:**

**BASIC SYNTAX:**
- Single patterns: s("bd sd hh oh") or note("c e g b").sound("piano")
- Multiple patterns: Use $: prefix for each line
- Sound function: sound("bd*4, sd*2, hh*8")
- Stack function: stack(s("bd sd"), note("c e g").sound("piano"))

**MINI-NOTATION PATTERNS:**
- Basic sequences: "bd sd hh oh" (space-separated events)
- Rests: "bd ~ sd ~" (~ represents silence)
- Subdivisions: "bd [sd sd] hh oh" (brackets create subdivisions)
- Multiplication: "hh*8" (repeat 8 times per cycle)
- Division: "[bd sd]/2" (play over 2 cycles)
- Angle brackets: "<bd sd hh oh>" (one event per cycle)
- Elongation: "bd@3 sd" (bd lasts 3 times longer)
- Replication: "bd!3 sd" (repeat bd 3 times)
- Parallel: "bd,hh" (play simultaneously)

**SOUND SOURCES:**
- Drum samples: bd, sd, hh, oh, cp, rim, crash, perc, lt, mt, ht
- Drum banks: .bank("RolandTR909"), .bank("RolandTR808"), .bank("AkaiLinn")
- Melodic samples: piano, epiano, jazz, metal, wind, space, crow, east
- Oscillators: sine, sawtooth, square, triangle
- GM sounds: gm_acoustic_bass, gm_synth_bass_1, gm_epiano1, gm_xylophone

**SOUND SELECTION:**
- Sample selection: s("hh:0 hh:1 hh:2 hh:3") or .n("0 1 2 3")
- Bank selection: s("bd sd").bank("RolandTR909")

**NOTE PATTERNS:**
- Note names: note("c d e f g a b")
- Octaves: note("c2 d3 e4 f5")
- Sharps/flats: note("c# db e# fb")
- Numbers: n("0 2 4 7").scale("C:minor")
- Scales: .scale("C:major"), .scale("A:minor"), .scale("D:dorian")

**EFFECTS:**
- Volume: .gain(0.8)
- Reverb: .room(0.5)
- Delay: .delay(0.3)
- Filters: .lpf(800), .hpf(200), .bpf(1000)
- ADSR: .attack(0.1), .decay(0.2), .sustain(0.5), .release(0.8)
- Distortion: .distort(0.5)
- Panning: .pan(0.5) or .pan(sine.slow(4))

**PATTERN TRANSFORMATIONS:**
- Speed: .slow(2), .fast(2)
- Reverse: .rev()
- Offset: .early(0.25), .late(0.125)
- Degradation: .degrade(0.3)
- Sometimes: .sometimes(rev)
- Jux: .jux(rev) (apply to one stereo channel)

**MODULATION:**
- Sine waves: sine.range(0, 1), sine.slow(4).range(400, 4000)
- Perlin noise: perlin.range(0.5, 1)
- Saw waves: saw.range(0, 1)
- Random: rand.range(0, 1)

**ADVANCED PATTERNS:**
- Euclidean rhythms: s("bd(3,8)") (3 beats in 8 steps)
- Polyrhythms: s("bd*3, sd*4, hh*7")
- Conditional: .when(x => x > 0.5, gain(0.8))
- Every: .every(4, rev)
- Superimpose: .superimpose(add(12))

**TEMPO AND TIMING:**
- Set tempo: setcpm(120/4) (120 BPM in 4/4)
- Cycle length: .slow(2) doubles cycle length
- Swing: .swing(0.1)

**COMPOSITION TECHNIQUES:**
- Layering: stack() for simultaneous patterns
- Sequencing: cat() for sequential patterns
- Arrangement: Use $: for multiple independent patterns
- Dynamics: Vary .gain() across patterns
- Texture: Combine different sound sources
- Harmony: Use scales and chord progressions

**MUSICAL EXAMPLES:**

House Beat:
\`\`\`
$: s("bd*4").bank("RolandTR909")
$: s("[~ sd]*2").gain(0.8)
$: s("hh*8").gain(0.6).pan(sine.slow(8))
$: note("<c2 f2 g2 bb2>").sound("sawtooth").lpf(sine.slow(4).range(400, 2000))
\`\`\`

Ambient Texture:
\`\`\`
$: note("a2 c3 e3 g3").sound("sine").slow(4).room(0.9).gain(0.7)
$: s("~ ~ ~ [oh]").gain(0.4).room(0.8)
$: note("e4 g4 a4 c5").sound("triangle").slow(8).delay(0.4).gain(0.5)
\`\`\`

Jazz Progression:
\`\`\`
$: note("<Am7 Dm7 G7 CM7>").voicings().sound("epiano").room(0.3)
$: s("bd ~ [sd ~] ~").swing(0.2)
$: s("~ hh ~ hh").gain(0.5).swing(0.2)
\`\`\`

**OUTPUT REQUIREMENTS:**
1. Start immediately with code (comments allowed)
2. Create musically coherent compositions
3. Use appropriate sounds for the requested genre/style
4. Include multiple layers for richness
5. Apply effects tastefully
6. Consider harmonic and rhythmic relationships
7. Make patterns that evolve and have interest

Generate sophisticated Strudel code that showcases the full capabilities of the system!`;

/**
 * Generates Strudel code from a natural language prompt using Claude API
 * @param {string} prompt - User's natural language description of desired music
 * @returns {Promise<string>} - Generated Strudel code
 */
export async function generateStrudelCode(prompt) {
  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: `User request: ${prompt}` }
      ],
    });

    // Extract code from response
    let content = response.content[0].text;
    
    // Look for code blocks in the response
    const codeBlockRegex = /```(?:javascript|js)?\s*([\s\S]*?)```/;
    const match = content.match(codeBlockRegex);
    
    if (match && match[1]) {
      content = match[1].trim();
    }
    
    // Post-process to clean up the code
    content = postProcessStrudelCode(content);
    
    return content;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error(`Failed to generate Strudel code: ${error.message}`);
  }
}

/**
 * Post-processes generated Strudel code to fix common issues
 * @param {string} code - Raw generated code
 * @returns {string} - Cleaned up code
 */
function postProcessStrudelCode(code) {
  console.log('Raw code input:', code.substring(0, 200) + '...');
  
  // First, try to find code blocks
  const codeBlockMatch = code.match(/```(?:javascript|js)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    code = codeBlockMatch[1];
    console.log('Found code block, extracted:', code.substring(0, 100) + '...');
  }
  
  let lines = code.split('\n');
  let cleanedLines = [];
  let inCodeSection = false;
  let foundCodeStart = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Skip initial explanatory text - look for actual code start
    if (!inCodeSection) {
      // More aggressive detection of code start
      if (line.trim().startsWith('//') || 
          line.trim().startsWith('$:') ||
          line.trim().startsWith('s(') ||
          line.trim().startsWith('note(') ||
          line.trim().startsWith('sound(')) {
        inCodeSection = true;
        foundCodeStart = true;
        console.log('Found code start at line:', i, line.trim());
      } else {
        console.log('Skipping explanatory line:', line.trim());
        continue; // Skip these explanatory lines
      }
    }
    
    // If we're in code section, check for end of code
    if (inCodeSection && foundCodeStart) {
      // Stop at explanatory sections after code
      if (line.includes('This composition demonstrates') ||
          line.includes('This code demonstrates') ||
          line.includes('**Musical Intelligence:**') ||
          line.includes('**Layering Strategy:**') ||
          line.includes('**Layer Strategy:**') ||
          line.includes('**Arrangement Features:**') ||
          line.includes('**Sound Design:**') ||
          line.includes('**Effects Processing:**') ||
          line.includes('**Modulation Intelligence:**') ||
          line.includes('**Genre Intelligence:**') ||
          line.includes('**Harmonic Intelligence:**') ||
          line.includes('**Rhythmic Intelligence:**') ||
          line.includes('**Production Intelligence:**') ||
          line.startsWith('This creates') ||
          line.startsWith('The composition') ||
          line.startsWith('The result is') ||
          line.startsWith('The code creates') ||
          line.match(/^\d+\./) || // Numbered lists
          (line.trim() === '' && i < lines.length - 1 && lines[i + 1]?.includes('**'))) {
        console.log('Found end of code at line:', i, line.trim());
        break;
      }
    }
    
    if (inCodeSection) {
      // Only skip lines with actual syntax errors or problematic patterns
      if (line.includes('**') ||
          line.includes('This composition') ||
          line.includes('This code') ||
          line.includes('error:') ||
          line.trim().startsWith('---')) {
        continue; // Skip explanatory text and errors
      }
      
      // Minimal syntax fixes - only fix actual errors
      line = line.replace(/\.size\(/g, '.room('); // Replace .size() with .room()
      line = line.replace(/\.velocity\([^)]*\)/g, ''); // Remove .velocity() calls
      
      cleanedLines.push(line);
    }
  }
  
  // Remove trailing empty lines and any remaining explanatory text
  while (cleanedLines.length > 0) {
    const lastLine = cleanedLines[cleanedLines.length - 1].trim();
    if (lastLine === '' ||
        lastLine.includes('**') ||
        lastLine.startsWith('This ') ||
        lastLine.startsWith('The ') ||
        lastLine.includes('demonstrates') ||
        lastLine.includes('intelligence')) {
      cleanedLines.pop();
    } else {
      break;
    }
  }
  
  const result = cleanedLines.join('\n').trim();
  console.log('Final cleaned code:', result.substring(0, 200) + '...');
  
  // Basic syntax validation and fixes
  let fixedResult = result;
  
  // Fix missing closing parentheses for stack() calls
  const stackCount = (fixedResult.match(/stack\(/g) || []).length;
  const stackCloseCount = (fixedResult.match(/\)\s*(?:\/\/|$)/gm) || []).length;
  
  if (stackCount > stackCloseCount) {
    // Add missing closing parentheses
    const missing = stackCount - stackCloseCount;
    for (let i = 0; i < missing; i++) {
      fixedResult += '\n)';
    }
  }
  
  // Remove incomplete lines that might break syntax
  fixedResult = fixedResult
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      // Remove lines that are just opening brackets or incomplete
      return trimmed !== '' && 
             trimmed !== '{' && 
             trimmed !== '}' && 
             !trimmed.startsWith('---') &&
             !trimmed.includes('error:');
    })
    .join('\n');
  
  return fixedResult;
}
