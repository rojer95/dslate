---
title: DSlate
order: 1
group:
  path: /dslate
nav:
  path: /components
---

## DSlate

Antd 风格的 Slate 编辑器，整合了 Toolbar、Progress、Editable 组件，同时继承了 Antd 的国际化方案。可以直接开箱即用

### 基础使用

```tsx | pure
import React, { useState } from 'react';
import type { Descendant } from 'slate';

import DSlate from '@dslate/dslate';

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  return <DSlate value={value} onChange={setValue} />;
};
```

### 参数说明

| 参数     | 类型                            | 说明         |
| -------- | ------------------------------- | ------------ |
| value    | `Descendant[]`                  | 内容         |
| onChange | `(value: Descendant[]) => void` | 内容改变事件 |
