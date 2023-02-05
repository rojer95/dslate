import type { ConfigContextType } from "./contexts/ConfigContext";

const defaultConfig: ConfigContextType = {
  plugins: [],
  locales: [
    {
      locale: "default",
    },
  ],
  locale: "default",
};

export default defaultConfig;
