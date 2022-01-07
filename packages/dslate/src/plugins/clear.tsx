import React from 'react';
import { Editor, Text, Transforms } from 'slate';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import { useSlate } from 'slate-react';
import IconFont from '../components/IconFont';
import { ToolbarButton } from '../components/Toolbar';
import type { DSlatePlugin } from '../typing';
import { useMessage } from '../contexts/ConfigContext';

const clearStyle = (editor: Editor) => {
  if (!editor.selection) return;

  const texts = Array.from(
    Editor.nodes(editor, {
      match: (n) => Text.isText(n) && Object.keys(n).length > 1,
    }),
  );

  let clearMarks = [];
  for (const text of texts) {
    clearMarks.push(...Object.keys(text[0]).filter((i) => !['text'].includes(i)));
  }

  clearMarks = Array.from(new Set(clearMarks));

  if (clearMarks.length > 0) {
    Transforms.unsetNodes(editor, clearMarks, {
      match: Text.isText,
      split: true,
    });
  }
};

const Toolbar = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  return (
    <ToolbarButton
      onClick={() => {
        clearStyle(editor);
      }}
      tooltip={getMessage('tooltip', '清理格式')}
    >
      <IconFont type="icon-empty" />
    </ToolbarButton>
  );
};

const ClearPlugin: DSlatePlugin = {
  type: 'clear',
  nodeType: 'tool',
  toolbar: <Toolbar />,
  locale: {
    [zhCN.locale]: {
      tooltip: '清理格式',
    },
    [enUS.locale]: {
      tooltip: 'clear style',
    },
  },
};

export { ClearPlugin };
