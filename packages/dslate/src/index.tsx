import React, { forwardRef } from 'react';
import type { DSlateRef } from '@dslate/core';
import { ConfigProvider, ConfigConsumer } from '@dslate/core';
import { ConfigProvider as AntdConfigProvider } from 'antd';

import DefaultPlugin from '@dslate/plugin';
import { mergeLocalteFromPlugins } from '@dslate/core';

import DSlate from './components/DSlate/';
import type { AntdStyleDSlateProps } from './typing';

import ZH_CN from './locale/zh_CN';
import EN_US from './locale/en_US';

export const DefaultLocales = [ZH_CN, EN_US];
export { DefaultPlugin };
export const DefaultToolbar = [
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
  'blockquote',
  'hr',
];
export default forwardRef<DSlateRef, AntdStyleDSlateProps>(
  ({ toolbar = DefaultToolbar, ...props }, ref) => {
    const { locale } = React.useContext(AntdConfigProvider.ConfigContext);
    return (
      <ConfigConsumer>
        {(value) => {
          const plugins =
            !value.plugins || value.plugins.length === 0
              ? Object.values(DefaultPlugin)
              : value.plugins;
          const locales = value.locales ? value.locales : DefaultLocales;
          return (
            <ConfigProvider
              value={{
                ...value,
                locales: mergeLocalteFromPlugins(locales, plugins),
                locale: locale?.locale ?? 'default',
                plugins,
                iconScriptUrl: '//at.alicdn.com/t/font_3062978_2vfzjar92f5.js',
              }}
            >
              <DSlate {...props} ref={ref} toolbar={toolbar} />
            </ConfigProvider>
          );
        }}
      </ConfigConsumer>
    );
  },
);
