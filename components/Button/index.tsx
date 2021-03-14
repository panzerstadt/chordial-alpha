import { useEffect, useRef, useState } from "react";
import Play from "./assets/play-button-arrowhead.svg";

export const PlayButton = ({ size = 20, onClick, isPlaying }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleHoverStart = () => setIsHovering(true);
  const handleHoverEnd = () => setIsHovering(false);

  const color = () => {
    if (isHovering || isPlaying) {
      return "rgba(59, 130, 246)";
    }
    return "black";
  };

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <Play
        fill={color()}
        onClick={onClick}
        x="0px"
        y="0px"
        width={size}
        height={size}
        viewBox="0 0 163.861 163.861"
      />
    </div>
  );
};
