---
title: ConfigProvider
order: 0
nav:
  title: 组件
  order: 1
---

## ConfigProvider

ConfigProvider 提供了全局定制化编辑器的功能，通过他可以向编辑器注入自定义插件、国际化语言包、自定义上传、自定义[iconfont](https://www.iconfont.cn/)URL、插件自定义参数

### 使用方法

```tsx | pure
import React, { useState } from "react";
import type { Descendant } from "slate";

import DSlate from "@dslate/dslate";
import { ConfigProvider, defaultConfig } from "@dslate/core";

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  return (
    <div>
      <ConfigProvider
        value={{
          ...defaultConfig,
          // ...在这里覆盖其他参数
        }}
      >
        <DSlate value={value} onChange={setValue} />
      </ConfigProvider>
    </div>
  );
};
```

### 参数 value 的 Typesscript 定义

```tsx | pure
export type ConfigContextType = {
  plugins: DSlatePlugin[]; // 插件
  locales: Locale[]; // 全局语言包
  locale: string; // 当前使用的语言
  pluginProps?: Record<string, any>; // 覆盖插件的props
  iconScriptUrl?: string | string[]; // 自定义 iconfont 的 url
  customUploadRequest?: (options: UploadRequestOption) => void; // 自定义上传
};
```
