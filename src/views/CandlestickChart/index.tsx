import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import AveragePrice from "@/components/AveragePrice";
import Chart, { size } from "@/components/Chart";
import Info from "@/components/Info";
import Label from "@/components/Label";
import Line from "@/components/Line";
import useGetHistoricalKline from "@/hooks/useGetHistoricalKline";
import { ICandle } from "@/types";

interface Props {
  symbol: string;
}

export default function CandlestickChart({ symbol }: Props) {
  const getDomain = (rows: ICandle[]): [number, number] => {
    const values = rows.map(({ high, low }) => [high, low]).flat();
    return [Math.min(...values) - 10, Math.max(...values) + 10];
  };
  const { data } = useGetHistoricalKline({
    interval: "30m",
    limit: "20",
    symbol,
  });

  const state = useSharedValue(0);

  const x = useSharedValue(0);
  const y = useSharedValue(0);

  function handleUpdatePanGesture(
    event: GestureUpdateEvent<PanGestureHandlerEventPayload>,
  ) {
    const modulo = event.x % caliber;
    x.value = clamp(event.x - modulo + caliber / 2, 0, size - caliber / 2);
    y.value = clamp(event.y, 0, size);
    state.value = 1;
  }

  const panChart = Gesture.Pan()
    .minDistance(0)
    .activateAfterLongPress(50)
    .onUpdate(handleUpdatePanGesture)
    .onEnd(() => {
      state.value = 0;
    })
    .runOnJS(true);

  const animatedX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });
  const animatedY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: y.value }],
    };
  });

  const opacity = useAnimatedStyle(() => {
    return {
      opacity: state.value,
    };
  });

  const reverseOpacity = useAnimatedStyle(() => {
    return {
      opacity: 1 - state.value,
    };
  });

  if (!data) {
    return <ActivityIndicator />;
  }

  const caliber = size / data.length;
  const domain = getDomain(data);

  return (
    <>
      <View>
        <Animated.View style={[reverseOpacity, { position: "absolute" }]}>
          <AveragePrice symbol={symbol} />
        </Animated.View>
        <Animated.View style={opacity}>
          <Info candles={data} x={x} caliber={caliber} />
        </Animated.View>
      </View>
      <View style={styles.chartContainer}>
        <Chart candles={data} domain={domain} />
        <GestureDetector gesture={panChart}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              left: 16,
              right: 16,
            }}
          >
            <Animated.View
              style={[
                animatedY,
                opacity,
                {
                  ...StyleSheet.absoluteFillObject,
                },
              ]}
            >
              <Line x={size} y={0} />
            </Animated.View>
            <Animated.View
              style={[
                opacity,
                {
                  ...StyleSheet.absoluteFillObject,
                },
                animatedX,
              ]}
            >
              <Line x={0} y={size} />
            </Animated.View>
            <Label x={x} y={y} size={size} domain={domain} opacity={opacity} />
          </Animated.View>
        </GestureDetector>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
});
