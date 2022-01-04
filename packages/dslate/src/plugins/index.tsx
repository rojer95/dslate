import { UnderlinePlugin } from './underline';
import { ParagraphPlugin } from './paragraph';
import { BoldPlugin } from './bold';
import { ThroughPlugin } from './through';
import { ItalicPlugin } from './italic';
import { ColorPlugin } from './color';
import { ClearPlugin } from './clear';
import { DividerPlugin } from './divider';
import { HistoryPlugin } from './history';
import { BackgroundColorPlugin } from './background-color';
import { FontSizePlugin } from './font-size';
import { TextAlignPlugin } from './text-align';
import { ListPlugin } from './list';

import type { DSlatePlugin } from '../typing';

const DefaultPlugin: Record<string, DSlatePlugin> = {};

DefaultPlugin.HistoryPlugin = HistoryPlugin;
DefaultPlugin.ClearPlugin = ClearPlugin;

DefaultPlugin.UnderlinePlugin = UnderlinePlugin;
DefaultPlugin.ParagraphPlugin = ParagraphPlugin;
DefaultPlugin.BoldPlugin = BoldPlugin;
DefaultPlugin.ThroughPlugin = ThroughPlugin;
DefaultPlugin.ItalicPlugin = ItalicPlugin;
DefaultPlugin.ColorPlugin = ColorPlugin;
DefaultPlugin.DividerPlugin = DividerPlugin;
DefaultPlugin.BackgroundColorPlugin = BackgroundColorPlugin;
DefaultPlugin.FontSizePlugin = FontSizePlugin;
DefaultPlugin.TextAlignPlugin = TextAlignPlugin;
DefaultPlugin.ListPlugin = ListPlugin;

export default DefaultPlugin;
