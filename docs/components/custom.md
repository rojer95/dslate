---
title: 自定义风格组件
order: 1
group:
  title: 自定义风格组件
  path: /core
  order: 1
nav:
  path: /components
---

## 已内置的风格组件

DSlate 目前已经提供了了两种设计风格的封装，分别是 Antd 与 Semi。以上两种风格的编辑器开箱即用。

- [@dslate/dslate](https://github.com/rojer95/dslate/tree/master/packages/dslate) 对 Antd 风格的封装。
- [@dslate/semi](https://github.com/rojer95/dslate/tree/master/packages/semi) 对 Semi 风格的封装。

如果你需要自定义风格可以 `clone` 以上两种风格的源码进行改造

## 自定义风格用到的组件

### DSlate

DSlate 是对 Slate 不包含任何样式与排版的封装，核心功能是导入插件并提供基础提供服务。需要自己整合 Toolbar、Progress、Editable 组件。（必须使用`DSlate`包裹 `Toolbar、Progress、Editable、Counter`组件）

#### 引入方式

```tsx | pure
import DSlate from '@dslate/core';
```

#### 参数说明

| 参数      | 类型                            | 说明            |
| --------- | ------------------------------- | --------------- |
| value     | `Descendant[]`                  | 内容            |
| onChange  | `(value: Descendant[]) => void` | 内容改变事件    |
| prefixCls | `string`                        | class 样式 前缀 |

### Toolbar

工具栏组件

#### 引入方式

```tsx | pure
import { Toolbar, Progress, Editable, Counter } from '@dslate/component';
```

#### 参数说明

| 参数    | 类型       | 说明                                                                  |
| ------- | ---------- | --------------------------------------------------------------------- |
| toolbar | `string[]` | 插件 `type` 数组，用于指定插件在工具栏展示的顺序，`divider`作为分隔栏 |

### Progress

文件上传进度条

#### 引入方式

```tsx | pure
import { Progress } from '@dslate/component';
```

#### 参数说明

| 参数     | 类型            | 说明       |
| -------- | --------------- | ---------- |
| progress | `ProgressProps` | 进度条配置 |

#### ProgressProps

```tsx | pure
export interface ProgressProps {
  strokeWidth?: number;
  showInfo?: boolean;
}
```

### Editable

编辑区域组件。

#### 引入方式

```tsx | pure
import { Editable } from '@dslate/component';
```

#### 参数说明

| 参数        | 类型      | 说明         |
| ----------- | --------- | ------------ |
| disabled    | `boolean` | 是否禁止编辑 |
| placeholder | `string`  | 占位符       |

### Counter

DSlate 提供的文字计数组件。

#### 引入方式

```tsx | pure
import { Counter } from '@dslate/component';
```

#### 参数说明

| 参数      | 类型                                  | 说明               |
| --------- | ------------------------------------- | ------------------ |
| showCount | `boolean`                             | 是否显示字数计数器 |
| formatter | `(args: { count: number }) => string` | 字数文本格式化     |
