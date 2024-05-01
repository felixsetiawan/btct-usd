import { AveragePriceParams, DepthParams, KlineParams } from "@/types";

const BASE_URL = "https://api.binance.com";
const KLINE_URL = "/api/v3/uiKlines";
const AVG_PRICE_URL = "/api/v3/avgPrice";

const DEPTH_URL = "/api/v3/depth";

export function getHistoricalKline({
  interval = "30m",
  symbol,
  limit = "20",
}: KlineParams) {
  const withParams = new URL(KLINE_URL, BASE_URL);
  withParams.searchParams.append("symbol", symbol);
  withParams.searchParams.append("interval", interval);
  withParams.searchParams.append("limit", limit);
  return fetch(withParams);
}

export function getAveragePrice({ symbol }: AveragePriceParams) {
  const withParams = new URL(AVG_PRICE_URL, BASE_URL);
  withParams.searchParams.append("symbol", symbol);

  return fetch(withParams);
}

export function getDepth({ symbol, limit = "100" }: DepthParams) {
  const withParams = new URL(DEPTH_URL, BASE_URL);
  withParams.searchParams.append("symbol", symbol);
  withParams.searchParams.append("limit", limit);
  return fetch(withParams);
}
