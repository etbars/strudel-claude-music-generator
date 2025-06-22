// Phase 1 Modernization Test
// Test the enhanced Strudel v2.0 generation capabilities

import { generateStrudelCode } from './backend/claude_enhanced.js';

async function testPhase1() {
  console.log('🎵 Testing Phase 1: Core Strudel Modernization\n');
  
  const testPrompts = [
    {
      prompt: "Create a house track with TR-909 drums",
      expected: ['setcpm', 'stack', 'bank("RolandTR909")', 'bd', 'sd', 'hh']
    },
    {
      prompt: "Make a techno track with acid bass",
      expected: ['setcpm', 'stack', 'sawtooth', 'lpf', 'sine.range']
    },
    {
      prompt: "Generate ambient music with pads",
      expected: ['setcpm', 'gm_pad', 'room', 'slow', 'space']
    }
  ];

  for (const test of testPrompts) {
    console.log(`\n🧪 Testing: "${test.prompt}"`);
    console.log('─'.repeat(50));
    
    try {
      const code = await generateStrudelCode(test.prompt);
      console.log('Generated Code:');
      console.log(code);
      
      // Check for modern features
      const hasModernFeatures = test.expected.every(feature => 
        code.includes(feature)
      );
      
      console.log('\n✅ Modern Features Check:');
      test.expected.forEach(feature => {
        const found = code.includes(feature);
        console.log(`  ${found ? '✅' : '❌'} ${feature}: ${found ? 'Found' : 'Missing'}`);
      });
      
      console.log(`\n🎯 Overall: ${hasModernFeatures ? 'PASS' : 'NEEDS IMPROVEMENT'}`);
      
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  }
  
  console.log('\n🎉 Phase 1 Testing Complete!');
}

// Run the test
testPhase1().catch(console.error);
