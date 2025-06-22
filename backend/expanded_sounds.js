// expanded_sounds.js - Comprehensive Strudel Sound Library
// Based on extensive research of Strudel ecosystem (June 2025)
// Includes: tidal-drum-machines, VCSL samples, dough-samples, and more

// MASSIVE DRUM MACHINE COLLECTION
const DRUM_MACHINES = {
  // Classic Roland Machines
  RolandTR808: {
    description: 'Legendary hip-hop/trap drum machine',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'rs', 'cb', 'cy', 'ma', 'cl'],
    genres: ['hip-hop', 'trap', 'electronic', 'pop']
  },
  RolandTR909: {
    description: 'House/techno classic drum machine',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'rs', 'cb', 'cy', 'rd', 'cr'],
    genres: ['house', 'techno', 'electronic', 'dance']
  },
  RolandTR707: {
    description: 'Digital drum machine with Latin sounds',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy', 'qu', 'ag', 'wh'],
    genres: ['latin', 'electronic', 'pop']
  },
  RolandTR606: {
    description: 'Compact analog drum machine',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cy'],
    genres: ['electronic', 'new-wave', 'synth-pop']
  },
  
  // Linn Machines
  LinnDrum: {
    description: 'Classic 80s drum machine',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy', 'cr', 'rd', 'sh'],
    genres: ['80s', 'pop', 'rock', 'new-wave']
  },
  Linn9000: {
    description: 'Advanced Linn drum machine/sampler',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy', 'cr', 'rd', 'lt', 'mt', 'ht'],
    genres: ['80s', 'pop', 'rock', 'funk']
  },
  
  // Akai MPC Series
  MPC60: {
    description: 'Hip-hop production legend',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy', 'cr', 'rd'],
    genres: ['hip-hop', 'r&b', 'jazz', 'electronic']
  },
  MPC3000: {
    description: 'Enhanced MPC with better sound quality',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy', 'cr', 'rd', 'lt', 'mt', 'ht'],
    genres: ['hip-hop', 'r&b', 'electronic', 'experimental']
  },
  
  // Oberheim
  OberheimDMX: {
    description: 'Early digital drum machine',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy', 'cr'],
    genres: ['early-electronic', 'new-wave', 'experimental']
  },
  
  // Sequential Circuits
  DrumTraks: {
    description: 'Sequential Circuits drum machine',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy', 'cr', 'rd'],
    genres: ['80s', 'electronic', 'pop']
  },
  
  // E-mu
  EmuSP12: {
    description: 'E-mu SP-12 sampling drum machine',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy', 'cr', 'rd'],
    genres: ['hip-hop', 'electronic', 'experimental']
  },
  EmuSP1200: {
    description: 'Classic hip-hop sampler',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy', 'cr', 'rd', 'lt', 'mt', 'ht'],
    genres: ['hip-hop', 'r&b', 'electronic']
  },
  
  // Alesis
  AlesisHR16: {
    description: 'Affordable digital drum machine',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy', 'cr', 'rd'],
    genres: ['rock', 'pop', 'electronic']
  },
  
  // Boss
  BossDR55: {
    description: 'Early Boss drum machine',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb'],
    genres: ['early-electronic', 'experimental']
  },
  BossDR110: {
    description: 'Compact Boss drum machine',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy'],
    genres: ['electronic', 'pop', 'new-wave']
  },
  
  // Yamaha
  YamahaDX5: {
    description: 'Yamaha DX5 drum sounds',
    sounds: ['bd', 'sd', 'hh', 'oh', 'cp', 'cb', 'cy', 'cr'],
    genres: ['80s', 'pop', 'electronic']
  }
};

// VCSL INSTRUMENT SAMPLES (Versilian Community Sample Library)
const VCSL_INSTRUMENTS = {
  // Percussion from VCSL
  ballwhistle: 'Ball whistle percussion',
  bassdrum1: 'Concert bass drum 1',
  bassdrum2: 'Concert bass drum 2',
  bongo: 'Bongo drums',
  conga: 'Conga drums',
  darbuka: 'Middle Eastern darbuka',
  framedrum: 'Frame drum',
  snare_modern: 'Modern snare drum',
  snare_hi: 'High-tuned snare',
  snare_low: 'Low-tuned snare',
  snare_rim: 'Snare rim shot',
  timpani: 'Orchestral timpani',
  timpani_roll: 'Timpani roll',
  timpani2: 'Second timpani',
  tom_mallet: 'Tom with mallet',
  tom_stick: 'Tom with stick',
  tom_rim: 'Tom rim shot',
  tom2_mallet: 'Second tom with mallet',
  tom2_stick: 'Second tom with stick',
  tom2_rim: 'Second tom rim shot',
  
  // String Instruments
  violin: 'Violin samples',
  viola: 'Viola samples',
  cello: 'Cello samples',
  doublebass: 'Double bass samples',
  guitar_acoustic: 'Acoustic guitar',
  guitar_electric: 'Electric guitar',
  guitar_nylon: 'Nylon string guitar',
  
  // Brass Instruments
  trumpet: 'Trumpet samples',
  trombone: 'Trombone samples',
  horn: 'French horn samples',
  tuba: 'Tuba samples',
  
  // Woodwinds
  flute: 'Flute samples',
  clarinet: 'Clarinet samples',
  oboe: 'Oboe samples',
  bassoon: 'Bassoon samples',
  saxophone: 'Saxophone samples',
  
  // Piano & Keys
  piano_grand: 'Grand piano',
  piano_upright: 'Upright piano',
  harpsichord: 'Harpsichord',
  organ: 'Pipe organ',
  
  // Ethnic Instruments
  sitar: 'Indian sitar',
  tabla_left: 'Tabla left hand',
  tabla_right: 'Tabla right hand',
  didgeridoo: 'Australian didgeridoo',
  gamelan: 'Indonesian gamelan',
  koto: 'Japanese koto',
  erhu: 'Chinese erhu'
};

// MELODIC SAMPLES (confirmed working in Strudel)
const MELODIC_SAMPLES = {
  // Piano & Keys
  piano: 'Acoustic piano samples',
  epiano: 'Electric piano',
  rhodes: 'Rhodes electric piano',
  wurli: 'Wurlitzer electric piano',
  
  // Synthesizers
  space: 'Spacey synthesizer sounds',
  wind: 'Wind synthesizer',
  metal: 'Metallic synthesizer',
  jazz: 'Jazz synthesizer sounds',
  
  // Organic Sounds
  crow: 'Crow/bird sounds',
  insect: 'Insect sounds',
  numbers: 'Spoken numbers',
  
  // Ambient & Texture
  pad: 'Synthesizer pads',
  string: 'String synthesizer',
  choir: 'Choir sounds',
  voice: 'Human voice samples',
  
  // Bass
  bass: 'Bass guitar samples',
  subbass: 'Sub bass sounds',
  
  // Leads
  lead: 'Lead synthesizer',
  arp: 'Arpeggiated sounds',
  pluck: 'Plucked sounds',
  
  // Effects & Textures
  noise: 'Noise textures',
  vinyl: 'Vinyl crackle',
  tape: 'Tape saturation',
  glitch: 'Glitch sounds',
  
  // World Instruments
  sitar: 'Indian sitar',
  tabla: 'Indian tabla',
  gamelan: 'Indonesian gamelan',
  koto: 'Japanese koto',
  didgeridoo: 'Australian didgeridoo',
  
  // Experimental
  granular: 'Granular synthesis',
  fm: 'FM synthesis sounds',
  am: 'AM synthesis sounds',
  ring: 'Ring modulation'
};

// COMPREHENSIVE GENRE MAPPING
const EXPANDED_GENRE_SOUNDS = {
  house: {
    drums: ['bd', 'sd', 'hh', 'oh', 'cp'],
    banks: ['RolandTR909', 'RolandTR808'],
    melodic: ['piano', 'epiano', 'rhodes', 'bass', 'pad', 'string'],
    effects: ['vinyl', 'tape']
  },
  techno: {
    drums: ['bd', 'sd', 'hh', 'oh', 'cp', 'cy'],
    banks: ['RolandTR909', 'RolandTR808', 'RolandTR707'],
    melodic: ['lead', 'bass', 'arp', 'noise', 'metal'],
    effects: ['glitch', 'granular']
  },
  'hip-hop': {
    drums: ['bd', 'sd', 'hh', 'oh', 'cp'],
    banks: ['RolandTR808', 'MPC60', 'MPC3000', 'EmuSP1200'],
    melodic: ['piano', 'epiano', 'bass', 'jazz', 'vinyl'],
    effects: ['vinyl', 'tape']
  },
  trap: {
    drums: ['bd', 'sd', 'hh', 'oh', 'cp'],
    banks: ['RolandTR808', 'MPC60'],
    melodic: ['lead', 'bass', 'pluck', 'pad'],
    effects: ['glitch', 'tape']
  },
  ambient: {
    drums: ['bd', 'sd', 'hh'],
    banks: ['RolandTR909'],
    melodic: ['space', 'wind', 'pad', 'choir', 'string', 'piano'],
    effects: ['granular', 'noise']
  },
  jazz: {
    drums: ['bd', 'sd', 'hh', 'oh', 'rd', 'cr'],
    banks: ['LinnDrum', 'AlesisHR16'],
    melodic: ['piano', 'epiano', 'rhodes', 'bass', 'jazz'],
    effects: ['vinyl', 'tape']
  },
  rock: {
    drums: ['bd', 'sd', 'hh', 'oh', 'cr', 'rd'],
    banks: ['LinnDrum', 'AlesisHR16', 'BossDR110'],
    melodic: ['guitar_electric', 'bass', 'piano'],
    effects: ['tape']
  },
  electronic: {
    drums: ['bd', 'sd', 'hh', 'oh', 'cp', 'cy'],
    banks: ['RolandTR909', 'RolandTR808', 'RolandTR707'],
    melodic: ['lead', 'bass', 'arp', 'pad', 'space', 'metal'],
    effects: ['glitch', 'granular', 'fm', 'am']
  },
  world: {
    drums: ['tabla', 'bongo', 'conga', 'djembe'],
    banks: ['RolandTR707'],
    melodic: ['sitar', 'gamelan', 'koto', 'didgeridoo'],
    effects: ['granular']
  },
  experimental: {
    drums: ['bd', 'sd', 'hh', 'perc'],
    banks: ['OberheimDMX', 'EmuSP12'],
    melodic: ['noise', 'granular', 'glitch', 'fm', 'am', 'ring'],
    effects: ['glitch', 'granular', 'ring']
  }
};

// UTILITY FUNCTIONS
function getAllDrumMachines() {
  return Object.keys(DRUM_MACHINES);
}

function getDrumMachinesByGenre(genre) {
  return Object.entries(DRUM_MACHINES)
    .filter(([name, machine]) => machine.genres.includes(genre))
    .map(([name]) => name);
}

function getSoundsForGenre(genre) {
  const genreData = EXPANDED_GENRE_SOUNDS[genre];
  if (!genreData) return null;
  
  return {
    drums: genreData.drums,
    banks: genreData.banks,
    melodic: genreData.melodic,
    effects: genreData.effects,
    allSounds: [
      ...genreData.drums,
      ...genreData.melodic,
      ...genreData.effects
    ]
  };
}

function getRandomSoundsForGenre(genre, count = 5) {
  const sounds = getSoundsForGenre(genre);
  if (!sounds) return [];
  
  const allSounds = sounds.allSounds;
  const shuffled = allSounds.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function isValidDrumMachine(bank) {
  return Object.keys(DRUM_MACHINES).includes(bank);
}

function isValidMelodicSample(sample) {
  return Object.keys(MELODIC_SAMPLES).includes(sample) || 
         Object.keys(VCSL_INSTRUMENTS).includes(sample);
}

// COMPREHENSIVE SOUND LIBRARY EXPORT
const COMPREHENSIVE_SOUND_LIBRARY = {
  drumMachines: DRUM_MACHINES,
  vcslInstruments: VCSL_INSTRUMENTS,
  melodicSamples: MELODIC_SAMPLES,
  genreSounds: EXPANDED_GENRE_SOUNDS,
  
  // Helper methods
  getAllSounds() {
    return {
      ...MELODIC_SAMPLES,
      ...VCSL_INSTRUMENTS
    };
  },
  
  getSoundsByCategory(category) {
    switch(category) {
      case 'drums':
        return Object.keys(DRUM_MACHINES);
      case 'melodic':
        return Object.keys(MELODIC_SAMPLES);
      case 'instruments':
        return Object.keys(VCSL_INSTRUMENTS);
      default:
        return [];
    }
  }
};

export {
  DRUM_MACHINES,
  VCSL_INSTRUMENTS,
  MELODIC_SAMPLES,
  EXPANDED_GENRE_SOUNDS,
  getAllDrumMachines,
  getDrumMachinesByGenre,
  getSoundsForGenre,
  getRandomSoundsForGenre,
  isValidDrumMachine,
  isValidMelodicSample,
  COMPREHENSIVE_SOUND_LIBRARY
};

export default COMPREHENSIVE_SOUND_LIBRARY;
