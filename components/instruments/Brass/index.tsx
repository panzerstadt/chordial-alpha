import React, { useState, useEffect } from "react";
import { Instrument } from "reactronica";
import { chordAnalogBassSamples } from "../../../mappings/instruments";
import { withKey } from "../withKey";

export const BrassKey = withKey(({ isReady, notes }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    return () => {
      setIsLoaded(false);
      isReady && isReady(false);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded && notes?.length) {
      console.warn("not ready. not playing note: ", notes);
    }
  }, [isLoaded, notes]);

  return (
    <Instrument
      key={"chordAnalogBrass"}
      type="sampler"
      samples={chordAnalogBassSamples}
      notes={isLoaded ? notes : null}
      onLoad={() => {
        setIsLoaded(true);
        isReady && isReady(true);
      }}
    />
  );
});
