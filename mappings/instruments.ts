const generateSamplePath = (filepath: string[], note: string, ext = "mp3") => ({
  [note]: [...filepath, note.replace("#", "s") + "." + ext].join("/"),
});

const rootFilepath = ["samples"];
const chordAnalogBrassFilepath = [...rootFilepath, "chordAnalogBrass"];
export const chordAnalogBrassSamples = {
  ...generateSamplePath(chordAnalogBrassFilepath, "C3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "C#3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "D3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "D#3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "E3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "F3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "F#3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "G3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "G#3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "A3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "A#3"),
  ...generateSamplePath(chordAnalogBrassFilepath, "B3"),
};
