import React, { useEffect, useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export const BpmSlider = ({ onValue }) => {
  const [value, setValue] = useState(80);

  useEffect(() => {
    onValue && onValue(value);
  }, [value]);
  return (
    <>
      <div className="w-36">
        <Slider value={value} min={1} max={200} onChange={setValue} />
      </div>
      <p className="pl-6">
        <small>{value} bpm</small>
      </p>
    </>
  );
};
