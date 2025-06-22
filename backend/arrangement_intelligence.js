/**
 * Arrangement Intelligence Engine for Strudel + Claude
 * Provides sophisticated song structure, dynamics, and arrangement logic
 */

import { getGenreArrangement, getGenreContext } from './genre_intelligence.js';

// Dynamic arrangement patterns
export const ARRANGEMENT_PATTERNS = {
  intro: {
    description: 'Gradual introduction of elements',
    techniques: ['fade_in', 'element_addition', 'filter_opening'],
    dynamics: 'building',
    complexity: 'low'
  },
  
  verse: {
    description: 'Main melodic and harmonic content',
    techniques: ['steady_rhythm', 'melodic_focus', 'harmonic_stability'],
    dynamics: 'stable',
    complexity: 'medium'
  },
  
  chorus: {
    description: 'Peak energy and memorable hook',
    techniques: ['full_arrangement', 'harmonic_climax', 'rhythmic_drive'],
    dynamics: 'peak',
    complexity: 'high'
  },
  
  bridge: {
    description: 'Contrasting section with new material',
    techniques: ['harmonic_departure', 'rhythmic_variation', 'textural_change'],
    dynamics: 'contrasting',
    complexity: 'medium'
  },
  
  breakdown: {
    description: 'Stripped down section for tension',
    techniques: ['element_removal', 'filter_closing', 'rhythmic_simplification'],
    dynamics: 'minimal',
    complexity: 'low'
  },
  
  buildup: {
    description: 'Tension building toward climax',
    techniques: ['filter_sweep', 'rhythmic_acceleration', 'dynamic_crescendo'],
    dynamics: 'building',
    complexity: 'increasing'
  },
  
  drop: {
    description: 'High energy release section',
    techniques: ['full_spectrum', 'rhythmic_complexity', 'harmonic_richness'],
    dynamics: 'maximum',
    complexity: 'very_high'
  },
  
  outro: {
    description: 'Gradual conclusion and fade',
    techniques: ['element_removal', 'fade_out', 'harmonic_resolution'],
    dynamics: 'diminishing',
    complexity: 'decreasing'
  }
};

// Transition techniques between sections
export const TRANSITION_TECHNIQUES = {
  fade: {
    code: '.gain(sine.range(0, 1).slow(4))',
    description: 'Gradual volume change'
  },
  
  filter_sweep: {
    code: '.lpf(sine.range(200, 8000).slow(2))',
    description: 'Filter frequency sweep'
  },
  
  reverse_reverb: {
    code: '.rev().room(0.8)',
    description: 'Reverse with heavy reverb'
  },
  
  stutter: {
    code: '.ply(4).fast(2)',
    description: 'Rhythmic stuttering effect'
  },
  
  pitch_bend: {
    code: '.speed(sine.range(0.8, 1.2).slow(1))',
    description: 'Pitch bending transition'
  },
  
  gate: {
    code: '.gain(square.range(0, 1).fast(8))',
    description: 'Gated rhythmic effect'
  }
};

// Dynamic modulation patterns
export const DYNAMIC_PATTERNS = {
  breathing: {
    code: '.gain(sine.range(0.7, 1).slow(8))',
    description: 'Gentle breathing dynamics'
  },
  
  pumping: {
    code: '.gain(sine.range(0.3, 1).fast(4))',
    description: 'Pumping sidechain effect'
  },
  
  wave: {
    code: '.gain(sine.range(0.5, 1).slow(16))',
    description: 'Long wave-like dynamics'
  },
  
  pulse: {
    code: '.gain(square.range(0.8, 1).fast(2))',
    description: 'Rhythmic pulsing'
  },
  
  crescendo: {
    code: '.gain(sine.range(0.1, 1).slow(32))',
    description: 'Long crescendo build'
  },
  
  diminuendo: {
    code: '.gain(sine.range(1, 0.1).slow(32))',
    description: 'Long diminuendo fade'
  }
};

/**
 * Generate intelligent arrangement structure
 */
export function generateArrangement(genre, prompt, totalBars = 128) {
  const genreArrangement = getGenreArrangement(genre, totalBars);
  if (!genreArrangement) return null;
  
  const arrangement = {
    genre,
    totalBars,
    sections: [],
    transitions: [],
    dynamics: []
  };
  
  // Analyze prompt for arrangement hints
  const arrangementHints = analyzeArrangementPrompt(prompt);
  
  // Generate sections with intelligent transitions
  for (let i = 0; i < genreArrangement.sections.length; i++) {
    const section = genreArrangement.sections[i];
    const sectionInfo = ARRANGEMENT_PATTERNS[section.name] || ARRANGEMENT_PATTERNS.verse;
    
    // Add section
    arrangement.sections.push({
      ...section,
      ...sectionInfo,
      instruments: generateSectionInstrumentation(section.name, genre),
      effects: generateSectionEffects(section.name, genre),
      dynamics: generateSectionDynamics(section.name, sectionInfo.dynamics)
    });
    
    // Add transition to next section
    if (i < genreArrangement.sections.length - 1) {
      const nextSection = genreArrangement.sections[i + 1];
      const transition = generateTransition(section.name, nextSection.name, genre);
      arrangement.transitions.push({
        fromSection: section.name,
        toSection: nextSection.name,
        startBar: section.endBar,
        endBar: nextSection.startBar,
        ...transition
      });
    }
  }
  
  return arrangement;
}

/**
 * Generate section-specific instrumentation
 */
function generateSectionInstrumentation(sectionName, genre) {
  const genreContext = getGenreContext(genre);
  if (!genreContext) return {};
  
  const baseInstrumentation = {
    drums: true,
    bass: true,
    harmony: true,
    melody: true
  };
  
  switch (sectionName) {
    case 'intro':
      return {
        drums: false,
        bass: false,
        harmony: true,
        melody: true,
        atmospheric: true
      };
      
    case 'verse':
      return {
        drums: true,
        bass: true,
        harmony: true,
        melody: true,
        percussion: false
      };
      
    case 'chorus':
      return {
        drums: true,
        bass: true,
        harmony: true,
        melody: true,
        percussion: true,
        leads: true
      };
      
    case 'breakdown':
      return {
        drums: false,
        bass: true,
        harmony: false,
        melody: true,
        atmospheric: true
      };
      
    case 'buildup':
      return {
        drums: true,
        bass: true,
        harmony: false,
        melody: false,
        percussion: true,
        effects: true
      };
      
    case 'drop':
      return {
        drums: true,
        bass: true,
        harmony: true,
        melody: true,
        percussion: true,
        leads: true,
        effects: true
      };
      
    default:
      return baseInstrumentation;
  }
}

/**
 * Generate section-specific effects
 */
function generateSectionEffects(sectionName, genre) {
  const effects = [];
  
  switch (sectionName) {
    case 'intro':
      effects.push('.room(0.8)', '.lpf(sine.range(200, 2000).slow(16))');
      break;
      
    case 'verse':
      effects.push('.room(0.3)', '.delay(0.125)');
      break;
      
    case 'chorus':
      effects.push('.room(0.5)', '.delay(0.25)', '.gain(1.1)');
      break;
      
    case 'breakdown':
      effects.push('.room(0.9)', '.lpf(400)', '.gain(0.7)');
      break;
      
    case 'buildup':
      effects.push('.lpf(sine.range(400, 8000).slow(4))', '.gain(sine.range(0.5, 1.2).slow(2))');
      break;
      
    case 'drop':
      effects.push('.room(0.4)', '.distort(0.1)', '.gain(1.2)');
      break;
      
    case 'outro':
      effects.push('.room(0.8)', '.gain(sine.range(1, 0).slow(16))');
      break;
  }
  
  return effects;
}

/**
 * Generate section-specific dynamics
 */
function generateSectionDynamics(sectionName, dynamicsType) {
  const dynamics = [];
  
  switch (dynamicsType) {
    case 'building':
      dynamics.push(DYNAMIC_PATTERNS.crescendo);
      break;
      
    case 'stable':
      dynamics.push(DYNAMIC_PATTERNS.breathing);
      break;
      
    case 'peak':
      dynamics.push(DYNAMIC_PATTERNS.pumping);
      break;
      
    case 'minimal':
      dynamics.push(DYNAMIC_PATTERNS.wave);
      break;
      
    case 'diminishing':
      dynamics.push(DYNAMIC_PATTERNS.diminuendo);
      break;
      
    case 'maximum':
      dynamics.push(DYNAMIC_PATTERNS.pulse);
      break;
  }
  
  return dynamics;
}

/**
 * Generate intelligent transition between sections
 */
function generateTransition(fromSection, toSection, genre) {
  const transitionMap = {
    'intro-verse': 'fade',
    'verse-chorus': 'filter_sweep',
    'chorus-verse': 'reverse_reverb',
    'verse-bridge': 'stutter',
    'bridge-chorus': 'pitch_bend',
    'chorus-breakdown': 'gate',
    'breakdown-buildup': 'filter_sweep',
    'buildup-drop': 'reverse_reverb',
    'drop-outro': 'fade'
  };
  
  const transitionKey = `${fromSection}-${toSection}`;
  const transitionType = transitionMap[transitionKey] || 'fade';
  const transition = TRANSITION_TECHNIQUES[transitionType];
  
  return {
    type: transitionType,
    code: transition.code,
    description: transition.description,
    duration: 2 // bars
  };
}

/**
 * Analyze prompt for arrangement hints
 */
function analyzeArrangementPrompt(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  const hints = {
    structure: [],
    energy: 'medium',
    complexity: 'medium',
    length: 'medium'
  };
  
  // Detect structure keywords
  const structureKeywords = ['intro', 'verse', 'chorus', 'bridge', 'breakdown', 'buildup', 'drop', 'outro'];
  structureKeywords.forEach(keyword => {
    if (lowerPrompt.includes(keyword)) {
      hints.structure.push(keyword);
    }
  });
  
  // Detect energy level
  if (lowerPrompt.includes('high energy') || lowerPrompt.includes('intense') || lowerPrompt.includes('aggressive')) {
    hints.energy = 'high';
  } else if (lowerPrompt.includes('chill') || lowerPrompt.includes('relaxed') || lowerPrompt.includes('ambient')) {
    hints.energy = 'low';
  }
  
  // Detect complexity
  if (lowerPrompt.includes('complex') || lowerPrompt.includes('sophisticated') || lowerPrompt.includes('intricate')) {
    hints.complexity = 'high';
  } else if (lowerPrompt.includes('simple') || lowerPrompt.includes('minimal') || lowerPrompt.includes('basic')) {
    hints.complexity = 'low';
  }
  
  // Detect length preferences
  if (lowerPrompt.includes('long') || lowerPrompt.includes('extended') || lowerPrompt.includes('epic')) {
    hints.length = 'long';
  } else if (lowerPrompt.includes('short') || lowerPrompt.includes('brief') || lowerPrompt.includes('quick')) {
    hints.length = 'short';
  }
  
  return hints;
}

/**
 * Generate arrangement code for Strudel
 */
export function generateArrangementCode(arrangement, basePattern) {
  if (!arrangement || !basePattern) return basePattern;
  
  let code = basePattern;
  
  // Add structural modulations
  arrangement.sections.forEach((section, index) => {
    if (section.effects && section.effects.length > 0) {
      const sectionCondition = `.every(${section.length}, (t) => t${section.effects.join('')})`;
      code += `\n${sectionCondition}`;
    }
    
    if (section.dynamics && section.dynamics.length > 0) {
      section.dynamics.forEach(dynamic => {
        code += `\n.superimpose((t) => t${dynamic.code})`;
      });
    }
  });
  
  // Add transitions
  arrangement.transitions.forEach(transition => {
    if (transition.code) {
      code += `\n.sometimes((t) => t${transition.code})`;
    }
  });
  
  return code;
}

/**
 * Generate dynamic layering instructions
 */
export function generateLayeringStrategy(genre, complexity = 'medium') {
  const genreContext = getGenreContext(genre);
  if (!genreContext) return null;
  
  const layers = [];
  
  // Base rhythm layer
  layers.push({
    name: 'rhythm',
    priority: 1,
    instruments: ['kick', 'snare', 'hihat'],
    effects: ['.gain(0.8)'],
    description: 'Foundation rhythm section'
  });
  
  // Bass layer
  layers.push({
    name: 'bass',
    priority: 2,
    instruments: ['bass'],
    effects: ['.gain(0.7)', '.lpf(800)'],
    description: 'Low-end foundation'
  });
  
  // Harmonic layer
  if (complexity !== 'low') {
    layers.push({
      name: 'harmony',
      priority: 3,
      instruments: ['pads', 'chords'],
      effects: ['.gain(0.5)', '.room(0.4)'],
      description: 'Harmonic content'
    });
  }
  
  // Melodic layer
  layers.push({
    name: 'melody',
    priority: 4,
    instruments: ['lead', 'melody'],
    effects: ['.gain(0.6)', '.delay(0.25)'],
    description: 'Main melodic line'
  });
  
  // Atmospheric layer
  if (complexity === 'high') {
    layers.push({
      name: 'atmosphere',
      priority: 5,
      instruments: ['pads', 'texture', 'field'],
      effects: ['.gain(0.3)', '.room(0.8)'],
      description: 'Atmospheric textures'
    });
  }
  
  return {
    genre,
    complexity,
    layers,
    totalLayers: layers.length
  };
}

/**
 * Generate intelligent voice leading between sections
 */
export function generateVoiceLeading(fromChords, toChords) {
  const voiceLeading = [];
  
  for (let i = 0; i < Math.min(fromChords.length, toChords.length); i++) {
    const fromChord = fromChords[i];
    const toChord = toChords[i];
    
    // Calculate voice movement
    const movement = {
      from: fromChord,
      to: toChord,
      movement: 'smooth', // This would be calculated based on interval analysis
      technique: 'common_tone' // This would be determined by harmonic analysis
    };
    
    voiceLeading.push(movement);
  }
  
  return voiceLeading;
}
