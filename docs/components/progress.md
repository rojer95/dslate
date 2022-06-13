---
title: Progress
order: 4
group:
  path: /core
nav:
  path: /components
---

# Progress

文件上传进度条

### 用法

详情可见[@dslate/dslate](https://github.com/rojer95/dslate/blob/master/packages/dslate/src/components/DSlate/index.tsx)，这是对 Antd 风格的封装。

### 参数说明

| 参数     | 类型            | 说明       |
| -------- | --------------- | ---------- |
| progress | `ProgressProps` | 进度条配置 |

### ProgressProps

```tsx | pure
export interface ProgressProps {
  strokeWidth?: number;
  showInfo?: boolean;
}
```
