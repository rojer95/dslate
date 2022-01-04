import React from 'react';
import { usePluginUuid } from '../components/Toolbar/ToolbarItem';
import ConfigContext from './ConfigContext';

export type GlobalPluginContextType = {
  visibleKey?: React.Key;
  setVisibleKey?: (Key?: React.Key) => void;
  getPrefixCls?: (key: string) => string;
  disabled?: string[];
  enablePlugin?: (key: string | string[]) => void;
  disablePlugin?: (key: string | string[]) => void;
};

export type PluginContextType = {
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
  getPrefixCls?: (key: string) => string;
  enablePlugin?: (key: string | string[]) => void;
  disablePlugin?: (key: string | string[]) => void;
  props?: Record<string, any>;
  uuid?: React.Key;
  type?: string;
  disabled?: string[];
};

const GlobalPluginContext = React.createContext<GlobalPluginContextType>({});

export default GlobalPluginContext;

const { Consumer: GlobalPluginConsumer, Provider: GlobalPluginProvider } = GlobalPluginContext;

export { GlobalPluginConsumer, GlobalPluginProvider };

export const usePlugin = (): PluginContextType => {
  const uuid = usePluginUuid();
  const { plugins } = React.useContext(ConfigContext);
  const { visibleKey, setVisibleKey, getPrefixCls, enablePlugin, disablePlugin, disabled } =
    React.useContext(GlobalPluginContext);
  const matchPlugin = plugins?.find((plugin) => plugin.uuid === uuid);

  const setVisible = (v: boolean) => {
    if (v) {
      setVisibleKey?.(matchPlugin?.uuid);
    } else {
      setVisibleKey?.(undefined);
    }
  };

  return {
    visible: matchPlugin?.uuid === visibleKey,
    setVisible,
    props: matchPlugin?.props ?? {},
    getPrefixCls,
    enablePlugin,
    disablePlugin,
    uuid,
    type: matchPlugin?.type,
    disabled,
  };
};
