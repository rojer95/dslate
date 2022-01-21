---
title: 文件上传
order: 3
group:
  path: /
nav:
  path: /docs
---

# 文件上传

在编辑器使用过程中，会遇到需要上传文件的过程，而由于上传方法方式存在普遍的差异性，所以需要自定义文件上传的功能。

## 使用方法

对于自定义上传，DSlate 提供了一个 React 组件 [ConfigProvider](/components/config/config) 用于全局配置上传回调函数。

> Tip：注意区分 Antd 的 ConfigProvider 与 DSlate 的 ConfigProvider，这里使用的是 **DSlate 的 ConfigProvider**

### 回调函数

在全局配置了上传回调函数 `customUploadRequest` 后，在用户选择文件后 DSlate 会调用此函数。 如果没有配置上传回调函数，DSlate 则会按照默认方式，将文件转为 `base64` 文本串传递给渲染组件。

```tsx | pure
customUploadRequest: ({ onSuccess, onProgress, onError, file }) => {
  // 用户选择要上传的文件
  console.log(file);

  // 反馈上传进度到进度条
  onProgress?.({ percent: 10 });

  // 上传成功，返回一个包含url的object
  onSuccess?.({
    url: `...`,
  });

  // 上传失败
  onError?.(error);
};
```

### 回调参数说明

| 参数       | 说明                                        | 类型                                 |
| ---------- | ------------------------------------------- | ------------------------------------ |
| onProgress | 上传进度反馈回调                            | `(event: { percent: number }): void` |
| onError    | 失败回调                                    | `(e: Error): void`                   |
| onSuccess  | 成功回调，`body`中需要含有`url`作为上传结果 | `(body: Object): void`               |
| file       | 需要上传的文件                              | `File`                               |

## 演示

<code src="./demos/upload.tsx" showCode />
