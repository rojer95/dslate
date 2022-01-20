import React, { useState } from 'react';
import type { Descendant } from 'slate';
import { Range, Transforms } from 'slate';

import DSlate from '@dslate/dslate';
import type { DSlatePlugin } from '@dslate/core';
import { ConfigProvider, defaultConfig } from '@dslate/core';
import { Toolbar } from '@dslate/component';
import presetPlugin from '@dslate/plugin';
import { useSlate } from 'slate-react';

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
        plugins: [...Object.values(presetPlugin), CustomPlugin],
        pluginProps: {
          color: { colors: ['#000000', 'red', 'green'] },
          'background-color': { colors: ['#000000', 'red', 'green'] },
        },
      }}
    >
      <DSlate value={value} onChange={setValue} />
    </ConfigProvider>
  );
};
