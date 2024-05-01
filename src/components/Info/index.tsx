import dayjs from "dayjs";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";

import Row from "../Row";

import { formatValue } from "@/helpers";
import { ICandle } from "@/types";

interface Props {
  candles: ICandle[];
  x: SharedValue<number>;
  caliber: number;
}

export default function Info({ candles, x, caliber }: Props) {
  const [{ openTime, open, close, high, low }, setCandle] = useState(
    candles[0],
  );

  const diff = `${((close - open) * 100) / open}`;
  const change = close - open < 0 ? diff.substring(0, 5) : diff.substring(0, 4);

  useAnimatedReaction(
    () => {
      return x.value;
    },
    (currVal) => {
      const index = Math.floor(currVal / caliber);
      runOnJS(setCandle)(candles[index]);
    },
  );

  return (
    <View>
      <View style={styles.table}>
        <View style={styles.column}>
          <Row label="" value={dayjs(openTime).format("DD MMM YYYY HH:mm")} />
          <Row label="Open" value={formatValue(open)} />
          <Row label="Close" value={formatValue(close)} />
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Row
            label="30m Candle"
            value={`${change}%`}
            color={close - open >= 0 ? "#4AFA9A" : "#E33F64"}
          />
          <Row label="High" value={formatValue(high)} />
          <Row label="Low" value={formatValue(low)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    flexDirection: "row",
    padding: 16,
  },
  column: {
    flex: 1,
  },
  separator: {
    width: 16,
  },
});
