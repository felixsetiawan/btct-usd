import { StyleSheet, Text, View } from "react-native";

import StarIcon from "../Icon/StarIcon";

export default function Header() {
  return (
    <View style={styles.root}>
      <View style={styles.title}>
        <Text style={styles.text}>BTCTUSD</Text>
      </View>
      <View style={styles.iconRight}>
        <StarIcon color="black" size={24} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
  },
  title: {
    flex: 1,
    alignItems: "center",
  },
  iconLeft: {
    position: "absolute",
    left: 16,
  },
  iconRight: {
    position: "absolute",
    right: 16,
  },
});
