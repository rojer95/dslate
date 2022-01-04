import React, { useCallback, useEffect, useState } from 'react';
import { usePluginUuid } from '../components/Toolbar/ToolbarItem';
import ConfigContext from './ConfigContext';

export type GlobalPluginContextType = {
  visibleKey?: React.Key;
  setVisibleKey?: (Key?: React.Key) => void;
  getPrefixCls?: (key: string) => string;
  disabledTypes?: string[];
  enablePluginByType?: (key: string | string[]) => void;
  disablePluginByType?: (key: string | string[]) => void;
};

export type PluginContextType = {
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
  props?: Record<string, any>;
  uuid?: React.Key;
  type?: string;
  disabled?: boolean;
};

const GlobalPluginContext = React.createContext<GlobalPluginContextType>({});

export default GlobalPluginContext;

const { Consumer: GlobalPluginConsumer, Provider: GlobalPluginProvider } = GlobalPluginContext;

export { GlobalPluginConsumer, GlobalPluginProvider };

export const usePluginHelper = () => {
  return React.useContext(GlobalPluginContext);
};

export const usePlugin = (): PluginContextType => {
  const { uuid, type } = usePluginUuid();
  const { plugins } = React.useContext(ConfigContext);
  const globalPluginHelper = usePluginHelper();
  const { setVisibleKey } = globalPluginHelper;

  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setVisible(globalPluginHelper.visibleKey === uuid);
  }, [globalPluginHelper.visibleKey, uuid]);

  useEffect(() => {
    setDisabled(globalPluginHelper.disabledTypes?.includes(type as string) ?? false);
  }, [globalPluginHelper.disabledTypes, type]);

  const matchPlugin = plugins?.find((plugin) => plugin.uuid === uuid);

  const toggleVisible = useCallback(
    (v: boolean) => {
      if (v) {
        setVisibleKey?.(matchPlugin?.uuid);
      } else {
        setVisibleKey?.(undefined);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uuid],
  );

  return {
    visible,
    setVisible: toggleVisible,
    props: matchPlugin?.props ?? {},
    uuid,
    type: matchPlugin?.type,
    disabled,
  };
};
