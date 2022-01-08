import type { DSlatePlugin } from './typing';
import type { ConfigContextType } from './contexts/ConfigContext';

import zh_CN from './locale/zh_CN';
import en_US from './locale/en_US';

import DefaultPlugin from './plugins';

const defaultPlugins: DSlatePlugin[] = [
  DefaultPlugin.HistoryPlugin, // 撤销重做
  DefaultPlugin.ClearPlugin, // 清理格式
  DefaultPlugin.DividerPlugin, // 分割
  DefaultPlugin.ParagraphPlugin, // 段落&标题
  DefaultPlugin.FontSizePlugin, // 字号
  DefaultPlugin.BoldPlugin, // 加粗
  DefaultPlugin.ItalicPlugin, // 斜体
  DefaultPlugin.DecorationPlugin, // 下划线+删除线
  DefaultPlugin.ColorPlugin, // 字颜色
  DefaultPlugin.BackgroundColorPlugin, // 背景颜色
  DefaultPlugin.DividerPlugin, // 分割
  DefaultPlugin.TextAlignPlugin, // 对齐方式
  DefaultPlugin.ListItemPlugin, // 列表项
  DefaultPlugin.ListPlugin, // 列表
  DefaultPlugin.TodoListPlugin, // 选框列表
  DefaultPlugin.TextIndentPlugin, // 缩进
  DefaultPlugin.DividerPlugin, // 分割
  DefaultPlugin.ImgPlugin, //  图片
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
