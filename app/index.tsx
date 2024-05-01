import { useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import { WS } from "@/services/websocket";
import { ActiveTab } from "@/types";
import CandlestickChart from "@/views/CandlestickChart";
import Orders from "@/views/Orders";

const SYMBOL = "BTCTUSD";
const BASE_URL = "wss://stream.binance.com:9443/ws";

export default function Page() {
  const ws = useRef(new WebSocket(`${BASE_URL}`)).current;

  const [activeTab, setActiveTab] = useState<ActiveTab>("Candlestick Chart");

  function handleSelectTab(selectedTab: ActiveTab) {
    setActiveTab(selectedTab);
  }

  useEffect(() => {
    WS.init();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Header />
      <Tabs activeTab={activeTab} handleSelectTab={handleSelectTab} />
      {activeTab === "Candlestick Chart" && (
        <CandlestickChart symbol={SYMBOL} />
      )}
      {activeTab === "Orders" && <Orders symbol={SYMBOL} limit="100" ws={ws} />}
    </GestureHandlerRootView>
  );
}
