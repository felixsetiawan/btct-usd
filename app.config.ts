import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "pintunya",
  name: "Pintunya",
  plugins: ["expo-router"],
});
