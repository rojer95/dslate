---
title: 国际化
order: 3
nav: 文档
---

# 国际化

## 简介

DSlate 提供了插件国际化功能，目前插件内仅内置了中文与英文，如需要可自行扩展。

## 在 Ant 中使用

> 用法请展开代码查看

<code src="../demos/locale-antd.tsx"></code>

## 在 Semi 中使用

> 用法请展开代码查看

<code src="../demos/locale-semi.tsx"></code>

## 添加其他语言

目前 DSlate 插件只内置了两种语言，你可以通过 `ConfigProvider` 添加其他语言。DSlate 会合并`ConfigProvider`配置中的语言包和插件内置语言包 （ConfigProvider 配置的语言包 优先级高于 插件的内置语言包）

> 示例中芬兰语翻译自谷歌，仅做展示作用。用法请展开代码查看

<code src="../demos/locale-other.tsx"></code>

## 插件国际化

由于 DSlate 是一个插件化的编辑器，因此插件也需要支持国际化。当我们在开发插件时，可以通过参数 `locale` 来配置插件内部的国际化文案。通过`useMessage` hook 返回的辅助函数来读取文案。

### 参数 locale

插件中的参数 `locale` 是一个 `Locale` 数组，一个元素标识一个语言包，`Locale`定义如下：

```ts | pure
type Locale = {
  locale: string; // @dslate/core 导出 Locales的值 或者 你自己设定的值
  [index: string]: any; // key-value  格式的语言内容
};
```

插件国际化文案定义示例：

```tsx | pure
import type { DSlatePlugin } from "@dslate/core";
import { Locales } from "@dslate/core";

const Plugin: DSlatePlugin = {
  // ingore other ...
  locale: [
    {
      locale: Locales.zhCN,
      tooltip: "加粗",
    },
    {
      locale: Locales.enUS,
      tooltip: "加粗",
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
getMessage("tooltip", "加粗");
```

### 完整插件示例代码

```tsx | pure
import React from "react";
import { useSlate } from "slate-react";
import { Locales } from "@dslate/core";

import {
  Toolbar,
  IconFont,
  getTextProps,
  toggleTextProps,
  useMessage,
} from "@dslate/core";
import type { DSlatePlugin } from "@dslate/core";

const TYPE = "bold";

const Button = () => {
  const editor = useSlate();

  const getMessage = useMessage();

  return (
    <Toolbar.Button
      onClick={() => {
        toggleTextProps(editor, TYPE);
      }}
      active={getTextProps(editor, TYPE)}
      tooltip={getMessage("tooltip", "加粗")}
    >
      <IconFont type="icon-bold" />
    </Toolbar.Button>
  );
};

const BoldPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: "text",
  toolbar: <Button />,
  renderStyle: { fontWeight: "bold" },
  locale: [
    {
      locale: Locales.zhCN, // 中文
      tooltip: "加粗",
    },
    {
      locale: Locales.enUS, //  英文
      tooltip: "加粗",
    },
  ],
};

export { BoldPlugin };
```
