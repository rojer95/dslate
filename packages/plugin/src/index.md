---
title: 内置插件
group:
  path: /default
  title: 内置插件
  order: 0
nav:
  title: 插件
  path: /plugins
  order: 2
---

## 内置插件

DSlate 内置的一些基础插件，已预先载入 `@dslate/dslate` 包内，无需单独载入。你可以根据以下提供的 `props` 参数自定义插件功能。  
如果你需要自行开发编辑器的样式布局，可以通过以下方式安装内置插件。

```shell
$ npm i @dslate/plugin --save
```

### paragraph

段落与标题插件

### history

撤销/重做插件

### clear

清除文本样式插件

### bold

加粗插件

### decoration

下划线+删除线插件

### italic

斜体

### color

字体颜色插件

#### props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| colors | `string[]` | `['#000000','#FF6900','#FCB900','#7BDCB5','#00D084','#8ED1FC','#0693E3','#EB144C','#F78DA7','#9900EF']` | 预设颜色 |

### background-color

背景颜色插件

#### props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| colors | `string[]` | `['transparent','#FF6900','#FCB900','#7BDCB5','#00D084','#8ED1FC','#0693E3','#EB144C','#F78DA7','#9900EF']` | 预设颜色 |

### font-size

字体大小插件

#### props

| 参数  | 类型       | 默认值                                             | 说明     |
| ----- | ---------- | -------------------------------------------------- | -------- |
| sizes | `number[]` | `[12, 13, 14, 15, 16, 19, 22, 24, 29, 32, 40, 48]` | 字体大小 |

### text-align

对齐方式插件

### list

列表插件插件

#### props

| 参数       | 类型       | 默认值                                      | 说明               |
| ---------- | ---------- | ------------------------------------------- | ------------------ |
| listStyles | `string[]` | `['decimal', 'lower-alpha', 'lower-roman']` | 有序列表的前缀样式 |

### todo-list

任务列表插件

### img

图片插件

#### props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| loadingStyle | `CSSProperties` | `{minHeight: 150,minWidth: 300}` | 图片加载未完成时，图片占位 style |
| maxWidth | `boolean` | `false` | serialize 时指定 max-width |
| defaultWidth | `undefined \| number \| string` | `undefined` | 图片嵌入后初始宽度 |

### link

超链接插件

### blockquote

引用插件

### hr

分隔符插件

#### props

| 参数       | 类型     | 默认值                | 说明         |
| ---------- | -------- | --------------------- | ------------ |
| color      | `string` | `rgba(0, 0, 0, 0.06)` | 颜色         |
| hoverColor | `string` | `#1890ff`             | 选中时的颜色 |
