import type { ConfigContextType } from './contexts/ConfigContext';

import zh_CN from './locale/zh_CN';
import en_US from './locale/en_US';

const locales = {
  [zh_CN.locale]: zh_CN,
  [en_US.locale]: en_US,
};

const defaultConfig: ConfigContextType = {
  plugins: [],
  locales,
  defauleLocale: zh_CN.locale,
};

export default defaultConfig;
