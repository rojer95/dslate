import React from 'react';
import { useSlate } from 'slate-react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import IconFont from '../components/IconFont';
import { ToolbarButton } from '../components/Toolbar';
import type { DSlatePlugin } from '../typing';
import { useMessage } from '../ConfigContext';

const RedoToolbar = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const onClick = () => {
    editor.redo();
  };

  return (
    <ToolbarButton
      onClick={onClick}
      tooltip={getMessage('tooltip', '重做')}
      disabled={editor.history.redos.length === 0}
    >
      <IconFont type="icon-redo" />
    </ToolbarButton>
  );
};

const RedoPlugin: DSlatePlugin = {
  type: 'redo',
  nodeType: 'tool',
  toolbar: <RedoToolbar />,
  locale: {
    [zhCN.locale]: {
      tooltip: '重做',
    },
    [enUS.locale]: {
      tooltip: 'redo',
    },
  },
};

const UndoToolbar = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const onClick = () => {
    editor.undo();
  };

  return (
    <ToolbarButton
      onClick={onClick}
      tooltip={getMessage('tooltip', '撤消')}
      disabled={editor.history.undos.length === 0}
    >
      <IconFont type="icon-undo" />
    </ToolbarButton>
  );
};

const UndoPlugin: DSlatePlugin = {
  type: 'undo',
  nodeType: 'tool',
  toolbar: <UndoToolbar />,
  locale: {
    [zhCN.locale]: {
      tooltip: '撤销',
    },
    [enUS.locale]: {
      tooltip: 'undo',
    },
  },
};

export { RedoPlugin, UndoPlugin };
