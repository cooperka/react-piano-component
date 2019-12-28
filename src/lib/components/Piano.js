import React, { Fragment } from 'react';
import Instrument from './Instrument';
import isAccidentalNote from '../utils/isAccidentalNote';
import getNotesBetween from '../utils/getNotesBetween';
import getKeyboardShortcutForNote from '../utils/getKeyboardShortcutsForNote';

export default function Piano({
  startNote, endNote, keyboardMap, renderPianoKey, pianoKeyProps, renderAudio, ...instrumentProps
}) {
  const notes = getNotesBetween(startNote, endNote);
  const getNoteAtIndex = index => notes[index];

  return (
    <Instrument
      instrument={'acoustic_grand_piano'}
      keyboardMap={keyboardMap}
      renderInstrument={({ notesPlaying, onPlayNoteStart, onPlayNoteEnd }) =>
        notes.map((note, index) => (
          <Fragment key={note}>
            {renderPianoKey({
              note,
              index,
              isNoteAccidental: isAccidentalNote(note),
              isNotePlaying: notesPlaying.includes(note),
              startPlayingNote: () => onPlayNoteStart(note),
              stopPlayingNote: () => onPlayNoteEnd(note),
              keyboardShortcuts: getKeyboardShortcutForNote(keyboardMap, note),
              ...pianoKeyProps,
            })}
          </Fragment>
        ))
      }
      renderAudio={renderAudio}
      getNoteAtIndex={getNoteAtIndex}
      {...instrumentProps}
    />
  );
}

Piano.defaultProps = {
  keyboardMap: {},
};
