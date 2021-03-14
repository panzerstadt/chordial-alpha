import React, { useEffect, useState } from "react";
import { StepNoteType } from "reactronica";
import { KeyboardKeys } from "../../mappings/keys";

const assert = (asserted, message) => {
  if (!asserted) throw new Error(message);
};

export const makeChord = (keyboardData, keyboardIndex, selectedTriad) => {
  return [
    keyboardData[keyboardIndex]?.note || null,
    keyboardData[keyboardIndex + selectedTriad[0]]?.note || null,
    keyboardData[keyboardIndex + selectedTriad[0] + selectedTriad[1]]?.note ||
      null,
  ].filter(Boolean);
};

interface Props {
  keyboardIndex: number;
  keymap?: string;
  type?: "note" | "chord" | "chordProgression";
  keyboardData: KeyboardKeys;
  chordType?: "major" | "minor" | "diminished";
  onNote?: Function;
  isReady?: (ready: boolean) => void;
}

export const withKey = (ChordialInstrument: React.ElementType) => ({
  keyboardIndex,
  keymap,
  keyboardData,
  chordType,
  type = "note",
  onNote,
  isReady,
}: Props) => {
  const makeNotes = ({
    chordType,
    type,
    keyboardData,
    keyboardIndex,
  }): StepNoteType[] => {
    const triad = {
      major: [4, 3],
      minor: [3, 4],
      diminished: [3, 3],
    };

    if (type === "note") {
      return [keyboardData[keyboardIndex].note].map((n) => ({ name: n }));
    }
    if (type === "chord") {
      assert(
        chordType,
        'a key of type "chord" needs a chordType. select either major, minor, or diminished.'
      );
      const selectedTriad = triad[chordType];
      return makeChord(keyboardData, keyboardIndex, selectedTriad).map((n) => ({
        name: n,
      }));
    }
  };

  const [isPressed, setIsPressed] = useState(false);
  const handleKeypress = (e) => {
    if (e.code === keymap) {
      setIsPressed(e.type === "keydown");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeypress);
    window.addEventListener("keyup", handleKeypress);

    return () => {
      window.removeEventListener("keydown", handleKeypress);
      window.removeEventListener("keyup", handleKeypress);
    };
  }, []);

  const [notesToPlay, setNotes] = useState(null);
  useEffect(() => {
    if (isPressed) {
      const notes = makeNotes({
        chordType,
        type,
        keyboardData,
        keyboardIndex,
      });
      setNotes(notes);
      onNote && onNote(notes);
    } else {
      setNotes(null);
    }
  }, [isPressed]);

  return <ChordialInstrument notes={notesToPlay} isReady={isReady} />;

  //   const [isLoaded, setIsLoaded] = useState(false);
  //   useEffect(() => {
  //     return () => {
  //       setIsLoaded(false);
  //       isReady && isReady(false);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     if (!isLoaded && notesToPlay?.length) {
  //       console.warn("not ready. not playing note: ", notesToPlay);
  //     }
  //   }, [isLoaded, notesToPlay]);

  //   return (
  //     <Instrument
  //       key={"chordAnalogBrass"}
  //       type="sampler"
  //       samples={chordAnalogBassSamples}
  //       notes={isLoaded ? notesToPlay : null}
  //       onLoad={() => {
  //         setIsLoaded(true);
  //         isReady && isReady(true);
  //       }}
  //     />
  //   );

  //   return <Instrument type="synth" notes={notesToPlay} />;
};
