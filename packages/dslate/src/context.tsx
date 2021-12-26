import React from 'react';
import { DefaultPlugins } from './defaultPlugin';
import type { DSlateContextPropsType, DSlatePluginContext } from './typing';

const DSlateContext = React.createContext<DSlateContextPropsType>({
  plugins: DefaultPlugins,
});

const { Consumer: DSlateConsumer, Provider: DSlateProvider } = DSlateContext;

export { DSlateConsumer, DSlateProvider };
export default DSlateContext;

export const PluginContext = React.createContext<DSlatePluginContext>({
  visible: undefined,
  setVisible: () => {},
  getPrefixCls: () => '',
});

export const usePlugin = () => {
  return React.useContext(PluginContext);
};
