import React from 'react';
import { useSlate } from 'slate-react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import IconFont from '../components/IconFont';
import { ToolbarButton } from '../components/Toolbar';
import type { DSlatePlugin } from '../typing';
import { getTextProps, toggleTextProps } from '../utils';
import { useMessage } from '../contexts/ConfigContext';

const Toolbar = () => {
  const editor = useSlate();

  const getMessage = useMessage();

  return (
    <ToolbarButton
      onClick={() => {
        toggleTextProps(editor, 'bold');
      }}
      active={getTextProps(editor, 'bold')}
      tooltip={getMessage('tooltip', '加粗')}
    >
      <IconFont type="icon-bold" />
    </ToolbarButton>
  );
};

const BoldPlugin: DSlatePlugin = {
  type: 'bold',
  nodeType: 'text',
  toolbar: <Toolbar />,
  renderStyle: { fontWeight: 'bold' },
  locale: {
    [zhCN.locale]: {
      tooltip: '加粗',
    },
    [enUS.locale]: {
      tooltip: 'bold',
    },
  },
};

export { BoldPlugin };
