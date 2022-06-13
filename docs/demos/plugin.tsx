/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import type { Descendant } from 'slate';
import { Range, Transforms } from 'slate';

import DSlate, { DefaultToolbar, DefaultPlugin } from '@dslate/dslate';
import type { DSlatePlugin } from '@dslate/core';
import { usePlugin } from '@dslate/core';
import { ConfigProvider, defaultConfig } from '@dslate/core';
import { Toolbar } from '@dslate/component';
import { useSlate } from 'slate-react';

/**
 * 自定义一个插入文本的插件
 */

const CustomPluginToolbar = () => {
  const editor = useSlate();
  const { props } = usePlugin();

  const toggleText = () => {
    if (!editor.selection) return;
    if (Range.isExpanded(editor.selection)) {
      Transforms.delete(editor);
      Transforms.insertText(editor, props?.changeText);
    } else {
      Transforms.insertText(editor, props?.insertText);
    }
  };

  return <Toolbar.Button onClick={toggleText}>一段文本</Toolbar.Button>;
};

const CustomPlugin: DSlatePlugin = {
  type: 'custom',
  nodeType: 'tool',
  toolbar: <CustomPluginToolbar />,
  props: {
    insertText: '插入文本文案',
    changeText: '转为特定文本文案',
  },
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
        plugins: [...Object.values(DefaultPlugin), CustomPlugin],
        pluginProps: {
          color: { colors: ['#000000', '#0969da', '#da3109'] },
          'background-color': { colors: ['#000000', '#0969da', '#da3109'] },
          img: {
            defaultWidth: '100%',
          },
        },
      }}
    >
      <DSlate value={value} onChange={setValue} toolbar={[...DefaultToolbar, 'custom']} />
    </ConfigProvider>
  );
};
