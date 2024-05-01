import { useDeferredValue, useEffect, useState } from "react";

import { getAveragePrice } from "@/services";
import { WS } from "@/services/websocket";
import { ApiResponseAvgPrice } from "@/types";

interface Props {
  symbol: string;
}

interface Data {
  time: number;
  price?: string;
}

interface Message {
  s: string;
  T: number;
  w: string;
  e: string;
}

export default function useGetAveragePrice({ symbol }: Props) {
  const [data, setData] = useState<Data>({ time: 0 });

  const deferredValue = useDeferredValue(data.price);

  function streamMessageHandler(message: Message) {
    if (message.e !== "avgPrice") {
      return;
    }
    if (message.s === symbol) {
      setData((prev) => {
        if (message.T > prev.time) {
          return { time: message.T, price: message.w };
        }
        return prev;
      });
    }
  }

  useEffect(() => {
    getAveragePrice({ symbol }).then((response) => {
      response.json().then((rawData: ApiResponseAvgPrice) => {
        setData((prev) => {
          if (rawData.closeTime > prev.time) {
            return { time: rawData.closeTime, price: rawData.price };
          }
          return prev;
        });
      });
    });
  }, [symbol]);

  useEffect(() => {
    const streamName = [`${symbol.toLowerCase()}@avgPrice`];
    WS.subscribe([`${symbol.toLowerCase()}@avgPrice`]);
    WS.onMessage(streamMessageHandler);

    return () => {
      WS.unSubscribe(streamName);
    };
  }, [symbol]);

  return { data: deferredValue };
}
