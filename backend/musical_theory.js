/**
 * Musical Theory Engine for Strudel + Claude
 * Provides harmonic analysis, chord progressions, and scale relationships
 */

// Core music theory data structures
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const INTERVALS = {
  unison: 0, minor2nd: 1, major2nd: 2, minor3rd: 3, major3rd: 4,
  perfect4th: 5, tritone: 6, perfect5th: 7, minor6th: 8, major6th: 9,
  minor7th: 10, major7th: 11, octave: 12
};

// Scale definitions with intervals
export const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],
  harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
  melodic_minor: [0, 2, 3, 5, 7, 9, 11],
  pentatonic_major: [0, 2, 4, 7, 9],
  pentatonic_minor: [0, 3, 5, 7, 10],
  blues: [0, 3, 5, 6, 7, 10],
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
};

// Chord definitions (intervals from root)
export const CHORDS = {
  // Triads
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  
  // Seventh chords
  major7: [0, 4, 7, 11],
  minor7: [0, 3, 7, 10],
  dominant7: [0, 4, 7, 10],
  diminished7: [0, 3, 6, 9],
  half_diminished7: [0, 3, 6, 10],
  minor_major7: [0, 3, 7, 11],
  
  // Extended chords
  major9: [0, 4, 7, 11, 14],
  minor9: [0, 3, 7, 10, 14],
  dominant9: [0, 4, 7, 10, 14],
  major11: [0, 4, 7, 11, 14, 17],
  minor11: [0, 3, 7, 10, 14, 17],
  major13: [0, 4, 7, 11, 14, 17, 21],
  minor13: [0, 3, 7, 10, 14, 17, 21]
};

// Common chord progressions by genre
export const CHORD_PROGRESSIONS = {
  jazz: [
    { name: 'ii-V-I', chords: ['minor7', 'dominant7', 'major7'], degrees: [2, 5, 1] },
    { name: 'vi-ii-V-I', chords: ['minor7', 'minor7', 'dominant7', 'major7'], degrees: [6, 2, 5, 1] },
    { name: 'I-vi-ii-V', chords: ['major7', 'minor7', 'minor7', 'dominant7'], degrees: [1, 6, 2, 5] },
    { name: 'iii-vi-ii-V', chords: ['minor7', 'minor7', 'minor7', 'dominant7'], degrees: [3, 6, 2, 5] }
  ],
  pop: [
    { name: 'vi-IV-I-V', chords: ['minor', 'major', 'major', 'major'], degrees: [6, 4, 1, 5] },
    { name: 'I-V-vi-IV', chords: ['major', 'major', 'minor', 'major'], degrees: [1, 5, 6, 4] },
    { name: 'I-vi-IV-V', chords: ['major', 'minor', 'major', 'major'], degrees: [1, 6, 4, 5] },
    { name: 'vi-V-IV-V', chords: ['minor', 'major', 'major', 'major'], degrees: [6, 5, 4, 5] }
  ],
  rock: [
    { name: 'I-bVII-IV', chords: ['major', 'major', 'major'], degrees: [1, 7, 4] },
    { name: 'vi-IV-I-V', chords: ['minor', 'major', 'major', 'major'], degrees: [6, 4, 1, 5] },
    { name: 'I-V-vi-IV', chords: ['major', 'major', 'minor', 'major'], degrees: [1, 5, 6, 4] }
  ],
  electronic: [
    { name: 'i-bVII-bVI-bVII', chords: ['minor', 'major', 'major', 'major'], degrees: [1, 7, 6, 7] },
    { name: 'i-iv-bVII-bVI', chords: ['minor', 'minor', 'major', 'major'], degrees: [1, 4, 7, 6] },
    { name: 'i-bVI-bVII', chords: ['minor', 'major', 'major'], degrees: [1, 6, 7] }
  ],
  ambient: [
    { name: 'I-iii-vi-IV', chords: ['major7', 'minor7', 'minor7', 'major7'], degrees: [1, 3, 6, 4] },
    { name: 'vi-IV-I-V', chords: ['minor7', 'major7', 'major7', 'major7'], degrees: [6, 4, 1, 5] },
    { name: 'I-V-vi', chords: ['major7', 'major7', 'minor7'], degrees: [1, 5, 6] }
  ],
  blues: [
    { name: '12-bar-blues', chords: ['dominant7', 'dominant7', 'dominant7', 'dominant7', 'dominant7', 'dominant7', 'dominant7', 'dominant7', 'dominant7', 'dominant7', 'dominant7', 'dominant7'], degrees: [1, 1, 1, 1, 4, 4, 1, 1, 5, 4, 1, 1] }
  ]
};

/**
 * Convert note name to MIDI number
 */
export function noteToMidi(note, octave = 4) {
  const noteIndex = NOTES.indexOf(note.toUpperCase());
  if (noteIndex === -1) throw new Error(`Invalid note: ${note}`);
  return (octave + 1) * 12 + noteIndex;
}

/**
 * Convert MIDI number to note name
 */
export function midiToNote(midi) {
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = midi % 12;
  return NOTES[noteIndex] + octave;
}

/**
 * Transpose a note by semitones
 */
export function transposeNote(note, semitones) {
  const midi = noteToMidi(note);
  return midiToNote(midi + semitones);
}

/**
 * Generate scale notes from root and scale type
 */
export function generateScale(root, scaleType, octave = 4) {
  const rootMidi = noteToMidi(root, octave);
  const intervals = SCALES[scaleType];
  if (!intervals) throw new Error(`Unknown scale: ${scaleType}`);
  
  return intervals.map(interval => midiToNote(rootMidi + interval));
}

/**
 * Generate chord notes from root and chord type
 */
export function generateChord(root, chordType, octave = 4) {
  const rootMidi = noteToMidi(root, octave);
  const intervals = CHORDS[chordType];
  if (!intervals) throw new Error(`Unknown chord: ${chordType}`);
  
  return intervals.map(interval => midiToNote(rootMidi + interval));
}

/**
 * Get chord progression in a key
 */
export function getChordProgression(key, scaleType, progressionName, genre = 'pop') {
  const progressions = CHORD_PROGRESSIONS[genre] || CHORD_PROGRESSIONS.pop;
  const progression = progressions.find(p => p.name === progressionName) || progressions[0];
  
  const scaleNotes = generateScale(key, scaleType);
  const chords = [];
  
  for (let i = 0; i < progression.degrees.length; i++) {
    const degree = progression.degrees[i] - 1; // Convert to 0-based
    const chordType = progression.chords[i];
    const rootNote = scaleNotes[degree % scaleNotes.length];
    
    chords.push({
      root: rootNote,
      type: chordType,
      notes: generateChord(rootNote.replace(/\d+$/, ''), chordType),
      degree: progression.degrees[i]
    });
  }
  
  return {
    name: progression.name,
    key,
    scale: scaleType,
    chords
  };
}

/**
 * Analyze harmonic content of a prompt
 */
export function analyzeHarmony(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Detect key signatures
  const keyMatches = lowerPrompt.match(/\b([a-g][#b]?)\s*(major|minor|maj|min)\b/i);
  let key = 'C';
  let scale = 'major';
  
  if (keyMatches) {
    key = keyMatches[1].toUpperCase();
    scale = keyMatches[2].toLowerCase().includes('min') ? 'minor' : 'major';
  }
  
  // Detect chord mentions
  const chordMatches = lowerPrompt.match(/\b([a-g][#b]?)(maj|min|major|minor|7|9|11|13|sus|dim|aug)?\b/gi);
  const detectedChords = chordMatches ? chordMatches.slice(0, 4) : [];
  
  // Detect genre for progression selection
  const genres = Object.keys(CHORD_PROGRESSIONS);
  const detectedGenre = genres.find(genre => lowerPrompt.includes(genre)) || 'pop';
  
  return {
    key,
    scale,
    detectedChords,
    genre: detectedGenre,
    suggestedProgression: CHORD_PROGRESSIONS[detectedGenre][0]
  };
}

/**
 * Get compatible scales for a given chord progression
 */
export function getCompatibleScales(chords) {
  const compatibleScales = [];
  
  for (const [scaleName, intervals] of Object.entries(SCALES)) {
    let isCompatible = true;
    
    for (const chord of chords) {
      // Check if chord tones fit within the scale
      const scaleNotes = generateScale(chord.root.replace(/\d+$/, ''), scaleName);
      const chordNotes = chord.notes.map(note => note.replace(/\d+$/, ''));
      
      const allNotesInScale = chordNotes.every(note => 
        scaleNotes.some(scaleNote => scaleNote.replace(/\d+$/, '') === note)
      );
      
      if (!allNotesInScale) {
        isCompatible = false;
        break;
      }
    }
    
    if (isCompatible) {
      compatibleScales.push(scaleName);
    }
  }
  
  return compatibleScales;
}

/**
 * Generate voice leading between chords
 */
export function generateVoiceLeading(chords) {
  const voicedChords = [];
  
  for (let i = 0; i < chords.length; i++) {
    const chord = chords[i];
    let voicing = [...chord.notes];
    
    if (i > 0) {
      // Apply voice leading principles
      const prevChord = voicedChords[i - 1];
      voicing = optimizeVoicing(voicing, prevChord);
    }
    
    voicedChords.push(voicing);
  }
  
  return voicedChords;
}

/**
 * Optimize chord voicing for smooth voice leading
 */
function optimizeVoicing(currentChord, previousChord) {
  // Simple voice leading: minimize movement between chords
  const optimized = [...currentChord];
  
  // This is a simplified implementation
  // In a full implementation, you'd consider inversions and voice crossing
  
  return optimized;
}

/**
 * Get tension and resolution suggestions
 */
export function getTensionResolution(progression) {
  const suggestions = [];
  
  for (let i = 0; i < progression.chords.length - 1; i++) {
    const current = progression.chords[i];
    const next = progression.chords[i + 1];
    
    // Identify common tension-resolution patterns
    if (current.degree === 5 && next.degree === 1) {
      suggestions.push({
        position: i,
        type: 'dominant_resolution',
        description: 'V-I resolution - strong cadence'
      });
    } else if (current.degree === 2 && next.degree === 5) {
      suggestions.push({
        position: i,
        type: 'predominant_dominant',
        description: 'ii-V movement - jazz standard'
      });
    }
  }
  
  return suggestions;
}
