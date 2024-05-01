import { scaleLinear } from "d3-scale";
import { Dimensions } from "react-native";
import { Svg } from "react-native-svg";

import Candle from "../Candle";

import { ICandle } from "@/types";
let { width: size } = Dimensions.get("window");
size -= 32;
export { size };

interface Props {
  candles: ICandle[];
  domain: [number, number];
}

export default function Chart({ candles, domain }: Props) {
  const width = size / candles.length;

  const scaleY = scaleLinear().domain(domain).range([size, 0]);
  const scaleBody = scaleLinear()
    .domain([0, Math.max(...domain) - Math.min(...domain)])
    .range([0, size]);

  return (
    <Svg width={size} height={size}>
      {candles.map((candle, index) => {
        return (
          <Candle
            key={candle.openTime}
            candle={candle}
            index={index}
            scaleY={scaleY}
            scaleBody={scaleBody}
            width={width}
          />
        );
      })}
    </Svg>
  );
}
