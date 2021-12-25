import React from 'react';
import { Editor, Transforms, Text as SlateText } from 'slate';
import { useSlate, useSlateStatic } from 'slate-react';
import { IconFont } from '../components/Icon';
import { ToolbarButton } from '../components/Toolbar';
import { DSlatePlugin } from '../typing';

const Toolbar = () => {
  const editor = useSlate();

  const clearStyle = () => {
    if (!editor.selection) return;
    const emptyProps = editor.text.reduce((props, key) => ({ ...props, [key]: null }), {});
    Transforms.setNodes(editor, emptyProps, { match: (n) => SlateText.isText(n), split: true });
  };

  return (
    <ToolbarButton onClick={clearStyle} tooltip="清理格式">
      <IconFont type="icon-empty" />
    </ToolbarButton>
  );
};

const ClearPlugin: DSlatePlugin = {
  type: 'clear',
  nodeType: 'tool',
  toolbar: <Toolbar />,
};

export { ClearPlugin };
