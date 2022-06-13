---
title: Toolbar.Modal
order: 2
group:
  path: /plugin
nav:
  title: 组件
  path: /components
---

## Toolbar.Modal

工具栏-模态弹出组件，用于插件开发

### 用法

```tsx | pure
import React from 'react';

import { TwitterPicker } from 'react-color';
import locale from '../locale';

import type { DSlatePlugin } from '@dslate/core';

import { useSlate } from 'slate-react';
import { IconFont, Toolbar } from '@dslate/component';
import { useMessage, usePlugin, getTextProps, setTextProps } from '@dslate/core';
import type { Descendant } from 'slate';

const DEFAULT_COLOR = undefined;
const TYPE = 'color';

const renderStyle = (text: Descendant) => {
  if (text[TYPE]) {
    return { color: text[TYPE] as string };
  }
  return {};
};

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();
  const { props } = usePlugin();

  const handleChangeComplete = (value: any) => {
    setTextProps(editor, TYPE, value?.hex ?? DEFAULT_COLOR);
  };

  return (
    <Toolbar.Modal
      tooltip={getMessage('tooltip', '字体颜色')}
      overlay={
        <TwitterPicker
          color={getTextProps(editor, TYPE, DEFAULT_COLOR)}
          onChangeComplete={handleChangeComplete}
          colors={props?.colors}
          triangle="hide"
        />
      }
    >
      <IconFont
        style={{
          fontSize: '80%',
        }}
        type="icon-zitiyanse"
      />
    </Toolbar.Modal>
  );
};

const ColorPlugin: DSlatePlugin = {
  type: 'color',
  nodeType: 'text',
  toolbar: <ToolbarButton />,
  renderStyle,
  props: {
    colors: [
      '#000000',
      '#FF6900',
      '#FCB900',
      '#7BDCB5',
      '#00D084',
      '#8ED1FC',
      '#0693E3',
      '#EB144C',
      '#F78DA7',
      '#9900EF',
    ],
  },
  locale: [
    { locale: locale.zhCN, tooltip: '字体颜色' },
    { locale: locale.enUS, tooltip: 'font colore' },
  ],
};

export { ColorPlugin };
```

### 参数说明

| 参数    | 类型                                | 说明     |
| ------- | ----------------------------------- | -------- |
| overlay | `React.ReactNode \| RenderFunction` | 弹出层   |
| tooltip | `string`                            | 提示文本 |
