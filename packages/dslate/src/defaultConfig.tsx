import type { DSlatePlugin } from './typing';
import type { ConfigContextType } from './ConfigContext';

import { UnderlinePlugin } from './plugins/underline';
import { ParagraphPlugin } from './plugins/paragraph';
import { BoldPlugin } from './plugins/bold';
import { ThroughPlugin } from './plugins/through';
import { ItalicPlugin } from './plugins/italic';
import { ColorPlugin } from './plugins/color';
import { ClearPlugin } from './plugins/clear';
import { DividerPlugin } from './plugins/divider';
import { RedoPlugin, UndoPlugin } from './plugins/history';
import { BackgroundColorPlugin } from './plugins/background-color';
import { FontSizePlugin } from './plugins/font-size';

import zh_CN from './locale/zh_CN';
import en_US from './locale/en_US';
import { TextAlignPlugin } from './plugins/text-align';
import { ListPlugin } from './plugins/list';

const defaultPlugins: DSlatePlugin[] = [
  UndoPlugin,
  RedoPlugin,
  ClearPlugin,
  DividerPlugin,
  ParagraphPlugin,
  FontSizePlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  ThroughPlugin,
  ColorPlugin,
  BackgroundColorPlugin,
  DividerPlugin,
  TextAlignPlugin,
  ListPlugin,
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
