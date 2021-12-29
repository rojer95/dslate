import React, { useState } from 'react';
import type { Descendant } from 'slate';
import { Range, Transforms } from 'slate';

import type { DSlatePlugin } from 'dslate';
import DSlate, { ConfigProvider, DefaultPlugins, ToolbarButton } from 'dslate';
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

  return <ToolbarButton onClick={toggleText}>一段文本</ToolbarButton>;
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
        plugins: [...DefaultPlugins, CustomPlugin],
      }}
    >
      <DSlate value={value} onChange={setValue} />
    </ConfigProvider>
  );
};
