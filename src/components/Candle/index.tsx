import { ScaleLinear } from "d3-scale";
import { Line, Rect } from "react-native-svg";

import { ICandle } from "@/types";

interface Props {
  candle: ICandle;
  index: number;
  width: number;
  scaleY: ScaleLinear<number, number>;
  scaleBody: ScaleLinear<number, number>;
}
const MARGIN = 2;

export default function Candle({
  candle,
  index,
  scaleY,
  scaleBody,
  width,
}: Props) {
  const x = index * width;
  const { close, open, high, low } = candle;

  const fill = close >= open ? "#4AFA9A" : "#E33F64";
  const max = Math.max(open, close);
  const min = Math.min(open, close);

  return (
    <>
      <Line
        x1={x + width / 2}
        y1={scaleY(low)}
        x2={x + width / 2}
        y2={scaleY(high)}
        stroke={fill}
        strokeWidth={1}
      />
      <Rect
        x={x + MARGIN}
        y={scaleY(max)}
        width={width - MARGIN * 2}
        height={scaleBody(max - min) || 1}
        fill={fill}
      />
    </>
  );
}
