---
title: 国际化
order: 3
group:
  path: /
nav:
  path: /docs
---

# 国际化

## 简介

DSlate 提供了插件国际化功能，目前插件内仅内置了中文与英文，如需要可自行扩展。

## 在 Ant 中使用

<code src="./demos/locale-ant.tsx" />

## 在 Semi 中使用

<code src="./demos/locale-semi.tsx" />

## 插件国际化

由于 DSlate 是一个插件化的编辑器，因此插件也需要支持国际化。当我们在开发插件时，可以通过参数 `locale` 来配置插件内部的国际化文案。通过`useMessage` hook 返回的辅助函数来读取文案。

### 参数 locale

插件中的参数 `locale` 是一个 `Locale` 数组，`Locale`定义如下：

```ts | pure
type Locale = {
  locale: string; // 必须与 antd 的语言包具有相同的 `locale` 值
  [index: string]: any;
};
```

插件国际化文案定义示例：

```tsx | pure
import type { DSlatePlugin } from '@dslate/core';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

const Plugin: DSlatePlugin = {
  // ingore other ...
  locale: [
    {
      locale: zhCN.locale, // 直接从 antd 的语言包读取值最稳妥
      tooltip: '加粗',
    },
    {
      locale: enUS.locale, // 直接从 antd 的语言包读取值最稳妥
      tooltip: '加粗',
    },
  ],
};
```

### useMessage hook

`useMessage` 是一个能够在插件内部直接读取文案的 `hook`。它返回了一个辅助函数 `getMessage` 能够自动根据上下文获取本插件的文案内容，函数定义如下：

`(id: string, defaultMessage: string) => string`

用法：

```tsx | pure
const getMessage = useMessage();
getMessage('tooltip', '加粗');
```

### 完整插件示例代码

```tsx | pure
import React from 'react';
import { useSlate } from 'slate-react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import { Toolbar, IconFont, getTextProps, toggleTextProps, useMessage } from '@dslate/core';
import type { DSlatePlugin } from '@dslate/core';

const TYPE = 'bold';

const Button = () => {
  const editor = useSlate();

  const getMessage = useMessage();

  return (
    <Toolbar.Button
      onClick={() => {
        toggleTextProps(editor, TYPE);
      }}
      active={getTextProps(editor, TYPE)}
      tooltip={getMessage('tooltip', '加粗')}
    >
      <IconFont type="icon-bold" />
    </Toolbar.Button>
  );
};

const BoldPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'text',
  toolbar: <Button />,
  renderStyle: { fontWeight: 'bold' },
  locale: [
    {
      locale: zhCN.locale, // 对应Antd的中文
      tooltip: '加粗',
    },
    {
      locale: enUS.locale, // 对应Antd的英文
      tooltip: '加粗',
    },
  ],
};

export { BoldPlugin };
```
