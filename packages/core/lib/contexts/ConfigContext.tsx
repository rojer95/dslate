import React from 'react';
import defaultConfig from '../defaultConfig';
import type { DSlatePlugin, Locale, UploadRequestOption } from '../typing';
import { get } from '../utils';
import { usePlugin } from './PluginContext';

export type ConfigContextType = {
  plugins: DSlatePlugin[];
  locales: Locale[];
  locale: string;
  pluginProps?: Record<string, any>;
  iconScriptUrl?: string | string[];
  customUploadRequest?: (options: UploadRequestOption) => void;
  namespace?: string | symbol;
};

const ConfigContext = React.createContext<ConfigContextType>(defaultConfig);

const { Provider: ConfigProvider } = ConfigContext;

export { ConfigProvider };
export { ConfigContext };

export const useConfig = () => {
  return React.useContext(ConfigContext);
};

export const useMessage = () => {
  const { type } = usePlugin();
  const { locales, locale } = useConfig();

  return (id: string, defaultMessage: string) => {
    const targetLocale: Locale = locales.find((i) => i.locale === locale) ?? {
      locale: 'default',
    };
    return (
      get(targetLocale, `${type ? `${type}.${id}` : id}`, defaultMessage) ||
      defaultMessage
    );
  };
};
