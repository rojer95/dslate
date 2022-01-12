import React from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import defaultConfig from '../defaultConfig';
import type { DSlatePlugin, Locale } from '../typing';
import { get } from '../utils';
import { usePlugin } from './PluginContext';

export type ConfigContextType = {
  plugins: DSlatePlugin[];
  locales: Record<string, Locale>;
  defauleLocale: string;
  iconScriptUrl?: string | string[];
  uploadCustomRequest?: (options: UploadRequestOption) => void;
};

const ConfigContext = React.createContext<ConfigContextType>(defaultConfig);

const { Consumer: ConfigConsumer, Provider: ConfigProvider } = ConfigContext;

export { ConfigConsumer, ConfigProvider };

export default ConfigContext;

export const useConfig = () => {
  return React.useContext(ConfigContext);
};

export const useMessage = () => {
  const { type } = usePlugin();
  const { locales, defauleLocale } = useConfig();
  const { locale: antdLocale } = React.useContext(AntdConfigProvider.ConfigContext);

  const key =
    antdLocale && antdLocale.locale && locales[antdLocale.locale]
      ? antdLocale.locale
      : defauleLocale;

  return (id: string, defaultMessage: string) => {
    return (
      get(locales[key] ?? {}, `${type ? `${type}.${id}` : id}`, defaultMessage) || defaultMessage
    );
  };
};
