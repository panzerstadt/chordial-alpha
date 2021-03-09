import React, { useEffect, useState } from "react";
import { Instrument } from "reactronica";

export const SynthKey = ({ note, keymap }) => {
  const [pressed, setPressed] = useState(false);

  const handleKeypress = (e) => {
    if (e.key === keymap) {
      setPressed(e.type === "keydown");
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

  return <Instrument type="synth" notes={pressed ? [{ name: note }] : null} />;
};
