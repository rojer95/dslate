import React, { useCallback, useContext, useEffect, useState } from "react";
import { useConfig } from "./ConfigContext";

export type GlobalPluginContextType = {
  visibleKey?: React.Key;
  setVisibleKey?: (Key?: React.Key) => void;
  disabledTypes?: string[];
  enablePluginByType?: (key: string | string[]) => void;
  disablePluginByType?: (key: string | string[]) => void;
  setPercent?: (percent: number) => void;
  percent?: number;
  disabled?: boolean;
};

export type PluginContextType = {
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
  props?: Record<string, any>;
  uuid?: React.Key;
  type?: string;
  disabled?: boolean;
};

export const PluginUuidContext = React.createContext<{
  uuid?: React.Key;
  type?: string;
}>({
  uuid: undefined,
  type: undefined,
});

export const usePluginUuid = () => {
  return useContext(PluginUuidContext);
};

const GlobalPluginContext = React.createContext<GlobalPluginContextType>({});

export { GlobalPluginContext };

const { Consumer: GlobalPluginConsumer, Provider: GlobalPluginProvider } =
  GlobalPluginContext;

export { GlobalPluginConsumer, GlobalPluginProvider };

export const usePluginHelper = () => {
  return React.useContext(GlobalPluginContext);
};

export const usePlugin = (): PluginContextType => {
  const { uuid, type } = usePluginUuid();
  const { plugins, pluginProps } = useConfig();
  const globalPluginHelper = usePluginHelper();
  const { setVisibleKey, disabled: globalDisabled } = globalPluginHelper;

  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setVisible(globalPluginHelper.visibleKey === uuid);
  }, [globalPluginHelper.visibleKey, uuid]);

  useEffect(() => {
    setDisabled(
      globalDisabled ||
        (globalPluginHelper.disabledTypes?.includes(type as string) ?? false)
    );
  }, [globalPluginHelper.disabledTypes, type, globalDisabled]);

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
    [uuid]
  );

  return {
    visible,
    setVisible: toggleVisible,
    props: {
      ...(matchPlugin?.props ?? {}),
      ...(pluginProps?.[type ?? ""] ?? {}),
    },
    uuid,
    type: matchPlugin?.type,
    disabled,
  };
};
