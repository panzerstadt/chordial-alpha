import { useState } from "react";

interface Props {
  size?: number;
  onClick: Function;
  isActive: boolean;
  activeColor?: string;
}

export const withGenericButton = (Component: React.ElementType) => ({
  size = 20,
  onClick,
  isActive,
  activeColor = "rgba(59, 130, 246)",
}: Props) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleHoverStart = () => setIsHovering(true);
  const handleHoverEnd = () => setIsHovering(false);

  const color = () => {
    if (isHovering || isActive) {
      return activeColor;
    }
    return "black";
  };

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <Component size={size} onClick={onClick} fill={color()} />
    </div>
  );
};
