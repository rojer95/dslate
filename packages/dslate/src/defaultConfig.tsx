import type { DSlatePlugin } from './typing';
import type { ConfigContextType } from './contexts/ConfigContext';

import zh_CN from './locale/zh_CN';
import en_US from './locale/en_US';

import DefaultPlugin from './plugins';

const defaultPlugins: DSlatePlugin[] = [
  DefaultPlugin.HistoryPlugin,
  DefaultPlugin.ClearPlugin,
  DefaultPlugin.DividerPlugin, // 分割
  DefaultPlugin.ParagraphPlugin,
  DefaultPlugin.FontSizePlugin,
  DefaultPlugin.BoldPlugin,
  DefaultPlugin.ItalicPlugin,
  DefaultPlugin.UnderlinePlugin,
  DefaultPlugin.ThroughPlugin,
  DefaultPlugin.ColorPlugin,
  DefaultPlugin.BackgroundColorPlugin,
  DefaultPlugin.DividerPlugin, // 分割
  DefaultPlugin.TextAlignPlugin,
  DefaultPlugin.ListPlugin,
];

const locales = {
  [zh_CN.locale]: zh_CN,
  [en_US.locale]: en_US,
};

const defaultConfig: ConfigContextType = {
  plugins: defaultPlugins,
  locales,
  defauleLocale: zh_CN.locale,
};

export default defaultConfig;
