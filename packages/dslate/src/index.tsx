import React from 'react';
import { ConfigProvider, ConfigConsumer } from '@dslate/core';
import presetPlugins from '@dslate/plugin';

import DSlate from './components/DSlate/';
import type { AntdStyleDSlateProps } from './typing';

const defaultPlugin = [
  presetPlugins.HistoryPlugin, // 撤销重做
  presetPlugins.ClearPlugin, // 清理格式
  presetPlugins.DividerPlugin, // 分割
  presetPlugins.ParagraphPlugin, // 段落&标题
  presetPlugins.FontSizePlugin, // 字号
  presetPlugins.BoldPlugin, // 加粗
  presetPlugins.ItalicPlugin, // 斜体
  presetPlugins.DecorationPlugin, // 下划线+删除线
  presetPlugins.ColorPlugin, // 字颜色
  presetPlugins.BackgroundColorPlugin, // 背景颜色
  presetPlugins.DividerPlugin, // 分割
  presetPlugins.TextAlignPlugin, // 对齐方式
  presetPlugins.ListItemPlugin, // 列表项
  presetPlugins.ListPlugin, // 列表
  presetPlugins.TodoListPlugin, // 选框列表
  presetPlugins.TextIndentPlugin, // 缩进
  presetPlugins.DividerPlugin, // 分割
  presetPlugins.ImgPlugin, //  图片
  presetPlugins.LinkPlugin, // 链接
];
export default (props: AntdStyleDSlateProps) => {
  return (
    <ConfigConsumer>
      {(value) => {
        const plugins = value.plugins.length === 0 ? defaultPlugin : value.plugins;
        return (
          <ConfigProvider
            value={{
              ...value,
              plugins,
            }}
          >
            <DSlate {...props} />
          </ConfigProvider>
        );
      }}
    </ConfigConsumer>
  );
};
