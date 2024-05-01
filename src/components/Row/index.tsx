import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  label?: string;
  value: string;
  color?: string;
}

export default function Row({ label, value, color }: Props) {
  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <Text style={[styles.value, { color: color || "grey" }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: "grey",
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
  },
});
