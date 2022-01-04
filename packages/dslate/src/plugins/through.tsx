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
      active={getTextProps(editor, 'through')}
      onClick={() => {
        toggleTextProps(editor, 'through');
      }}
      tooltip={getMessage('tooltip', '删除线')}
    >
      <IconFont type="icon-strikethrough" />
    </ToolbarButton>
  );
};

const ThroughPlugin: DSlatePlugin = {
  type: 'through',
  nodeType: 'text',
  toolbar: <Toolbar />,
  renderStyle: { textDecoration: 'line-through' },
  locale: {
    [zhCN.locale]: {
      tooltip: '删除线',
    },
    [enUS.locale]: {
      tooltip: 'strikethrough',
    },
  },
};

export { ThroughPlugin };
