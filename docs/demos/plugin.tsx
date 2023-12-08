/**
 * defaultShowCode: true
 */
import React, { useRef, useState } from 'react';
import type { Descendant } from 'slate';
import { Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';

import DSlate, {
  ConfigProvider,
  defaultConfig,
  DefaultPlugin,
  DefaultToolbar,
  DSlatePlugin,
  DSlateRef,
  Toolbar,
  usePlugin,
} from '@dslate/antd';

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
  toolbar: CustomPluginToolbar,
  props: {
    insertText: '插入文本文案',
    changeText: '转为特定文本文案',
  },
};

export default () => {
  const ref = useRef<DSlateRef>(null);

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
        plugins: [...Object.values<DSlatePlugin>(DefaultPlugin), CustomPlugin],
        pluginProps: {
          color: { colors: ['#000000', '#0969da', '#da3109'] },
          'background-color': { colors: ['#000000', '#0969da', '#da3109'] },
          img: {
            defaultWidth: '100%',
          },
          paragraph: {
            tag: 'p',
          },
        },
      }}
    >
      <DSlate
        ref={ref}
        value={value}
        onChange={setValue}
        toolbar={[...DefaultToolbar, 'custom']}
      />

      <br />
      <div>
        <button
          type="button"
          onClick={() => {
            console.log(value);
            console.log(
              ref.current?.serialize({
                children: value,
              }),
            );
          }}
        >
          转内容为HTML
        </button>
      </div>
    </ConfigProvider>
  );
};
