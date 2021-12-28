import React from 'react';
import { Editor, Text, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import IconFont from '../components/IconFont';
import { ToolbarButton } from '../components/Toolbar';
import type { DSlatePlugin } from '../typing';

const clearStyle = (editor: Editor) => {
  if (!editor.selection) return;

  const texts = Array.from(
    Editor.nodes(editor, {
      match: (n) => Text.isText(n) && Object.keys(n).length > 1,
      mode: 'all',
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

  return (
    <ToolbarButton
      onClick={() => {
        clearStyle(editor);
      }}
      tooltip="清理格式"
    >
      <IconFont type="icon-empty" />
    </ToolbarButton>
  );
};

const ClearPlugin: DSlatePlugin = {
  type: 'clear',
  nodeType: 'tool',
  toolbar: <Toolbar />,
  injectMethod: (editor: Editor) => {
    editor.clearStyle = clearStyle;
  },
};

export { ClearPlugin };
