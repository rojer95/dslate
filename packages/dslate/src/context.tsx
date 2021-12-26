import React from 'react';
import { DefaultPlugins } from './defaultPlugin';
import type { DSlateContextPropsType, DSlatePluginContext } from './typing';
import { getPluginContext } from './utils';

const DSlateContext = React.createContext<DSlateContextPropsType>({
  plugins: DefaultPlugins,
});

const { Consumer: DSlateConsumer, Provider: DSlateProvider } = DSlateContext;

export { DSlateConsumer, DSlateProvider };
export default DSlateContext;

export const PluginContext = React.createContext<DSlatePluginContext | null>(null);

export const usePlugin = (name: string) => {
  const context = React.useContext(PluginContext);
  return getPluginContext(name, context);
};
