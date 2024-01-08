import {
  ConfigContext,
  ConfigProvider,
  DSlateRef,
  mergeLocalteFromPlugins,
} from '@dslate/core';
import { forwardRef, useContext, useMemo } from 'react';

import { registerElement } from '@dslate/component';

import DefaultPlugin from '@dslate/plugin';

import {
  Divider,
  Input,
  InputNumber,
  Progress,
  Select,
  TextArea,
} from '@douyinfe/semi-ui';

import type { SemiStyleDSlateProps } from './typing';

import { Button, Popover, SemiEditor, Tooltip } from './components';
import EN_US from './locale/en_US';
import ZH_CN from './locale/zh_CN';

const NAMESPACE = Symbol('semi');

registerElement('tooltip', Tooltip, NAMESPACE);
registerElement('divider', Divider, NAMESPACE);
registerElement('progress', Progress, NAMESPACE);
registerElement('popover', Popover, NAMESPACE);
registerElement('input', Input, NAMESPACE);
registerElement('input-number', InputNumber, NAMESPACE);
registerElement('button', Button, NAMESPACE);
registerElement('select', Select, NAMESPACE);
registerElement('textarea', TextArea, NAMESPACE);

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

export default forwardRef<DSlateRef, SemiStyleDSlateProps>(
  ({ toolbar = DefaultToolbar, ...props }, ref) => {
    const context = useContext(ConfigContext);

    const mixContext = useMemo(() => {
      const plugins =
        !context.plugins || context.plugins.length === 0
          ? Object.values(DefaultPlugin)
          : context.plugins;
      const locales = context.locales ? context.locales : DefaultLocales;

      return {
        iconScriptUrl: '//at.alicdn.com/t/c/font_3062978_igshjiflyft.js',
        ...context,
        locales: mergeLocalteFromPlugins(locales, plugins),
        plugins,
        namespace: NAMESPACE,
      };
    }, [context]);

    return (
      <ConfigProvider value={mixContext}>
        <SemiEditor {...props} toolbar={toolbar} ref={ref} />
      </ConfigProvider>
    );
  },
);
