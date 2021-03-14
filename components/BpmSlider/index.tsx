import React, { useEffect, useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export const BpmSlider = ({ onValue, bpm }) => {
  const [value, setValue] = useState(bpm);

  useEffect(() => {
    onValue && onValue(value);
  }, [value]);

  useEffect(() => {
    bpm && setValue(bpm);
  }, [bpm]);
  return (
    <div className="flex items-center">
      <div className="w-36">
        <Slider value={value} min={1} max={200} onChange={setValue} />
      </div>
      <p className="flex items-center pl-6">
        <small>{value} bpm</small>
      </p>
    </div>
  );
};
