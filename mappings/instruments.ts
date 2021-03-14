const generateSamplePath = (filepath: string[], note: string, ext: string) => ({
  [note]: [...filepath, note.replace("#", "s") + "." + ext].join("/"),
});

const rootFilepath = ["samples"];
const chordAnalogBrassFilepath = [...rootFilepath, "chordAnalogBass"];
export const chordAnalogBassSamples = {
  ...generateSamplePath(chordAnalogBrassFilepath, "C3", "mp3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "C#3", "mp3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "D3", "mp3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "D#3", "mp3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "E3", "mp3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "F3", "mp3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "F#3", "mp3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "G3", "mp3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "G#3", "mp3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "A3", "mp3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "A#3", "mp3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "B3", "mp3"),
};
