import React from 'react';
import { useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import { IconFont } from '@dslate/component';
import type { DSlatePlugin } from '@dslate/core';
import { useMessage } from '@dslate/core';
import { Space } from 'antd';
import { Toolbar } from '@dslate/component';

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const undo = () => {
    editor?.undo();
  };

  const redo = () => {
    editor?.redo();
  };

  return (
    <Space>
      <Toolbar.Button
        onClick={undo}
        tooltip={getMessage('undo.tooltip', '撤消')}
        disabled={editor.history.undos.length === 0}
      >
        <IconFont type="icon-undo1" />
      </Toolbar.Button>
      <Toolbar.Button
        onClick={redo}
        tooltip={getMessage('redo.tooltip', '重做')}
        disabled={editor.history.redos.length === 0}
      >
        <IconFont type="icon-redo1" />
      </Toolbar.Button>
    </Space>
  );
};

const HistoryPlugin: DSlatePlugin = {
  type: 'history',
  nodeType: 'tool',
  toolbar: <ToolbarButton />,
  withPlugin: withHistory,
  locale: {
    [zhCN.locale]: {
      undo: {
        tooltip: '撤销',
      },
      redo: {
        tooltip: '重做',
      },
    },
    [enUS.locale]: {
      undo: {
        tooltip: 'undo',
      },
      redo: {
        tooltip: 'redo',
      },
    },
  },
};

export { HistoryPlugin };
