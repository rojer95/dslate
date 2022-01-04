import { ParagraphPlugin } from './paragraph';
import { BoldPlugin } from './bold';
import { DecorationPlugin } from './decoration';
import { ItalicPlugin } from './italic';
import { ColorPlugin } from './color';
import { ClearPlugin } from './clear';
import { DividerPlugin } from './divider';
import { HistoryPlugin } from './history';
import { BackgroundColorPlugin } from './background-color';
import { FontSizePlugin } from './font-size';
import { TextAlignPlugin } from './text-align';
import { ListPlugin } from './list';
import { TextIndentPlugin } from './indent';

const DefaultPlugin = () => {};

DefaultPlugin.HistoryPlugin = HistoryPlugin;
DefaultPlugin.ClearPlugin = ClearPlugin;
DefaultPlugin.ParagraphPlugin = ParagraphPlugin;
DefaultPlugin.BoldPlugin = BoldPlugin;
DefaultPlugin.DecorationPlugin = DecorationPlugin;
DefaultPlugin.ItalicPlugin = ItalicPlugin;
DefaultPlugin.ColorPlugin = ColorPlugin;
DefaultPlugin.DividerPlugin = DividerPlugin;
DefaultPlugin.BackgroundColorPlugin = BackgroundColorPlugin;
DefaultPlugin.FontSizePlugin = FontSizePlugin;
DefaultPlugin.TextAlignPlugin = TextAlignPlugin;
DefaultPlugin.ListPlugin = ListPlugin;
DefaultPlugin.TextIndentPlugin = TextIndentPlugin;

export default DefaultPlugin;
