const TONES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const OCTAVE_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default OCTAVE_NUMBERS.reduce((notes, octaveNumber) => {
  const notesInOctave = TONES.map(tone => `${tone}${octaveNumber}`);
  return [...notes, ...notesInOctave];
}, []);
