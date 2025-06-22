// patterns.js - Modern Strudel v2.0 pattern library

export const RHYTHM_PATTERNS = {
  // Modern House patterns with drum banks
  houseClassic: {
    pattern: `setcpm(128/4)
stack(
  s("bd ~ ~ ~").bank("RolandTR909").gain(0.8),
  s("~ ~ sd ~").bank("RolandTR909").room(0.3),
  s("hh*8").bank("RolandTR909").gain(0.4).lpf(sine.range(800, 4000)),
  s("~ ~ ~ oh").bank("RolandTR909").gain(0.3).delay(0.125)
)`,
    description: 'Classic house pattern with TR-909',
    genre: ['house', 'deep house'],
    tempo: 128
  },
  
  houseProgressive: {
    pattern: `setcpm(130/4)
stack(
  s("bd ~ [~ bd] ~").bank("RolandTR909").gain(0.9),
  s("<hh*4 hh*8>").bank("RolandTR909").gain(sine.range(0.3, 0.6)).lpf(perlin.range(1000, 8000)),
  s("~ sd ~ [sd cp]").bank("RolandTR909").room(0.4),
  s("~ ~ ~ <oh ~ ~ cr>").bank("RolandTR909").gain(0.4)
)`,
    description: 'Progressive house with dynamic modulation',
    genre: ['house', 'progressive house'],
    tempo: 130
  },

  // Modern Techno patterns
  technoMinimal: {
    pattern: `setcpm(132/4)
stack(
  s("bd ~ ~ ~").bank("RolandTR909").gain(0.9).distort(0.1),
  s("~ ~ sd ~").bank("RolandTR909").gain(0.8).room(0.2),
  s("hh*16").bank("RolandTR909").gain(sine.range(0.2, 0.5)).hpf(perlin.range(4000, 12000)),
  s("~ ~ ~ [~ perc]").bank("RolandTR909").gain(0.4).delay(0.0625)
)`,
    description: 'Minimal techno with modulated hi-hats',
    genre: ['techno', 'minimal'],
    tempo: 132
  },
  
  technoDriving: {
    pattern: `setcpm(135/4)
stack(
  s("bd [~ bd] bd ~").bank("RolandTR909").gain(1.0).distort(0.2),
  s("~ ~ [sd cp] ~").bank("RolandTR909").gain(0.9).room(0.3),
  s("{hh*8, perc*4}").bank("RolandTR909").gain(0.5).hpf(sine.range(2000, 8000)),
  s("~ ~ ~ <~ ~ ~ cr>").bank("RolandTR909").gain(0.6)
)`,
    description: 'Driving techno with polyrhythmic elements',
    genre: ['techno', 'hard techno'],
    tempo: 135
  },

  // Hip-Hop patterns with TR-808
  hiphopClassic: {
    pattern: `setcpm(90/4)
stack(
  s("bd ~ sd ~").bank("RolandTR808").gain(0.9),
  s("hh*4").bank("RolandTR808").gain(0.3).pan(sine.range(-0.5, 0.5)),
  s("~ ~ ~ [~ cp]").bank("RolandTR808").gain(0.6),
  s("~ ~ ~ <~ ~ oh ~>").bank("RolandTR808").gain(0.4)
)`,
    description: 'Classic hip-hop pattern with TR-808',
    genre: ['hiphop', 'trap'],
    tempo: 90
  },
  
  trapModern: {
    pattern: `setcpm(140/4)
stack(
  s("bd ~ ~ [~ bd]").bank("RolandTR808").gain(1.0),
  s("~ sd ~ sd").bank("RolandTR808").gain(0.8).room(0.2),
  s("hh*8").bank("RolandTR808").gain(sine.range(0.2, 0.4)).hpf(6000),
  s("~ ~ ~ [oh ~ cp ~]").bank("RolandTR808").gain(0.5)
)`,
    description: 'Modern trap pattern with dynamic hi-hats',
    genre: ['trap', 'hiphop'],
    tempo: 140
  },

  // Jazz patterns with swing
  jazzSwing: {
    pattern: `setcpm(120/4)
stack(
  s("bd ~ sd ~").bank("AkaiLinn").swing(2).gain(0.7),
  s("hh*4").bank("AkaiLinn").gain(0.4).swing(2),
  s("~ ~ ~ [~ rd]").bank("AkaiLinn").gain(0.5).swing(2),
  s("~ ~ ~ <~ ~ ~ cr>").bank("AkaiLinn").gain(0.3)
)`,
    description: 'Jazz swing pattern with Linn drum',
    genre: ['jazz', 'swing'],
    tempo: 120
  },

  // Ambient patterns
  ambientSparse: {
    pattern: `setcpm(60/4)
stack(
  s("bd ~ ~ ~").bank("ViscoSpaceDrum").gain(0.4).room(0.9).slow(2),
  s("~ ~ ~ [~ perc]").bank("ViscoSpaceDrum").gain(sine.range(0.1, 0.3)).delay(0.5),
  s("click*4").bank("ViscoSpaceDrum").gain(perlin.range(0.05, 0.2)).lpf(2000),
  s("~ ~ ~ <~ ~ tick ~>").bank("ViscoSpaceDrum").gain(0.2).room(0.8)
)`,
    description: 'Sparse ambient rhythm with space drum',
    genre: ['ambient', 'experimental'],
    tempo: 60
  }
};

export const MELODIC_PATTERNS = {
  // Bass patterns with modern syntax
  houseBass: {
    pattern: `s("gm_synth_bass_1").n("<0 3 5 7>").scale("C3:minor").lpf(400).gain(0.8)`,
    description: 'House bass with scale and filtering',
    genre: ['house', 'techno']
  },
  
  technoBass: {
    pattern: `s("sawtooth").n("<c2 ~ eb2 f2>").scale("C2:minor").lpf(sine.range(200, 800)).gain(0.9).distort(0.1)`,
    description: 'Techno bass with modulated filter',
    genre: ['techno']
  },
  
  hiphopBass: {
    pattern: `s("gm_synth_bass_1").n("[0 ~ 3 5]").scale("C2:minor").lpf(300).gain(0.8)`,
    description: 'Hip-hop bass with subdivision',
    genre: ['hiphop', 'trap']
  },
  
  jazzBass: {
    pattern: `s("gm_acoustic_bass").n("<c2 f2 g2 c2>").scale("C2:major7").gain(0.7).swing(2)`,
    description: 'Jazz walking bass',
    genre: ['jazz']
  },

  // Lead patterns
  houseLead: {
    pattern: `s("gm_lead_2_sawtooth").n("<c4 eb4 g4 bb4>").scale("C4:minor").lpf(perlin.range(1000, 4000)).gain(0.6).delay(0.125)`,
    description: 'House lead with dynamic filtering',
    genre: ['house']
  },
  
  technoLead: {
    pattern: `s("square").n("<c5*2 ~ eb5 f5>").scale("C5:minor").lpf(sine.range(800, 3200)).gain(0.7).distort(0.15)`,
    description: 'Techno lead with distortion',
    genre: ['techno']
  },

  // Pad patterns
  ambientPad: {
    pattern: `s("gm_pad_1_new_age").n("<c3 f3 g3 bb3>").scale("C3:minor").slow(4).room(0.8).gain(sine.range(0.3, 0.6))`,
    description: 'Ambient pad with dynamic volume',
    genre: ['ambient', 'chillout']
  },
  
  housePad: {
    pattern: `s("gm_pad_2_warm").n("<c4 e4 g4>*2").scale("C4:major").room(0.5).lpf(2000).gain(0.4)`,
    description: 'House pad with warmth',
    genre: ['house', 'deep house']
  },

  // Melodic elements
  pianoHouse: {
    pattern: `s("gm_epiano1").n("<c3 eb3 g3 bb3>").scale("C3:minor").sometimes(rev).room(0.4).gain(0.6)`,
    description: 'House piano with occasional reverse',
    genre: ['house', 'deep house']
  },
  
  jazzPiano: {
    pattern: `s("piano").n("<c4 e4 g4 b4>").scale("C4:major7").sometimes(fast(2)).room(0.3).gain(0.7).swing(2)`,
    description: 'Jazz piano comping',
    genre: ['jazz']
  },
  
  ambientMelody: {
    pattern: `s("gm_xylophone").n("c5*4").scale("C5:pentatonic").gain(0.6).delay(0.375).room(0.6)`,
    description: 'Ambient xylophone melody',
    genre: ['ambient']
  }
};

export const COMPLETE_PATTERNS = {
  // Complete modern house track
  houseComplete: {
    pattern: `setcpm(128/4)
stack(
  // Drums
  s("bd ~ ~ ~").bank("RolandTR909").gain(0.8),
  s("~ ~ sd ~").bank("RolandTR909").room(0.3),
  s("hh*8").bank("RolandTR909").gain(0.4).lpf(sine.range(800, 4000)),
  
  // Bass
  s("gm_synth_bass_1").n("<0 3 5 7>").scale("C3:minor").lpf(400).gain(0.8),
  
  // Lead
  s("gm_lead_2_sawtooth").n("<c4 eb4 g4 bb4>").scale("C4:minor").lpf(perlin.range(1000, 4000)).gain(0.6).delay(0.125),
  
  // Pad
  s("gm_pad_2_warm").n("<c4 e4 g4>*2").scale("C4:major").room(0.5).lpf(2000).gain(0.4)
)`,
    description: 'Complete modern house track',
    genre: ['house'],
    complexity: 'advanced'
  },

  // Complete techno track
  technoComplete: {
    pattern: `setcpm(132/4)
stack(
  // Driving drums
  s("bd ~ ~ ~").bank("RolandTR909").gain(0.9).distort(0.1),
  s("~ ~ sd ~").bank("RolandTR909").gain(0.8).room(0.2),
  s("hh*16").bank("RolandTR909").gain(sine.range(0.2, 0.5)).hpf(perlin.range(4000, 12000)),
  
  // Acid bass
  s("sawtooth").n("<c2 ~ eb2 f2>").scale("C2:minor").lpf(sine.range(200, 800)).gain(0.9).distort(0.1),
  
  // Lead
  s("square").n("<c5*2 ~ eb5 f5>").scale("C5:minor").lpf(sine.range(800, 3200)).gain(0.7).distort(0.15),
  
  // Atmosphere
  s("space").slow(8).gain(0.2).room(0.9).lpf(1000)
)`,
    description: 'Complete techno track with acid elements',
    genre: ['techno'],
    complexity: 'advanced'
  },

  // Complete ambient piece
  ambientComplete: {
    pattern: `setcpm(60/4)
stack(
  // Sparse rhythm
  s("bd ~ ~ ~").bank("ViscoSpaceDrum").gain(0.4).room(0.9).slow(2),
  
  // Evolving pad
  s("gm_pad_1_new_age").n("<c3 f3 g3 bb3>").scale("C3:minor").slow(4).room(0.8).gain(sine.range(0.3, 0.6)),
  
  // Floating melody
  s("gm_xylophone").n("c5*4").scale("C5:pentatonic").gain(0.6).delay(0.375).room(0.6),
  
  // Texture
  s("wind").gain(sine.range(0.1, 0.3)).lpf(perlin.range(200, 800)),
  s("space").slow(8).gain(0.2).room(0.9)
)`,
    description: 'Complete ambient soundscape',
    genre: ['ambient'],
    complexity: 'intermediate'
  }
};

// Pattern utilities
export function getPatternsByGenre(genre) {
  const patterns = {};
  
  // Add rhythm patterns
  Object.entries(RHYTHM_PATTERNS).forEach(([key, pattern]) => {
    if (pattern.genre.includes(genre)) {
      patterns[`rhythm_${key}`] = pattern;
    }
  });
  
  // Add complete patterns
  Object.entries(COMPLETE_PATTERNS).forEach(([key, pattern]) => {
    if (pattern.genre === genre) {
      patterns[`complete_${key}`] = pattern;
    }
  });
  
  return patterns;
}

export function getPatternsByComplexity(complexity) {
  return Object.entries(COMPLETE_PATTERNS)
    .filter(([_, pattern]) => pattern.complexity === complexity)
    .reduce((acc, [key, pattern]) => {
      acc[key] = pattern;
      return acc;
    }, {});
}

export function combinePatterns(rhythmKey, melodicKey, effects = []) {
  const rhythm = RHYTHM_PATTERNS[rhythmKey];
  const melodic = MELODIC_PATTERNS[melodicKey];
  
  if (!rhythm || !melodic) return null;
  
  let combined = `stack(${rhythm.pattern}, ${melodic.pattern}.sound("piano"))`;
  
  // Apply effects
  effects.forEach(effect => {
    if (EFFECT_PATTERNS[effect]) {
      const effectParams = EFFECT_PATTERNS[effect];
      Object.entries(effectParams).forEach(([param, value]) => {
        combined += `.${param}(${value})`;
      });
    }
  });
  
  return combined;
}
