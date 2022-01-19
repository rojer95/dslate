import React from 'react';
import { ConfigProvider, ConfigConsumer } from '@dslate/core';
import { ConfigProvider as AntdConfigProvider } from 'antd';

import DefaultPlugin from '@dslate/plugin';
import { mergeLocalteFromPlugins } from '@dslate/core';

import DSlate from './components/DSlate/';
import type { AntdStyleDSlateProps } from './typing';

import ZH_CN from './locale/zh_CN';
import EN_US from './locale/en_US';

const locales = [ZH_CN, EN_US];

const DefaultToolbar = [
  'history',
  'clear',
  'divider',
  'paragraph',
  'font-size',
  'bold',
  'italic',
  'decoration',
  'color',
  'background-color',
  'divider',
  'text-align',
  'list',
  'todo-list',
  'text-indent',
  'divider',
  'img',
  'link',
];
export default ({ toolbar = DefaultToolbar, ...props }: AntdStyleDSlateProps) => {
  const { locale } = React.useContext(AntdConfigProvider.ConfigContext);
  return (
    <ConfigConsumer>
      {(value) => {
        const plugins =
          !value.plugins || value.plugins.length === 0
            ? Object.values(DefaultPlugin)
            : value.plugins;
        return (
          <ConfigProvider
            value={{
              ...value,
              locales: mergeLocalteFromPlugins(locales, plugins),
              locale: locale?.locale ?? 'default',
              plugins,
            }}
          >
            <DSlate {...props} toolbar={toolbar} />
          </ConfigProvider>
        );
      }}
    </ConfigConsumer>
  );
};
