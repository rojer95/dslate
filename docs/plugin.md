---
title: 插件开发
order: 2
group:
  path: /
nav:
  path: /docs
---

## 插件开发

开发插件，只需要构建一个类型为`DSlatePlugin`的对象并导出到 DSlate 的`ConfigProvider` ，然后再 DSlate 组件的 在 `toolbar` 参数中配置插件的`type`值即可。详见下方[Demo 代码](#demo)

### DSlatePlugin 定义

DSlatePlugin 的 TypeScript 定义如下：

```tsx | pure
type DSlatePlugin = {
  uuid?: React.Key;
  type: string;
  nodeType: 'element' | 'text' | 'tool';
  isVoid?: ((element: DSlateCustomElement) => boolean) | boolean;
  isInline?: ((element: DSlateCustomElement) => boolean) | boolean;
  toolbar?: React.ReactNode;
  renderElement?: (props: RenderElementPropsWithStyle, editor: Editor) => JSX.Element;
  renderLeaf?: (props: RenderLeafPropsWithStyle, editor: Editor) => JSX.Element;
  renderStyle?:
    | ((node: Descendant, editor: Editor, props?: Record<string, any>) => CSSProperties)
    | CSSProperties;
  normalizeNode?: (entry: NodeEntry, editor: Editor, next: NormalizeNode) => void;
  withPlugin?: (editor: Editor) => Editor;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, editor: Editor) => void;
  isDefaultElement?: boolean;
  locale?: Locale[];
  props?: Record<string, any>;
};
```

### 参数说明

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| uuid | `React.Key` | 插件唯一标识 `不填会自动生成，一般情况下不需要填写` |
| type | `string` | 插件类型，作为插件渲染组件与样式等功能的识别的依据 |
| nodeType | `'element' \| 'text' \| 'tool'` | 节点类型，[详见下方](#nodetype) |
| isVoid | `((element: DSlateCustomElement) => boolean) \| boolean` | 是否为空元素 |
| isInline | `((element: DSlateCustomElement) => boolean) \| boolean` | 是否为行内元素 |
| toolbar | `React.ReactNode` | 在工具栏展示的组件 |
| renderElement | ` (props: RenderElementPropsWithStyle, editor: Editor) => JSX.Element` | Element 容器节点渲染方法 |
| renderLeaf | ` (props: RenderLeafPropsWithStyle, editor: Editor) => JSX.Element` | Text 叶子节点渲染方法 |
| renderStyle | ` ((node: Descendant, editor: Editor, props?: Record<string, any>) => CSSProperties) \| CSSProperties` | 样式生成策略 |
| normalizeNode | `(entry: NodeEntry, editor: Editor, next: NormalizeNode) => void ` | 规范化，[详见下方](#normalizenode-规范化) |
| withPlugin | `(editor: Editor) => Editor;` | 重写插件行为/添加辅助函数，同 Slate 用法 [详见](https://rain120.github.io/athena/zh/slate/concepts/06-editor.html#%E9%87%8D%E5%86%99%E8%A1%8C%E4%B8%BA-overriding-behaviors) |
| onKeyDown | `(e: React.KeyboardEvent<HTMLDivElement>, editor: Editor) => void;` | 键盘事件响应，同 Slate 用法 [详见](https://rain120.github.io/athena/zh/slate/walkthroughs/02-adding-event-handlers.html) |
| isDefaultElement | `boolean` | 是否为默认渲染组件 |
| locale | `Locale[]` | 国际化语言文案， 用法见 [国际化](/docs/locale#插件国际化) |
| props | `Record<string, any>` | 插件预设参数 [详见下方](#插件-props) |

### nodeType

- element：在自定义域中拥有语义的 Element 容器节点。(与 Slate 的 [Element 容器节点](https://rain120.github.io/athena/zh/slate/concepts/02-nodes.html) 概念相同)
- text: 包含文档文本的 Text 叶子节点。(与 Slate 的 [Text 叶子节点](https://rain120.github.io/athena/zh/slate/concepts/02-nodes.html) 概念相同)
- tool: 工具类型，不参与编辑器元素渲染，仅作为 Toolbar 的工具（比如：重做/撤销、清除样式等插件）

### normalizeNode 规范化

> 规范化 是确保你的编辑器的内容总是正确形式的办法。它与 验证 相似，只是它的任务是修复内容，使它重新有效，而不仅仅是判断内容是否有效。

DSlate 的 规范化用法与 同`Slate`的[规范化](https://rain120.github.io/athena/zh/slate/concepts/10-normalizing.html) 基本相同，区别在于多了一个`next`参数，你需要在没有规范化的时候显示的调用`next`函数，以保证接下来的规范化能够顺利执行。

如下为`link`插件的规范化，他将空内容的 link 直接解除包裹以达到移除 link 的效果：

```tsx | pure
const normalizeNode = (entry: NodeEntry, editor: Editor, next: NormalizeNode) => {
  const [node, path] = entry;
  if (node.type === 'link') {
    const isEmpty = Node.string(node).length === 0;
    if (isEmpty) {
      // 如果内容为空 且 类型为 link
      Transforms.unwrapNodes(editor, {
        at: path,
        match: (n) => !Editor.isEditor(n) && n.type === TYPE,
        split: true,
      });
      return;
    }
  }

  next(entry);
};
```

### 插件 props

在插件中可以预设一些自定义参数。在插件中通过 `usePlugin` hook 可以取出预设的 `props`。

```tsx | pure
const { props } = usePlugin();
```

初次之外，插件预设参数可以被 `ConfigProvider` 的 `pluginProps` 覆盖，因为使用者可以修改自定义插件的预设参数。  
例如`color`插件。预设了 `colors` 参数（颜色列表）。你可以通过上述方法，来覆盖预设的颜色。

```tsx | pure
type PluginProps = Record<string, any>;

const pluginProps: PluginProps = {
  // ↱ 对应插件的type值
  color: {
    // ↱ 文本颜色插件的预设颜色，是一个string[]
    colors: ['#000000', '#0969da', '#da3109'],
  },
};
```

## Demo

- 通过设置插件参数修改预设字体/背景颜色
- 自定义一个插入文本的插件

<code src="./demos/plugin.tsx" />
