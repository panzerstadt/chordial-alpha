import React from "react";
import { Instrument } from "reactronica";
import { withKey } from "../withKey";

export const SynthKey = withKey(({ notes }) => {
  return <Instrument key={"synth"} type="synth" notes={notes} />;
});
