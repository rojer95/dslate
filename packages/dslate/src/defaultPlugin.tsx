import { UnderlinePlugin } from './plugins/underline';
import { PPlugin } from './plugins/p';
import { BoldPlugin } from './plugins/bold';
import { ThroughPlugin } from './plugins/through';
import { ItalicPlugin } from './plugins/italic';
import { DSlatePlugin } from './typing';
import { ColorPlugin } from './plugins/color';
import { ClearPlugin } from './plugins/clear';
import { DividerPlugin } from './plugins/divider';
import { RedoPlugin, UndoPlugin } from './plugins/history';

export const DefaultPlugins: DSlatePlugin[] = [
  UndoPlugin,
  RedoPlugin,
  ClearPlugin,
  DividerPlugin,
  PPlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  ThroughPlugin,
  ColorPlugin,
  DividerPlugin,
];
