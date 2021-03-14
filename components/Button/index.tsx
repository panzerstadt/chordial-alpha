import Play from "./assets/play-button-arrowhead.svg";
import Record from "./assets/record.svg";
import { withGenericButton } from "./withGenericButton";

export const PlayButton = withGenericButton(({ size, onClick, fill }) => (
  <Play
    fill={fill}
    onClick={onClick}
    x="0px"
    y="0px"
    width={size}
    height={size}
    viewBox="0 0 163.861 163.861"
  />
));

export const RecordButton = withGenericButton(({ size, onClick, fill }) => (
  <Record fill={fill} onClick={onClick} width={size} height={size} />
));
