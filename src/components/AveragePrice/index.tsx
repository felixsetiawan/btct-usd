import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { formatValue } from "@/helpers";
import useGetAveragePrice from "@/hooks/useGetAveragePrice";

interface Props {
  symbol: string;
}

export default function AveragePrice({ symbol }: Props) {
  const { data } = useGetAveragePrice({ symbol });

  if (!data) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.root}>
      <Text style={styles.label}>Average Price</Text>
      <Text style={styles.price}>{formatValue(Number(data))}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  label: {
    color: "grey",
  },
  price: {
    fontSize: 36,
  },
});
