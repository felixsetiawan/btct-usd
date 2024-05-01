import { Pressable, StyleSheet, Text, View } from "react-native";

import { ActiveTab } from "@/types";

interface Props {
  activeTab: ActiveTab;
  handleSelectTab: (tab: ActiveTab) => void;
}

export default function Tabs({ activeTab, handleSelectTab }: Props) {
  return (
    <View style={styles.root}>
      <Pressable
        style={[
          styles.menuItem,
          activeTab === "Candlestick Chart" && styles.activeTab,
        ]}
        onPress={() => handleSelectTab("Candlestick Chart")}
      >
        <Text style={activeTab === "Candlestick Chart" && styles.activeText}>
          Candlestick Chart
        </Text>
      </Pressable>
      <Pressable
        style={[styles.menuItem, activeTab === "Orders" && styles.activeTab]}
        onPress={() => handleSelectTab("Orders")}
      >
        <Text style={activeTab === "Orders" && styles.activeText}>Orders</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  activeTab: {
    borderBottomColor: "blue",
    borderBottomWidth: 1,
  },
  activeText: {
    color: "blue",
  },
});
