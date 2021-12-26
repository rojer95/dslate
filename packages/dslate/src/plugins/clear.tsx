import React from 'react';
import type { Editor } from 'slate';
import { Transforms, Text as SlateText } from 'slate';
import { useSlate } from 'slate-react';
import { IconFont } from '../components/Icon';
import { ToolbarButton } from '../components/Toolbar';
import type { DSlatePlugin } from '../typing';

const clearStyle = (editor: Editor, options: any) => {
  if (!editor.selection) return;
  const emptyProps = editor.styles.reduce((props, key) => ({ ...props, [key]: null }), {});
  Transforms.setNodes(editor, emptyProps, options);
};

const Toolbar = () => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onClick={() => {
        clearStyle(editor, { match: (n: any) => SlateText.isText(n), split: true });
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
