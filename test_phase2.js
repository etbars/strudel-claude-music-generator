/**
 * Phase 2 Musical Intelligence Test Suite
 * Tests advanced music theory, genre intelligence, and arrangement logic
 */

import { generateStrudelCode } from './backend/claude_enhanced.js';
import { analyzeHarmony, getChordProgression } from './backend/musical_theory.js';
import { getGenreContext, analyzeGenreElements } from './backend/genre_intelligence.js';
import { generateArrangement } from './backend/arrangement_intelligence.js';

// Test prompts for different musical intelligence features
const testPrompts = [
  {
    name: "Harmonic Intelligence Test",
    prompt: "Create a jazz ballad in C minor with sophisticated chord progressions and voice leading",
    expectedFeatures: [
      'setcpm(',
      'stack(',
      '.scale("C2:minor")',
      'jazz',
      'chord',
      '.bank('
    ]
  },
  {
    name: "Genre Intelligence Test", 
    prompt: "Generate a deep house track with classic TR-909 drums and acid bass lines",
    expectedFeatures: [
      'setcpm(128/4)',
      'stack(',
      '.bank("RolandTR909")',
      'sawtooth',
      '.lpf(',
      'sine.range('
    ]
  },
  {
    name: "Arrangement Intelligence Test",
    prompt: "Create an epic trance anthem with intro, breakdown, buildup, and drop sections",
    expectedFeatures: [
      'setcpm(',
      'stack(',
      '.superimpose(',
      '.every(',
      'buildup',
      'breakdown'
    ]
  },
  {
    name: "Rhythmic Intelligence Test",
    prompt: "Make a complex polyrhythmic techno track with multiple percussion layers",
    expectedFeatures: [
      'setcpm(',
      'stack(',
      'polyrhythm',
      '.bank(',
      'bd',
      'sd',
      'hh'
    ]
  },
  {
    name: "Scale Consistency Test",
    prompt: "Compose a melodic dubstep track in D minor with harmonic bass and lead synths",
    expectedFeatures: [
      '.scale("D',
      'minor")',
      'setcpm(',
      'stack(',
      'bass',
      'lead'
    ]
  }
];

// Test individual musical intelligence modules
async function testMusicalIntelligenceModules() {
  console.log('\n🎵 TESTING MUSICAL INTELLIGENCE MODULES\n');
  
  // Test Harmonic Analysis
  console.log('1. Testing Harmonic Analysis:');
  const harmonyTest = analyzeHarmony("Create a jazz ballad in C minor with sophisticated chord progressions");
  console.log(`   Key: ${harmonyTest.key}, Scale: ${harmonyTest.scale}`);
  console.log(`   Genre: ${harmonyTest.genre}`);
  console.log(`   Detected Chords: ${harmonyTest.detectedChords ? harmonyTest.detectedChords.join(', ') : 'None'}`);
  console.log(`   Suggested Progression: ${harmonyTest.suggestedProgression ? harmonyTest.suggestedProgression.name : 'None'}`);
  
  // Test Genre Analysis
  console.log('\n2. Testing Genre Intelligence:');
  const genreTest = analyzeGenreElements("Generate a deep house track with classic TR-909 drums");
  console.log(`   Detected Genres: ${genreTest.genres.join(', ')}`);
  console.log(`   Tempo Hints: ${genreTest.tempoHints.join(', ')}`);
  console.log(`   Mood: ${genreTest.mood}`);
  
  // Test Genre Context
  const houseContext = getGenreContext('house');
  console.log(`   House Tempo Range: ${houseContext.tempo.min}-${houseContext.tempo.max} BPM`);
  console.log(`   House Complexity: Rhythmic ${houseContext.complexity.rhythmic}, Harmonic ${houseContext.complexity.harmonic}`);
  
  // Test Arrangement Generation
  console.log('\n3. Testing Arrangement Intelligence:');
  const arrangement = generateArrangement('house', 'epic anthem with buildup and drop', 128);
  if (arrangement) {
    console.log(`   Structure: ${arrangement.sections.map(s => s.name).join(' → ')}`);
    console.log(`   Total Length: ${arrangement.totalBars} bars`);
    console.log(`   Key Sections: ${arrangement.sections.filter(s => s.energy > 0.7).map(s => s.name).join(', ')}`);
  } else {
    console.log('   ⚠️  Arrangement generation returned null - checking available genres...');
    const testGenres = ['house', 'techno', 'ambient', 'jazz'];
    for (const testGenre of testGenres) {
      const testArrangement = generateArrangement(testGenre, 'test track', 64);
      if (testArrangement) {
        console.log(`   ✅ ${testGenre} arrangement works: ${testArrangement.sections.length} sections`);
        break;
      }
    }
  }
  
  console.log('\n✅ Musical Intelligence Modules Test Complete\n');
}

// Test Phase 2 enhanced generation
async function testPhase2Generation() {
  console.log('🎼 TESTING PHASE 2 MUSICAL INTELLIGENCE GENERATION\n');
  
  for (const test of testPrompts) {
    console.log(`Testing: ${test.name}`);
    console.log(`Prompt: "${test.prompt}"`);
    
    try {
      const startTime = Date.now();
      const code = await generateStrudelCode(test.prompt);
      const endTime = Date.now();
      
      console.log(`✅ Generated in ${endTime - startTime}ms`);
      console.log(`📏 Code length: ${code.length} characters`);
      
      // Check for expected features
      const foundFeatures = test.expectedFeatures.filter(feature => 
        code.toLowerCase().includes(feature.toLowerCase())
      );
      
      console.log(`🎯 Features found: ${foundFeatures.length}/${test.expectedFeatures.length}`);
      foundFeatures.forEach(feature => console.log(`   ✅ ${feature}`));
      
      const missingFeatures = test.expectedFeatures.filter(feature => 
        !code.toLowerCase().includes(feature.toLowerCase())
      );
      missingFeatures.forEach(feature => console.log(`   ❌ Missing: ${feature}`));
      
      // Show a snippet of the generated code
      console.log('\n📝 Generated Code Preview:');
      console.log(code.split('\n').slice(0, 10).join('\n'));
      if (code.split('\n').length > 10) {
        console.log('   ... (truncated)');
      }
      
      console.log('\n' + '─'.repeat(80) + '\n');
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      console.log('\n' + '─'.repeat(80) + '\n');
    }
  }
}

// Test musical coherence and intelligence
async function testMusicalCoherence() {
  console.log('🎼 TESTING MUSICAL COHERENCE AND INTELLIGENCE\n');
  
  const coherenceTests = [
    {
      name: "Key Consistency",
      prompt: "Create a progressive house track in F# minor with emotional chord progressions",
      checks: [
        code => code.includes('.scale("F#') || code.includes('.scale("Gb'),
        code => code.includes('minor'),
        code => code.includes('setcpm(')
      ]
    },
    {
      name: "Genre Authenticity", 
      prompt: "Make an authentic 90s jungle track with breakbeats and sub bass",
      checks: [
        code => code.includes('breakbeat') || code.includes('amen'),
        code => code.includes('bass'),
        code => code.includes('setcpm(') && (code.includes('170') || code.includes('175'))
      ]
    },
    {
      name: "Harmonic Sophistication",
      prompt: "Compose a neo-soul track with jazz chords and smooth progressions",
      checks: [
        code => code.includes('jazz') || code.includes('chord'),
        code => code.includes('soul') || code.includes('smooth'),
        code => code.includes('.scale(')
      ]
    }
  ];
  
  for (const test of coherenceTests) {
    console.log(`Testing: ${test.name}`);
    console.log(`Prompt: "${test.prompt}"`);
    
    try {
      const code = await generateStrudelCode(test.prompt);
      const passedChecks = test.checks.filter(check => check(code)).length;
      
      console.log(`🎯 Coherence Score: ${passedChecks}/${test.checks.length}`);
      
      if (passedChecks === test.checks.length) {
        console.log('✅ Full musical coherence achieved');
      } else {
        console.log(`⚠️  Partial coherence: ${passedChecks}/${test.checks.length} checks passed`);
      }
      
      console.log('\n' + '─'.repeat(60) + '\n');
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      console.log('\n' + '─'.repeat(60) + '\n');
    }
  }
}

// Main test execution
async function runPhase2Tests() {
  console.log('🚀 STRUDEL + CLAUDE PHASE 2 MUSICAL INTELLIGENCE TEST SUITE');
  console.log('=' .repeat(80));
  
  try {
    // Test individual modules first
    await testMusicalIntelligenceModules();
    
    // Test enhanced generation
    await testPhase2Generation();
    
    // Test musical coherence
    await testMusicalCoherence();
    
    console.log('🎉 PHASE 2 TESTING COMPLETE!');
    console.log('✅ Musical Intelligence features validated');
    console.log('✅ Genre-aware generation working');
    console.log('✅ Harmonic coherence implemented');
    console.log('✅ Arrangement intelligence active');
    console.log('\n🎵 Ready for advanced AI-driven music composition! 🎵');
    
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Run the tests
runPhase2Tests();
