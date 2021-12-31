import React from 'react';
import { useSlate } from 'slate-react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import IconFont from '../components/IconFont';
import { ToolbarButton } from '../components/Toolbar';
import type { DSlatePlugin } from '../typing';

import { getTextProps, toggleTextProps } from '../utils';
import { useMessage } from '../ConfigContext';

const Toolbar = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  return (
    <ToolbarButton
      active={getTextProps(editor, 'underline')}
      onClick={() => {
        toggleTextProps(editor, 'underline');
      }}
      tooltip={getMessage('tooltip', '下划线')}
    >
      <IconFont style={{ fontSize: '90%' }} type="icon-xiahuaxian" />
    </ToolbarButton>
  );
};

const UnderlinePlugin: DSlatePlugin = {
  type: 'underline',
  nodeType: 'text',
  toolbar: <Toolbar />,
  renderStyle: { textDecoration: 'underline' },
  locale: {
    [zhCN.locale]: {
      tooltip: '下划线',
    },
    [enUS.locale]: {
      tooltip: 'underline',
    },
  },
};

export { UnderlinePlugin };
