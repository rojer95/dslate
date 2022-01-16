---
title: 文件上传
order: 3
group:
  path: /
nav:
  path: /docs
---

# 文件上传

在编辑器使用过程中，会遇到需要上传图片/文件的过程，而由于文件上传方法方式存在普遍的差异性，所以需要自定义文件上传的功能。

## 全局配置

对于自定义上传，DSlate 提供了全局配置 `ConfigProvider` 。只需要在 `ConfigProvider` 中对 `customUploadRequest` 进行配置即可。

`customUploadRequest` 回调被调用时会传入一个`Object`，其中包含了以下参数：

| 参数       | 说明                                        | 类型                                 |
| ---------- | ------------------------------------------- | ------------------------------------ |
| onProgress | 上传进度反馈回调                            | `(event: { percent: number }): void` |
| onError    | 失败回调                                    | `(event: { percent: number }): void` |
| onSuccess  | 成功回调，`body`中需要含有`url`作为上传结果 | `(body: Object): void`               |
| file       | 上传进度反馈回调                            | `File`                               |

> 友情提示：注意区分 Antd 的 ConfigProvider 与 DSlate 的 ConfigProvider

## 演示

<code src="../demos/upload.tsx" />
