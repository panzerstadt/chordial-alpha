import React, { useEffect, useState } from "react";
import { Instrument } from "reactronica";
import { KeyboardKeys } from "../../../pages";

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
  keymap: string;
  type?: "note" | "chord" | "chordProgression";
  keyboardData: KeyboardKeys;
  chordType?: "major" | "minor" | "diminished";
  //   degrees?: number[];
}

export const SynthKey: React.FC<Props> = ({
  keyboardIndex,
  keymap,
  keyboardData,
  chordType,
  type = "note",
  //   degrees,
}) => {
  const [pressed, setPressed] = useState(false);

  const handleKeypress = (e) => {
    if (e.code === keymap) {
      setPressed(e.type === "keydown");
      // console.log("notes being played: ", notes());
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

  const notes = (): string[] => {
    const triad = {
      major: [4, 3],
      minor: [3, 4],
      diminished: [3, 3],
    };

    if (type === "note") {
      return [keyboardData[keyboardIndex].note];
    }
    if (type === "chord") {
      assert(
        chordType,
        'a key of type "chord" needs a chordType. select either major, minor, or diminished.'
      );
      const selectedTriad = triad[chordType];
      return makeChord(keyboardData, keyboardIndex, selectedTriad);
    }
  };

  return (
    <Instrument
      type="synth"
      notes={pressed ? notes().map((n) => ({ name: n })) : null}
    />
  );
};
