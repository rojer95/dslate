import React, { useState } from 'react';
import type { Descendant } from 'slate';
import { Range, Transforms } from 'slate';

import type { DSlatePlugin } from 'dslate';
import DSlate, { ConfigProvider, defaultConfig, DefaultPlugin, Toolbar } from 'dslate';
import { useSlate } from 'slate-react';

/**
 * 通过复写 ColorPlugin 插件参数修改预设颜色
 */
const ColorPlugin = {
  ...DefaultPlugin.ColorPlugin,
  props: {
    colors: ['#000000', 'red', 'green'],
  },
};

/**
 * 自定义一个插入文本的插件
 */

const CustomPluginToolbar = () => {
  const editor = useSlate();

  const toggleText = () => {
    if (!editor.selection) return;
    if (Range.isExpanded(editor.selection)) {
      Transforms.delete(editor);
      Transforms.insertText(editor, '转为特定文本');
    } else {
      Transforms.insertText(editor, '插入文本');
    }
  };

  return <Toolbar.Button onClick={toggleText}>一段文本</Toolbar.Button>;
};
const CustomPlugin: DSlatePlugin = {
  type: 'custom',
  nodeType: 'tool',
  toolbar: <CustomPluginToolbar />,
};

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  return (
    <ConfigProvider
      value={{
        ...defaultConfig,
        plugins: [
          ...defaultConfig.plugins.filter((i) => i.type !== 'color'),
          ColorPlugin,
          CustomPlugin,
        ],
      }}
    >
      <DSlate value={value} onChange={setValue} />
    </ConfigProvider>
  );
};