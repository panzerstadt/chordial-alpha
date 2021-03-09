import React, { useEffect, useState } from "react";
import { Instrument } from "reactronica";

interface Props {
  notes: string[];
  keymap: string;
}

export const SynthKey: React.FC<Props> = ({ notes, keymap }) => {
  const [pressed, setPressed] = useState(false);

  const handleKeypress = (e) => {
    if (e.code === keymap) {
      setPressed(e.type === "keydown");
      console.log("notes being played: ", notes);
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

  return (
    <Instrument
      type="synth"
      notes={pressed ? notes.map((n) => ({ name: n })) : null}
    />
  );
};
