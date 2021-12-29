import type { DSlatePlugin } from './typing';

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

const DefaultPlugins: DSlatePlugin[] = [
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
];

export default DefaultPlugins;
