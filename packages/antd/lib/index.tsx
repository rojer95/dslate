import type { DSlateRef } from '@dslate/core';
import {
  ConfigConsumer,
  ConfigProvider,
  mergeLocalteFromPlugins,
} from '@dslate/core';
import { forwardRef } from 'react';

import { registerElement } from '@dslate/component';

import DefaultPlugin from '@dslate/plugin';

import { InputNumber, Progress } from 'antd';
import {
  AntdEditor,
  Button,
  Divider,
  Input,
  Popover,
  Select,
  Tooltip,
} from './components';

import type { AntdStyleDSlateProps } from './typing';

import { Textarea } from './components/textarea';
import EN_US from './locale/en_US';
import ZH_CN from './locale/zh_CN';

registerElement('tooltip', Tooltip);
registerElement('divider', Divider);
registerElement('progress', Progress);
registerElement('popover', Popover);
registerElement('input', Input);
registerElement('input-number', InputNumber);
registerElement('button', Button);
registerElement('select', Select);
registerElement('textarea', Textarea);

export const DefaultLocales = [ZH_CN, EN_US];

export * from '@dslate/component';
export * from '@dslate/core';
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
  'line-height',
  'divider',
  'img',
  'link',
  'blockquote',
  'hr',
];

export default forwardRef<DSlateRef, AntdStyleDSlateProps>(
  ({ toolbar = DefaultToolbar, ...props }, ref) => {
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
                plugins,
                iconScriptUrl:
                  '//at.alicdn.com/t/c/font_3062978_igshjiflyft.js',
              }}
            >
              <AntdEditor {...props} toolbar={toolbar} ref={ref} />
            </ConfigProvider>
          );
        }}
      </ConfigConsumer>
    );
  },
);
