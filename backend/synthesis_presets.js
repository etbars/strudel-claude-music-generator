// synthesis_presets.js - Enhanced Realistic Instrument Presets
// Updated to use real samples + effects instead of pure synthesis
// Based on comprehensive Strudel sound library research (June 2025)

// ENHANCED GUITAR PRESETS - Using real samples + effects
export const GUITAR_PRESETS = {
  electric: {
    name: "Electric Guitar",
    code: `s("guitar_electric").lpf(sine.range(800,3000).slow(4)).distort(0.3).delay(0.125).gain(0.7)`,
    description: "Real electric guitar samples with dynamic filtering, distortion and delay",
    characteristics: ["authentic", "dynamic", "distorted", "spatial"]
  },
  acoustic: {
    name: "Acoustic Guitar",
    code: `s("guitar_acoustic").attack(0.01).decay(0.3).lpf(2000).room(0.4).gain(0.6)`,
    description: "Real acoustic guitar samples with natural attack and room ambience",
    characteristics: ["warm", "natural", "organic", "intimate"]
  },
  nylon: {
    name: "Nylon String Guitar",
    code: `s("guitar_nylon").attack(0.02).lpf(1800).room(0.3).chorus(0.2).gain(0.65)`,
    description: "Classical nylon string guitar with subtle chorus",
    characteristics: ["classical", "warm", "mellow", "refined"]
  },
  chords: {
    name: "Guitar Chords",
    code: `stack(s("guitar_electric").note("c3 e3 g3").lpf(1200), s("guitar_electric").note("c4 e4 g4").attack(0.02)).room(0.3)`,
    description: "Layered guitar chord voicing with bass and treble components",
    characteristics: ["harmonic", "layered", "full", "rich"]
  },
  lead: {
    name: "Lead Guitar",
    code: `s("guitar_electric").lpf(sine.range(1200,4000).slow(2)).distort(0.4).delay(0.25).feedback(0.3).gain(0.8)`,
    description: "Expressive lead guitar with dynamic filtering and delay feedback",
    characteristics: ["expressive", "cutting", "dynamic", "soaring"]
  }
};

// ENHANCED PIANO PRESETS - Using real piano samples
export const PIANO_PRESETS = {
  grand: {
    name: "Grand Piano",
    code: `s("piano_grand").attack(0.01).lpf(4000).room(0.5).gain(0.7)`,
    description: "Concert grand piano with natural room acoustics",
    characteristics: ["rich", "resonant", "classical", "expressive"]
  },
  upright: {
    name: "Upright Piano",
    code: `s("piano_upright").attack(0.02).lpf(3500).room(0.3).gain(0.65)`,
    description: "Intimate upright piano with close-mic character",
    characteristics: ["intimate", "warm", "personal", "vintage"]
  },
  electric: {
    name: "Electric Piano",
    code: `s("epiano").attack(0.01).lpf(2500).chorus(0.3).room(0.4).gain(0.6)`,
    description: "Classic electric piano with chorus and ambience",
    characteristics: ["vintage", "smooth", "soulful", "warm"]
  },
  rhodes: {
    name: "Rhodes Piano",
    code: `s("rhodes").attack(0.01).lpf(3000).chorus(0.4).delay(0.125).gain(0.65)`,
    description: "Iconic Rhodes electric piano with chorus and delay",
    characteristics: ["funky", "bell-like", "vintage", "smooth"]
  }
};

// ENHANCED BRASS PRESETS - Using real brass samples
export const BRASS_PRESETS = {
  trumpet: {
    name: "Trumpet",
    code: `s("trumpet").attack(0.05).lpf(3500).room(0.4).vibrato(4,0.01).gain(0.8)`,
    description: "Real trumpet samples with subtle vibrato and room",
    characteristics: ["bright", "cutting", "heroic", "expressive"]
  },
  trombone: {
    name: "Trombone",
    code: `s("trombone").attack(0.08).lpf(2500).room(0.5).gain(0.7)`,
    description: "Deep trombone with natural attack and ambience",
    characteristics: ["deep", "powerful", "smooth", "majestic"]
  },
  horn: {
    name: "French Horn",
    code: `s("horn").attack(0.1).lpf(2200).room(0.7).chorus(0.2).gain(0.6)`,
    description: "Warm French horn with orchestral room and subtle chorus",
    characteristics: ["warm", "mellow", "orchestral", "noble"]
  }
};

// ENHANCED STRING PRESETS - Using real string samples
export const STRING_PRESETS = {
  violin: {
    name: "Violin",
    code: `s("violin").attack(0.2).lpf(sine.range(1500,4000).slow(8)).vibrato(6,0.008).room(0.6).gain(0.5)`,
    description: "Expressive violin with dynamic filtering and realistic vibrato",
    characteristics: ["expressive", "lyrical", "dynamic", "emotional"]
  },
  viola: {
    name: "Viola",
    code: `s("viola").attack(0.25).lpf(sine.range(1200,3000).slow(8)).vibrato(5,0.01).room(0.7).gain(0.55)`,
    description: "Rich viola with slower attack and warm filtering",
    characteristics: ["rich", "warm", "mellow", "expressive"]
  },
  cello: {
    name: "Cello",
    code: `s("cello").attack(0.3).lpf(2000).room(0.8).chorus(0.2).gain(0.6)`,
    description: "Deep cello with slow attack and rich ambience",
    characteristics: ["deep", "rich", "resonant", "emotional"]
  },
  doublebass: {
    name: "Double Bass",
    code: `s("doublebass").attack(0.05).lpf(800).room(0.5).gain(0.7)`,
    description: "Punchy double bass with quick attack",
    characteristics: ["deep", "punchy", "rhythmic", "foundational"]
  },
  section: {
    name: "String Section",
    code: `stack(s("violin").note("c4").attack(0.4), s("viola").note("g3").attack(0.5), s("cello").note("c3").attack(0.6)).lpf(2500).room(0.9).chorus(0.3)`,
    description: "Layered string section with staggered attacks",
    characteristics: ["lush", "cinematic", "layered", "orchestral"]
  }
};

// ENHANCED WOODWIND PRESETS - Using real woodwind samples
export const WOODWIND_PRESETS = {
  flute: {
    name: "Flute",
    code: `s("flute").attack(0.03).lpf(4000).room(0.4).vibrato(3,0.005).gain(0.5)`,
    description: "Pure flute with gentle vibrato and natural room",
    characteristics: ["pure", "airy", "ethereal", "gentle"]
  },
  clarinet: {
    name: "Clarinet",
    code: `s("clarinet").attack(0.08).lpf(2800).room(0.5).gain(0.6)`,
    description: "Warm clarinet with natural woody character",
    characteristics: ["woody", "warm", "smooth", "expressive"]
  },
  oboe: {
    name: "Oboe",
    code: `s("oboe").attack(0.06).lpf(3200).room(0.4).vibrato(4,0.008).gain(0.65)`,
    description: "Distinctive oboe with characteristic vibrato",
    characteristics: ["nasal", "penetrating", "expressive", "distinctive"]
  },
  saxophone: {
    name: "Saxophone",
    code: `s("saxophone").attack(0.08).lpf(2500).vibrato(5,0.015).room(0.5).gain(0.7)`,
    description: "Smooth saxophone with expressive vibrato",
    characteristics: ["smooth", "jazzy", "expressive", "soulful"]
  }
};

// WORLD INSTRUMENT PRESETS - Using ethnic samples
export const WORLD_PRESETS = {
  sitar: {
    name: "Sitar",
    code: `s("sitar").attack(0.01).lpf(3000).delay(0.125).room(0.6).gain(0.6)`,
    description: "Indian sitar with natural resonance and delay",
    characteristics: ["exotic", "resonant", "melodic", "mystical"]
  },
  tabla: {
    name: "Tabla",
    code: `s("tabla").attack(0.01).lpf(2000).room(0.3).gain(0.8)`,
    description: "Indian tabla drums with crisp attack",
    characteristics: ["percussive", "rhythmic", "crisp", "traditional"]
  },
  gamelan: {
    name: "Gamelan",
    code: `s("gamelan").attack(0.02).lpf(4000).delay(0.25).room(0.8).gain(0.5)`,
    description: "Indonesian gamelan with metallic resonance",
    characteristics: ["metallic", "resonant", "exotic", "shimmering"]
  },
  koto: {
    name: "Koto",
    code: `s("koto").attack(0.01).lpf(3500).delay(0.125).room(0.5).gain(0.6)`,
    description: "Japanese koto with delicate plucked character",
    characteristics: ["delicate", "plucked", "traditional", "meditative"]
  },
  didgeridoo: {
    name: "Didgeridoo",
    code: `s("didgeridoo").attack(0.1).lpf(400).room(0.7).gain(0.8)`,
    description: "Australian didgeridoo with deep, droning character",
    characteristics: ["deep", "droning", "primal", "atmospheric"]
  }
};

// COMPREHENSIVE PRESET CATEGORIES - Updated with real samples
export const PRESET_CATEGORIES = {
  guitar: GUITAR_PRESETS,
  piano: PIANO_PRESETS,
  brass: BRASS_PRESETS,
  strings: STRING_PRESETS,
  woodwinds: WOODWIND_PRESETS,
  world: WORLD_PRESETS,
  
  // Additional categories
  drums: {
    acoustic: {
      name: "Acoustic Drums",
      code: `s("bd sd hh oh").bank("AlesisHR16")`,
      description: "Natural acoustic drum kit",
      characteristics: ["natural", "punchy", "organic", "dynamic"]
    },
    electronic: {
      name: "Electronic Drums",
      code: `s("bd sd hh oh").bank("RolandTR909")`,
      description: "Classic electronic drum machine",
      characteristics: ["electronic", "punchy", "precise", "danceable"]
    },
    vintage: {
      name: "Vintage Drums",
      code: `s("bd sd hh oh").bank("LinnDrum")`,
      description: "80s vintage drum machine",
      characteristics: ["vintage", "punchy", "nostalgic", "classic"]
    }
  },
  
  bass: {
    electric: {
      name: "Electric Bass",
      code: `s("bass").attack(0.01).lpf(800).gain(0.8)`,
      description: "Punchy electric bass guitar",
      characteristics: ["punchy", "deep", "rhythmic", "foundational"]
    },
    synth: {
      name: "Synth Bass",
      code: `s("subbass").attack(0.02).lpf(400).distort(0.1).gain(0.7)`,
      description: "Electronic synthesizer bass",
      characteristics: ["electronic", "deep", "powerful", "modern"]
    }
  }
};

// UTILITY FUNCTIONS
export function getPresetByInstrument(instrument) {
  const category = Object.keys(PRESET_CATEGORIES).find(cat => 
    instrument.toLowerCase().includes(cat) || 
    Object.keys(PRESET_CATEGORIES[cat]).some(preset => 
      instrument.toLowerCase().includes(preset)
    )
  );
  
  if (category) {
    return PRESET_CATEGORIES[category];
  }
  
  return null;
}

export function getAllPresets() {
  const allPresets = {};
  Object.keys(PRESET_CATEGORIES).forEach(category => {
    Object.keys(PRESET_CATEGORIES[category]).forEach(preset => {
      const key = `${category}_${preset}`;
      allPresets[key] = {
        ...PRESET_CATEGORIES[category][preset],
        category,
        preset
      };
    });
  });
  return allPresets;
}

export function getPresetCode(category, preset) {
  if (PRESET_CATEGORIES[category] && PRESET_CATEGORIES[category][preset]) {
    return PRESET_CATEGORIES[category][preset].code;
  }
  return null;
}

// SYNTHESIS GUIDELINES
export const SYNTHESIS_GUIDELINES = {
  attackRelease: "Always specify attack/release times for realistic instrument behavior",
  frequencyRanges: "Use appropriate frequency ranges for each instrument family", 
  layering: "Layer complementary waveforms for harmonic richness",
  effects: "Apply genre-appropriate effects and processing",
  voiceLeading: "Consider ensemble arrangements with proper voice leading",
  dynamics: "Use gain modulation for expressive dynamics",
  modulation: "Apply subtle modulation for organic, non-static sounds"
};

export default {
  GUITAR_PRESETS,
  PIANO_PRESETS,
  BRASS_PRESETS,
  STRING_PRESETS, 
  WOODWIND_PRESETS,
  WORLD_PRESETS,
  PRESET_CATEGORIES,
  getPresetByInstrument,
  getAllPresets,
  getPresetCode,
  SYNTHESIS_GUIDELINES
};
