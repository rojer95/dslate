import React from 'react';
import { DefaultPlugins } from './defaultPlugin';
import type { DSlatePlugin } from './typing';

export type ConfigContextType = {
  plugins: DSlatePlugin[];
  [key: string]: any;
};

const ConfigContext = React.createContext<ConfigContextType>({
  plugins: DefaultPlugins,
});

const { Consumer: ConfigConsumer, Provider: ConfigProvider } = ConfigContext;

export { ConfigConsumer, ConfigProvider };

export default ConfigContext;

export const useConfig = () => {
  return React.useContext(ConfigContext);
};
