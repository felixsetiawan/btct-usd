import { StyleSheet, TextInput } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";

import { formatValue } from "@/helpers";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface Props {
  domain: [number, number];
  size: number;
  x: SharedValue<number>;
  y: SharedValue<number>;
  opacity: { opacity: number };
}
export default function Label({ domain, size, x, y, opacity }: Props) {
  const [max, min] = domain;

  const animatedProps = useAnimatedProps(() => {
    const text = interpolate(y.value, [0, size], [min, max]);
    return {
      text: formatValue(text),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  });

  const alignItems = useAnimatedStyle(() => {
    return {
      alignItems: x.value < size / 3 ? "flex-end" : "flex-start",
    };
  });

  return (
    <Animated.View
      style={[opacity, alignItems, { transform: [{ translateY: y }] }]}
    >
      <AnimatedTextInput
        editable={false}
        animatedProps={animatedProps}
        style={styles.text}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 8,
    top: "-50%",
    color: "black",
    backgroundColor: "lightgrey",
    borderRadius: 4,
    fontSize: 12,
  },
});
