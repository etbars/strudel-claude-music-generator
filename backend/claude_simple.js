// Simple Claude generator with strict syntax enforcement
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

const SIMPLE_PROMPT = `Generate Strudel code. Start immediately with code - NO explanatory text.

FORBIDDEN - NEVER USE:
- .when() calls
- .every() calls  
- .bank() calls
- .scale() calls
- .velocity() calls
- sine.range()
- Arrow functions
- GM sounds
- Complex patterns

ONLY USE:
- s("bd"), s("sd"), s("hh") for drums
- note("c d e f").sound("sine") for oscillators  
- .gain(), .room(), .delay(), .lpf(), .pan()

EXAMPLE:
setcpm(120/4)
stack(
  s("bd ~ sd ~"),
  s("~ hh ~ hh").gain(0.6)
)`;

export async function generateSimpleStrudelCode(prompt) {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `${SIMPLE_PROMPT}\n\nUser request: ${prompt}`
        }
      ]
    });

    let code = response.content[0].text;
    
    // Extract code from markdown blocks
    const codeMatch = code.match(/```(?:javascript|js)?\s*([\s\S]*?)```/);
    if (codeMatch) {
      code = codeMatch[1];
    }
    
    // Aggressive cleaning - remove any lines with forbidden syntax
    const lines = code.split('\n');
    const cleanLines = lines.filter(line => {
      return !line.includes('.when(') && 
             !line.includes('.every(') &&
             !line.includes('.bank(') &&
             !line.includes('.scale(') &&
             !line.includes('sine.range(') &&
             !line.includes('x => x') &&
             !line.includes('t => t') &&
             !line.includes('gm_');
    });
    
    return cleanLines.join('\n').trim();
    
  } catch (error) {
    console.error('Error generating simple Strudel code:', error);
    throw error;
  }
}
