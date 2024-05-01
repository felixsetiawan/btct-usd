import { useEffect, useState } from "react";

import { getHistoricalKline } from "@/services";
import { ICandle } from "@/types";

interface Props {
  interval?: string;
  limit?: string;
  symbol: string;
}

export default function useGetHistoricalKline({
  interval,
  symbol,
  limit,
}: Props) {
  const [data, setData] = useState<ICandle[]>();

  useEffect(() => {
    getHistoricalKline({ interval, symbol, limit }).then((response) => {
      response
        .json()
        .then((rawData: number[][] | string[][]) => {
          const list = rawData.map((data) => {
            const [openTime, open, high, low, close, volume, closeTime] = data;
            return {
              openTime: Number(openTime),
              open: Number(open),
              high: Number(high),
              low: Number(low),
              close: Number(close),
              volume: String(volume),
              closeTime: Number(closeTime),
            };
          });
          setData(list);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }, [interval, limit, symbol]);

  return { data };
}
