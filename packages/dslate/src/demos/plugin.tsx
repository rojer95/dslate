import React, { useState } from 'react';
import type { Descendant } from 'slate';
import { Range, Transforms } from 'slate';

import type { DSlatePlugin } from 'dslate';
import DSlate, { ConfigProvider, defaultConfig, Toolbar } from 'dslate';
import { useSlate } from 'slate-react';

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
        plugins: [...defaultConfig.plugins, CustomPlugin],
      }}
    >
      <DSlate value={value} onChange={setValue} />
    </ConfigProvider>
  );
};
