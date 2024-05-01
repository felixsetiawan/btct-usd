import { useEffect, useState } from "react";

import { formatValue } from "@/helpers";
import { getDepth } from "@/services";
import { WS } from "@/services/websocket";
import { DepthMessage } from "@/types";

interface Props {
  symbol: string;
  limit?: string;
}

interface Data {
  lastUpdateId: number;
  bids: Record<string, string>;
  asks: Record<string, string>;
}

interface RawData {
  /**
     * https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#order-book
     * {
        "lastUpdateId": 1027024,
        "bids": [
            [
            "4.00000000",     // PRICE
            "431.00000000"    // QTY
            ]
        ],
        "asks": [
            [
            "4.00000200",
            "12.00000000"
            ]
        ]
        }
     */
  lastUpdateId: number;
  bids: string[][];
  asks: string[][];
}

export default function useGetDepth({ symbol, limit }: Props) {
  const [data, setData] = useState<Data>();

  function depthMessageHandler(message: DepthMessage) {
    if (
      !data ||
      (message.e !== "depthUpdate" &&
        message.s !== symbol &&
        message.u <= data.lastUpdateId)
    ) {
      return;
    }
    setData((prev) => {
      if (!prev) {
        return prev;
      }
      message.b.forEach(([price, qty]) => {
        const formattedPrice = formatValue(Number(price));

        if (Number(qty) === 0) {
          delete prev.bids[formattedPrice];
        } else {
          prev.bids[formattedPrice] = qty;
        }
      });
      message.a.forEach(([price, qty]) => {
        const formattedPrice = formatValue(Number(price));

        if (Number(qty) === 0) {
          delete prev.asks[formattedPrice];
        } else {
          prev.asks[formattedPrice] = qty;
        }
      });

      return { ...prev };
    });
  }

  useEffect(() => {
    // historical data fetch
    getDepth({ symbol, limit }).then((response) => {
      response.json().then((rawData: RawData) => {
        const asks: Record<string, string> = {};
        const bids: Record<string, string> = {};
        rawData.asks.forEach(([price, qty]) => {
          const formattedPrice = formatValue(Number(price));
          asks[formattedPrice] = qty;
        });
        rawData.bids.forEach(([price, qty]) => {
          const formattedPrice = formatValue(Number(price));
          bids[formattedPrice] = qty;
        });
        setData({ lastUpdateId: rawData.lastUpdateId, asks, bids });
      });
    });
  }, [limit, symbol]);

  useEffect(() => {
    const streamName = [`${symbol.toLowerCase()}@depth`];
    WS.subscribe(streamName);
    WS.onMessage(depthMessageHandler);

    return () => {
      WS.unSubscribe(streamName);
    };
  }, [symbol]);

  return { data };
}
