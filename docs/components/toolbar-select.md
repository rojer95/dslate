---
title: Toolbar.Select
order: 2
group:
  path: /toolbar
nav:
  path: /components
---

## Toolbar.Select

工具栏-下拉选择组件，用于插件开发

### 用法

```tsx | pure
import React from 'react';
import locale from '../locale';
import type { DSlatePlugin } from '@dslate/core';

import { useSlate } from 'slate-react';
import { useMessage, getBlockProps, setBlockProps } from '@dslate/core';
import { IconFont, Toolbar } from '@dslate/component';
import type { Descendant } from 'slate';

const DEFAULT_VALUE = 'left';
const TYPE = 'text-align';
const iconStyle = { opacity: 0.7, fontSize: '93%' };
const renderStyle = (text: Descendant) => {
  if (text[TYPE]) {
    return { textAlign: text?.[TYPE] };
  }
  return {};
};

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const onChange = (align: string) => {
    setBlockProps(editor, TYPE, align);
  };

  return (
    <Toolbar.Select<string>
      onChange={onChange}
      direction="horizontal"
      options={[
        {
          tooltip: getMessage('left', '左对齐'),
          label: <IconFont type="icon-alignleft" style={iconStyle} />,
          value: 'left',
        },
        {
          tooltip: getMessage('center', '居中对齐'),
          label: <IconFont type="icon-aligncenter" style={iconStyle} />,
          value: 'center',
        },
        {
          tooltip: getMessage('right', '右对齐'),
          label: <IconFont type="icon-alignright" style={iconStyle} />,
          value: 'right',
        },
        {
          tooltip: getMessage('justify', '两端对齐'),
          label: <IconFont type="icon-alignjustify" style={iconStyle} />,
          value: 'justify',
        },
      ]}
      tooltip={getMessage('tooltip', '对齐方式')}
      value={getBlockProps(editor, TYPE, DEFAULT_VALUE)}
    />
  );
};

const TextAlignPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: <ToolbarButton />,
  renderStyle,
  locale: [
    {
      locale: locale.zhCN,
      tooltip: '对齐方式',
      left: '左对齐',
      center: '居中对齐',
      right: '右对齐',
      justify: '两端对齐',
    },
    {
      locale: locale.enUS,
      tooltip: 'text align',
      left: 'align left',
      center: 'align center',
      right: 'align right',
      justify: 'align justify',
    },
  ],
};

export { TextAlignPlugin };
```

### 参数说明

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| options | ` { label: React.ReactNode; value: T; placeholder?: string; tooltip?: string }[]` | 选项 |
| value | `T` | 值 |
| onChange | ` (value: T) => void` | 改变事件 |
| direction | `'vertical' \| 'horizontal'` | 选项排列方向 |
| width | `number` | 宽度 |
| tooltip | `string` | 提示文本 |
| placeholder | `string` | 占位符 |
