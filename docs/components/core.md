---
title: Core
order: 1
group:
  title: 核心组件
  path: /core
  order: 1
nav:
  path: /components
---

## Core

DSlate 是对 Slate 不包含任何样式与排版的封装，主要对插件进行处理。需要自己整合 Toolbar、Progress、Editable 组件。适合需要自定义编辑器外观时使用。

### 用法

详情可见[@dslate/dslate](https://github.com/rojer95/dslate/blob/master/packages/dslate/src/components/DSlate/index.tsx)，这是对 Antd 风格的封装。

### 参数说明

| 参数      | 类型                            | 说明            |
| --------- | ------------------------------- | --------------- |
| value     | `Descendant[]`                  | 内容            |
| onChange  | `(value: Descendant[]) => void` | 内容改变事件    |
| prefixCls | `string`                        | class 样式 前缀 |
