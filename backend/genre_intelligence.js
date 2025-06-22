/**
 * Genre Intelligence Engine for Strudel + Claude
 * Provides genre-specific musical logic, patterns, and arrangements
 */

import { CHORD_PROGRESSIONS, generateScale, getChordProgression } from './musical_theory.js';

// Genre-specific characteristics
export const GENRE_CHARACTERISTICS = {
  house: {
    tempo: { min: 120, max: 130, typical: 128 },
    timeSignature: '4/4',
    keyPreferences: ['C', 'G', 'D', 'A', 'F'],
    scalePreferences: ['minor', 'major'],
    drumPatterns: ['four_on_floor', 'house_groove'],
    bassPatterns: ['house_bass', 'acid_bass'],
    rhythmicComplexity: 'medium',
    harmonicComplexity: 'low',
    arrangement: {
      intro: 16, buildup: 32, drop: 64, breakdown: 32, outro: 16
    },
    effects: ['reverb', 'delay', 'filter_sweep', 'sidechain'],
    instruments: {
      drums: ['RolandTR909', 'RolandTR808'],
      bass: ['sawtooth', 'gm_synth_bass_1'],
      leads: ['gm_lead_2_sawtooth', 'square'],
      pads: ['gm_pad_1_new_age', 'gm_pad_2_warm']
    }
  },
  
  techno: {
    tempo: { min: 125, max: 140, typical: 135 },
    timeSignature: '4/4',
    keyPreferences: ['C', 'G', 'D', 'A', 'F', 'Bb'],
    scalePreferences: ['minor', 'dorian'],
    drumPatterns: ['techno_kick', 'industrial_groove'],
    bassPatterns: ['acid_bass', 'techno_bass'],
    rhythmicComplexity: 'high',
    harmonicComplexity: 'medium',
    arrangement: {
      intro: 32, buildup: 64, drop: 128, breakdown: 64, outro: 32
    },
    effects: ['distortion', 'delay', 'reverb', 'filter_sweep'],
    instruments: {
      drums: ['RolandTR909', 'RolandTR808', 'industrial'],
      bass: ['sawtooth', 'square'],
      leads: ['sawtooth', 'square', 'triangle'],
      pads: ['gm_pad_3_polysynth', 'white']
    }
  },
  
  ambient: {
    tempo: { min: 60, max: 90, typical: 75 },
    timeSignature: '4/4',
    keyPreferences: ['C', 'G', 'D', 'A', 'F', 'Bb', 'Eb'],
    scalePreferences: ['major', 'dorian', 'lydian'],
    drumPatterns: ['minimal_percussion', 'atmospheric'],
    bassPatterns: ['drone_bass', 'subtle_bass'],
    rhythmicComplexity: 'low',
    harmonicComplexity: 'high',
    arrangement: {
      intro: 64, development: 128, climax: 64, resolution: 64, outro: 32
    },
    effects: ['reverb', 'delay', 'chorus', 'room'],
    instruments: {
      drums: ['field', 'nature', 'texture'],
      bass: ['gm_synth_bass_1', 'sine'],
      leads: ['gm_flute', 'gm_pad_1_new_age'],
      pads: ['gm_pad_1_new_age', 'gm_pad_2_warm', 'gm_pad_4_choir']
    }
  },
  
  jazz: {
    tempo: { min: 90, max: 180, typical: 120 },
    timeSignature: '4/4',
    keyPreferences: ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'G', 'D', 'A'],
    scalePreferences: ['major', 'minor', 'dorian', 'mixolydian'],
    drumPatterns: ['swing', 'jazz_waltz', 'latin'],
    bassPatterns: ['walking_bass', 'jazz_bass'],
    rhythmicComplexity: 'high',
    harmonicComplexity: 'very_high',
    arrangement: {
      head: 32, solos: 128, trading: 32, head_out: 32
    },
    effects: ['reverb', 'chorus'],
    instruments: {
      drums: ['jazz', 'brush'],
      bass: ['gm_acoustic_bass', 'gm_electric_bass_finger'],
      leads: ['gm_trumpet', 'gm_tenor_sax', 'piano'],
      pads: ['piano', 'gm_electric_piano_1']
    }
  },
  
  hip_hop: {
    tempo: { min: 70, max: 140, typical: 90 },
    timeSignature: '4/4',
    keyPreferences: ['C', 'G', 'D', 'A', 'F', 'Bb'],
    scalePreferences: ['minor', 'pentatonic_minor', 'blues'],
    drumPatterns: ['boom_bap', 'trap', 'old_school'],
    bassPatterns: ['hip_hop_bass', '808_bass'],
    rhythmicComplexity: 'high',
    harmonicComplexity: 'low',
    arrangement: {
      intro: 8, verse: 32, chorus: 16, verse: 32, chorus: 16, bridge: 16, outro: 8
    },
    effects: ['reverb', 'delay', 'distortion'],
    instruments: {
      drums: ['RolandTR808', 'vintage'],
      bass: ['gm_synth_bass_1', 'sine'],
      leads: ['piano', 'gm_electric_piano_1'],
      pads: ['gm_pad_2_warm', 'strings']
    }
  },
  
  drum_and_bass: {
    tempo: { min: 160, max: 180, typical: 174 },
    timeSignature: '4/4',
    keyPreferences: ['C', 'G', 'D', 'A', 'F'],
    scalePreferences: ['minor', 'harmonic_minor'],
    drumPatterns: ['amen_break', 'dnb_groove'],
    bassPatterns: ['reese_bass', 'sub_bass'],
    rhythmicComplexity: 'very_high',
    harmonicComplexity: 'medium',
    arrangement: {
      intro: 32, buildup: 32, drop: 64, breakdown: 32, drop: 64, outro: 16
    },
    effects: ['reverb', 'delay', 'distortion', 'filter_sweep'],
    instruments: {
      drums: ['amen', 'dnb'],
      bass: ['sawtooth', 'sine'],
      leads: ['gm_lead_2_sawtooth', 'square'],
      pads: ['gm_pad_3_polysynth', 'strings']
    }
  }
};

// Rhythm pattern templates
export const RHYTHM_PATTERNS = {
  four_on_floor: {
    kick: 'bd ~ ~ ~, bd ~ ~ ~, bd ~ ~ ~, bd ~ ~ ~',
    snare: '~ ~ sd ~, ~ ~ sd ~, ~ ~ sd ~, ~ ~ sd ~',
    hihat: 'hh ~ hh ~, hh ~ hh ~, hh ~ hh ~, hh ~ hh ~'
  },
  
  house_groove: {
    kick: 'bd ~ ~ ~, bd ~ ~ ~, bd ~ ~ ~, bd ~ ~ ~',
    snare: '~ ~ sd ~, ~ ~ sd ~, ~ ~ sd ~, ~ ~ sd ~',
    hihat: '[hh*4], [hh*4], [hh*4], [hh*4]',
    openhat: '~ ~ ~ oh, ~ ~ ~ ~, ~ ~ ~ oh, ~ ~ ~ ~'
  },
  
  techno_kick: {
    kick: 'bd:2 ~ [~ bd] ~, bd:2 ~ ~ ~, bd:2 ~ [~ bd] ~, bd:2 ~ ~ ~',
    snare: '~ ~ ~ ~, ~ ~ cp ~, ~ ~ ~ ~, ~ ~ cp ~',
    hihat: '[hh*8], [hh*8], [hh*8], [hh*8]'
  },
  
  boom_bap: {
    kick: 'bd ~ ~ ~, ~ ~ bd ~, ~ bd ~ ~, ~ ~ ~ ~',
    snare: '~ ~ sd ~, ~ ~ ~ sd, ~ ~ sd ~, ~ sd ~ ~',
    hihat: 'hh ~ hh hh, ~ hh ~ hh, hh ~ hh ~, hh ~ ~ hh'
  },
  
  trap: {
    kick: 'bd ~ ~ bd, ~ ~ bd ~, bd ~ ~ ~, ~ bd ~ bd',
    snare: '~ ~ sd ~, ~ ~ ~ ~, ~ ~ sd ~, ~ ~ ~ ~',
    hihat: '[hh*16], [hh*16], [hh*16], [hh*16]'
  },
  
  swing: {
    kick: 'bd ~ ~ ~, ~ ~ bd ~, ~ ~ ~ ~, ~ ~ bd ~',
    snare: '~ ~ sd ~, ~ ~ ~ sd, ~ ~ sd ~, ~ sd ~ ~',
    hihat: 'hh ~ ~ hh, ~ hh ~ ~, hh ~ ~ hh, ~ hh ~ ~'
  },
  
  dnb_groove: {
    kick: 'bd ~ ~ ~, ~ ~ ~ ~, bd ~ ~ ~, ~ ~ ~ ~',
    snare: '~ ~ sd ~, sd ~ ~ sd, ~ sd ~ ~, sd ~ sd ~',
    hihat: '[hh*16], [hh*16], [hh*16], [hh*16]'
  }
};

// Bass pattern templates
export const BASS_PATTERNS = {
  house_bass: {
    pattern: '<c2 [~ c2] f2 [~ g2]>',
    sound: 'sawtooth',
    effects: '.lpf(sine.range(400, 2000)).adsr(0.05, 0.2, 0.5, 0.2)'
  },
  
  acid_bass: {
    pattern: '<[c2 [c2 c3]] [eb2 [~ eb3]] [f2 [f2 f3]] [g2 [~ g2]]>',
    sound: 'sawtooth',
    effects: '.lpf(sine.range(400, 4000).fast(0.25)).resonance(8).adsr(0.01, 0.1, 0.3, 0.1)'
  },
  
  techno_bass: {
    pattern: '<c2 ~ f2 ~, ~ c3 ~ g2>',
    sound: 'square',
    effects: '.lpf(perlin.range(300, 1500)).gain(0.7)'
  },
  
  walking_bass: {
    pattern: '<c2 d2 e2 f2, g2 a2 bb2 c3>',
    sound: 'gm_acoustic_bass',
    effects: '.adsr(0.01, 0.1, 0.8, 0.2)'
  },
  
  hip_hop_bass: {
    pattern: '<c2 [~ c2] ~ [c2 ~]>',
    sound: 'gm_synth_bass_1',
    effects: '.lpf(800).gain(0.8)'
  },
  
  reese_bass: {
    pattern: '<c2 ~ ~ ~, ~ ~ eb2 ~, ~ f2 ~ ~, ~ ~ ~ g2>',
    sound: 'sawtooth',
    effects: '.lpf(sine.range(200, 1000)).distort(0.3).gain(0.9)'
  }
};

/**
 * Get genre-specific generation context
 */
export function getGenreContext(genre) {
  const characteristics = GENRE_CHARACTERISTICS[genre];
  if (!characteristics) return null;
  
  return {
    genre,
    tempo: characteristics.tempo,
    timeSignature: characteristics.timeSignature,
    keyPreferences: characteristics.keyPreferences,
    scalePreferences: characteristics.scalePreferences,
    rhythmPatterns: characteristics.drumPatterns.map(p => RHYTHM_PATTERNS[p]).filter(Boolean),
    bassPatterns: characteristics.bassPatterns.map(p => BASS_PATTERNS[p]).filter(Boolean),
    arrangement: characteristics.arrangement,
    effects: characteristics.effects,
    instruments: characteristics.instruments,
    complexity: {
      rhythmic: characteristics.rhythmicComplexity,
      harmonic: characteristics.harmonicComplexity
    }
  };
}

/**
 * Generate genre-appropriate chord progression
 */
export function generateGenreProgression(genre, key = 'C', length = 4) {
  const characteristics = GENRE_CHARACTERISTICS[genre];
  if (!characteristics) return null;
  
  const preferredScale = characteristics.scalePreferences[0];
  const progressions = CHORD_PROGRESSIONS[genre] || CHORD_PROGRESSIONS.pop;
  const selectedProgression = progressions[Math.floor(Math.random() * progressions.length)];
  
  return getChordProgression(key, preferredScale, selectedProgression.name, genre);
}

/**
 * Get genre-appropriate tempo
 */
export function getGenreTempo(genre, variation = 'typical') {
  const characteristics = GENRE_CHARACTERISTICS[genre];
  if (!characteristics) return 120;
  
  switch (variation) {
    case 'slow':
      return characteristics.tempo.min;
    case 'fast':
      return characteristics.tempo.max;
    case 'random':
      return Math.floor(Math.random() * (characteristics.tempo.max - characteristics.tempo.min)) + characteristics.tempo.min;
    default:
      return characteristics.tempo.typical;
  }
}

/**
 * Generate genre-specific drum pattern
 */
export function generateGenreDrumPattern(genre, complexity = 'medium') {
  const characteristics = GENRE_CHARACTERISTICS[genre];
  if (!characteristics) return null;
  
  const patternNames = characteristics.drumPatterns;
  const selectedPattern = patternNames[Math.floor(Math.random() * patternNames.length)];
  const pattern = RHYTHM_PATTERNS[selectedPattern];
  
  if (!pattern) return null;
  
  const drumBank = characteristics.instruments.drums[0];
  
  return {
    name: selectedPattern,
    bank: drumBank,
    patterns: pattern,
    complexity: characteristics.rhythmicComplexity
  };
}

/**
 * Generate genre-specific bass line
 */
export function generateGenreBassLine(genre, key = 'C', scale = 'minor') {
  const characteristics = GENRE_CHARACTERISTICS[genre];
  if (!characteristics) return null;
  
  const bassPatternNames = characteristics.bassPatterns;
  const selectedPatternName = bassPatternNames[Math.floor(Math.random() * bassPatternNames.length)];
  const bassPattern = BASS_PATTERNS[selectedPatternName];
  
  if (!bassPattern) return null;
  
  // Transpose pattern to the specified key
  const scaleNotes = generateScale(key, scale, 2);
  
  return {
    name: selectedPatternName,
    pattern: bassPattern.pattern,
    sound: bassPattern.sound,
    effects: bassPattern.effects,
    key,
    scale,
    scaleNotes
  };
}

/**
 * Get arrangement structure for genre
 */
export function getGenreArrangement(genre, totalBars = 128) {
  const characteristics = GENRE_CHARACTERISTICS[genre];
  if (!characteristics) return null;
  
  const arrangement = characteristics.arrangement;
  const sections = [];
  let currentBar = 0;
  
  for (const [sectionName, bars] of Object.entries(arrangement)) {
    if (currentBar + bars <= totalBars) {
      sections.push({
        name: sectionName,
        startBar: currentBar,
        endBar: currentBar + bars - 1,
        length: bars
      });
      currentBar += bars;
    }
  }
  
  return {
    genre,
    totalBars: currentBar,
    sections
  };
}

/**
 * Generate genre-specific effects chain
 */
export function getGenreEffects(genre, intensity = 'medium') {
  const characteristics = GENRE_CHARACTERISTICS[genre];
  if (!characteristics) return [];
  
  const effects = characteristics.effects;
  const effectsChain = [];
  
  effects.forEach(effect => {
    switch (effect) {
      case 'reverb':
        effectsChain.push('.room(0.3)');
        break;
      case 'delay':
        effectsChain.push('.delay(0.25)');
        break;
      case 'distortion':
        effectsChain.push('.distort(0.2)');
        break;
      case 'filter_sweep':
        effectsChain.push('.lpf(sine.range(400, 2000).slow(8))');
        break;
      case 'sidechain':
        effectsChain.push('.gain(sine.range(0.3, 1).fast(4))');
        break;
      case 'chorus':
        effectsChain.push('.chorus(0.3)');
        break;
    }
  });
  
  return effectsChain;
}

/**
 * Analyze prompt for genre-specific elements
 */
export function analyzeGenreElements(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  const detectedElements = {
    genres: [],
    instruments: [],
    effects: [],
    moods: [],
    tempoHints: []
  };
  
  // Detect genres
  for (const genre of Object.keys(GENRE_CHARACTERISTICS)) {
    if (lowerPrompt.includes(genre.replace('_', ' '))) {
      detectedElements.genres.push(genre);
    }
  }
  
  // Detect tempo hints
  if (lowerPrompt.includes('slow') || lowerPrompt.includes('chill')) {
    detectedElements.tempoHints.push('slow');
  }
  if (lowerPrompt.includes('fast') || lowerPrompt.includes('energetic')) {
    detectedElements.tempoHints.push('fast');
  }
  
  // Detect mood
  const moods = ['dark', 'bright', 'melancholic', 'uplifting', 'aggressive', 'peaceful'];
  moods.forEach(mood => {
    if (lowerPrompt.includes(mood)) {
      detectedElements.moods.push(mood);
    }
  });
  
  return detectedElements;
}
