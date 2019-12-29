const hasWindow = (typeof window !== 'undefined');

export default hasWindow
  ? window.AudioContext || window.webkitAudioContext
  : null;
