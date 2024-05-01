export interface ICandle {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  closeTime: number;
  volume: string; // unused but destructured
}

export interface KlineParams {
  interval?: string;
  limit?: string;
  symbol: string;
}

export interface AvgPriceStreamMessage {
  e: "avgPrice"; // Event type
  E: 1693907033000; // Event time
  s: "BTCUSDT"; // Symbol
  i: "5m"; // Average price interval
  w: "25776.86000000"; // Average price
  T: 1693907032213; // Last trade time
}

export interface AveragePriceParams {
  symbol: string;
}
export interface DepthParams {
  symbol: string;
  limit?: string;
}

export interface ApiResponseAvgPrice {
  mins: number; // Average price interval (in minutes)
  price: string; // Average price
  closeTime: number; // Last trade time
}

export type ActiveTab = "Candlestick Chart" | "Orders";

export interface BidAsk {
  price: string;
  qty: string;
}

export interface DepthMessage {
  /**
   * https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md#diff-depth-stream
   */
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  U: number; // First update ID in event
  u: number; // Final update ID in event
  b: [
    // Bids to be updated
    [
      string, // Price level to be updated
      string, // Quantity
    ],
  ];
  a: [
    // Asks to be updated
    [
      string, // Price level to be updated
      string, // Quantity
    ],
  ];
}
