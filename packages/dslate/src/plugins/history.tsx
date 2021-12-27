import React from 'react';
import { useSlate } from 'slate-react';
import { IconFont } from '../components/Icon';
import { ToolbarButton } from '../components/Toolbar';
import type { DSlatePlugin } from '../typing';

const RedoToolbar = () => {
  const editor = useSlate();

  const onClick = () => {
    editor.redo();
  };

  return (
    <ToolbarButton onClick={onClick} tooltip="重做" disabled={editor.history.redos.length === 0}>
      <IconFont type="icon-redo" />
    </ToolbarButton>
  );
};

const RedoPlugin: DSlatePlugin = {
  type: 'redo',
  nodeType: 'tool',
  toolbar: <RedoToolbar />,
};

const UndoToolbar = () => {
  const editor = useSlate();

  const onClick = () => {
    editor.undo();
  };

  return (
    <ToolbarButton onClick={onClick} tooltip="撤消" disabled={editor.history.undos.length === 0}>
      <IconFont type="icon-undo" />
    </ToolbarButton>
  );
};

const UndoPlugin: DSlatePlugin = {
  type: 'undo',
  nodeType: 'tool',
  toolbar: <UndoToolbar />,
};

export { RedoPlugin, UndoPlugin };
