import React from 'react';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import defaultConfig from '../defaultConfig';
import type { DSlatePlugin, Locale } from '../typing';
import { get } from '../utils';
import { usePlugin } from './PluginContext';

export type ConfigContextType = {
  plugins: DSlatePlugin[];
  locales: Locale[];
  locale: string;
  iconScriptUrl?: string | string[];
  customUploadRequest?: (options: UploadRequestOption) => void;
};

const ConfigContext = React.createContext<ConfigContextType>(defaultConfig);

const { Consumer: ConfigConsumer, Provider: ConfigProvider } = ConfigContext;

export { ConfigConsumer, ConfigProvider };

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
    return get(targetLocale, `${type ? `${type}.${id}` : id}`, defaultMessage) || defaultMessage;
  };
};
