import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";

import useGetDepth from "@/hooks/useGetDepth";
import { BidAsk } from "@/types";

interface Props {
  symbol: string;
  limit?: string;
  ws: WebSocket;
}

export default function Orders({ symbol, limit }: Props) {
  const { data } = useGetDepth({ symbol, limit });

  function keyExtractor(item: BidAsk, index: number) {
    return item.price;
  }

  function renderItem({ item }: ListRenderItemInfo<BidAsk>) {
    const { price, qty } = item;
    return (
      <View style={styles.row}>
        <Text style={[styles.column, styles.borderRight]}>{price}</Text>
        <Text style={[styles.column]}>{qty}</Text>
      </View>
    );
  }

  if (!data) {
    return <ActivityIndicator />;
  }

  const transformedAsks = Object.entries(data.asks).map(([key, value]) => {
    return { price: key, qty: value };
  });
  const transformedBids = Object.entries(data.bids).map(([key, value]) => {
    return { price: key, qty: value };
  });

  return (
    <View style={styles.root}>
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          <Text style={styles.tableHeading}>Market Jual</Text>
          <View style={styles.row}>
            <Text style={[styles.column, styles.borderRight]}>Harga</Text>
            <Text style={styles.column}>{symbol}</Text>
          </View>
          <FlatList
            data={transformedAsks}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            initialNumToRender={30}
          />
        </View>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          <Text style={styles.tableHeading}>Market Beli</Text>
          <View style={styles.row}>
            <Text style={[styles.column, styles.borderRight]}>Harga</Text>
            <Text style={styles.column}>{symbol}</Text>
          </View>
          <View />
          <FlatList
            data={transformedBids}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            initialNumToRender={30}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: 4,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
  tableContainer: {
    padding: 16,
    flex: 1,
  },
  table: {
    borderColor: "lightgrey",
    borderWidth: 2,
    borderBottomWidth: 0,
    flex: 1,
  },
  column: {
    flex: 1,
  },

  tableHeading: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
    fontSize: 18,
    fontWeight: "600",
  },

  borderRight: {
    borderRightColor: "lightgrey",
    borderRightWidth: 2,
  },

  borderLeft: {
    borderLeftColor: "lightgrey",
    borderLeftWidth: 2,
  },
});
