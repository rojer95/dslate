import React from 'react';

export type PluginContextType = {
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
  visibleType?: string;
  setVisibleType?: (type?: string) => void;
  getPrefixCls?: (key: string) => string;
  disabled?: string[];
  enablePlugin?: (key: string | string[]) => void;
  disablePlugin?: (key: string | string[]) => void;
};

const PluginContext = React.createContext<PluginContextType>({});

export default PluginContext;

const { Consumer: DSlatePluginConsumer, Provider: DSlatePluginProvider } = PluginContext;

export { DSlatePluginConsumer, DSlatePluginProvider };

export const usePlugin = (type?: string) => {
  const context = React.useContext(PluginContext);

  return {
    ...context,
    visible: type === context.visibleType,
    setVisible: (v: boolean) => {
      if (v) {
        context.setVisibleType?.(type);
      } else {
        context.setVisibleType?.(undefined);
      }
    },
  } as Required<PluginContextType>;
};
