import React, { Component, Fragment } from 'react';
import InstrumentAudio from './InstrumentAudio';

function isRegularKey(event) {
  return !event.ctrlKey && !event.metaKey && !event.shiftKey;
}

export default class Instrument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notesPlaying: [],
    };

    this.startPlayingNote = this.startPlayingNote.bind(this);
    this.stopPlayingNote = this.stopPlayingNote.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  getNoteFromKeyboardKey(keyboardKey) {
    const { keyboardMap } = this.props;
    return keyboardMap[keyboardKey]
      || keyboardMap[keyboardKey.toUpperCase()]
      || keyboardMap[keyboardKey.toLowerCase()];
  }

  handleKeyDown(event) {
    if (isRegularKey(event) && !event.repeat) {
      const { onKeyDown, getNoteAtIndex } = this.props;

      const note = this.getNoteFromKeyboardKey(event.key);
      if (note) {
        this.startPlayingNote(note);
      }

      if (onKeyDown) {
        onKeyDown(event.key, note, this.startPlayingNote, this.stopPlayingNote, getNoteAtIndex);
      }
    }
  }

  handleKeyUp(event) {
    if (isRegularKey(event)) {
      const { onKeyUp, getNoteAtIndex } = this.props;

      const note = this.getNoteFromKeyboardKey(event.key);
      if (note) {
        this.stopPlayingNote(note);
      }

      if (onKeyUp) {
        onKeyUp(event.key, note, this.startPlayingNote, this.stopPlayingNote, getNoteAtIndex);
      }
    }
  }

  startPlayingNote(note) {
    this.setState(({ notesPlaying }) => ({
      notesPlaying: [...notesPlaying, note],
    }));
  }

  stopPlayingNote(note) {
    this.setState(({ notesPlaying }) => ({
      notesPlaying: notesPlaying.filter(notePlaying => notePlaying !== note),
    }));
  }

  render() {
    const { renderInstrument, renderAudio: CustomInstrumentAudio } = this.props;
    const { notesPlaying } = this.state;
    const AudioComponent = CustomInstrumentAudio || InstrumentAudio;

    return (
      <Fragment>
        {renderInstrument({
          notesPlaying,
          onPlayNoteStart: this.startPlayingNote,
          onPlayNoteEnd: this.stopPlayingNote,
        })}
        <AudioComponent notes={notesPlaying} />
      </Fragment>
    );
  }
}

Instrument.defaultProps = {
  keyboardMap: {},
};
