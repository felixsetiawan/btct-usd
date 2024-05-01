import { StyleSheet } from "react-native";
import Svg, { Line as RNLine } from "react-native-svg";

interface Props {
  x: number;
  y: number;
}

export default function Line({ x, y }: Props) {
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <RNLine x1={0} y1={0} x2={x} y2={y} strokeWidth={2} stroke="#000" />
    </Svg>
  );
}
