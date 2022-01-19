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

DSlate 与 Ant Design 设计体系一脉相承，无缝对接 antd 项目。因此 DSlate 直接继承使用了 Ant Design 的国际化方案。

## 使用方法

在 Antd 中，提供了一个 React 组件 [ConfigProvider](https://ant-design.gitee.io/components/config-provider-cn/) 用于全局配置国际化文案。 DSlate 为了能够无缝接入 antd 项目，一并使用了 antd 提供的 `ConfigProvider` 来进行语言环境上下文的判断。 因此**无需单独配置**语言环境上下文。

> Tip：注意区分 Antd 的 ConfigProvider 与 DSlate 的 ConfigProvider，这里使用的是 **Antd 的 ConfigProvider**

## Demo

<code src="./demos/locale.tsx" />

## 插件国际化

由于 DSlate 是一个插件化的编辑器，因此插件也需要支持国际化。当我们在开发插件时，可以通过 `locale` 来配置插件内部的国际化文案。通过`useMessage` hook 返回的辅助函数来读取文案。

### locale

插件中的 `locale` 是一个 `Locale` 数组，每一个 Locale 必须为 antd 的语言包具有相同的 `locale` 值，见下面示例：

```tsx | pure
import type { DSlatePlugin } from '@dslate/core';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

const Plugin: DSlatePlugin = {
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
```

### useMessage

`useMessage` 是一个能够在插件内部直接读取文案的 `hook`。它返回了一个辅助函数 `getMessage` 能够自动根据上下文获取本插件的文案内容，函数定义如下：

`(id: string, defaultMessage: string) => string`

用法：

```tsx | pure
const getMessage = useMessage();
getMessage('tooltip', '加粗');
```

### 示例代码

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
