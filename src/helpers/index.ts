export function formatValue(value: number) {
  "worklet";
  return Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(value);
}
