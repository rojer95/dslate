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
      active={getTextProps(editor, 'italic')}
      onClick={() => {
        toggleTextProps(editor, 'italic');
      }}
      tooltip={getMessage('tooltip', '斜体')}
    >
      <IconFont type="icon-italic" />
    </ToolbarButton>
  );
};

const ItalicPlugin: DSlatePlugin = {
  type: 'italic',
  nodeType: 'text',
  toolbar: <Toolbar />,
  renderStyle: { fontStyle: 'italic' },
  locale: {
    [zhCN.locale]: {
      tooltip: '斜体',
    },
    [enUS.locale]: {
      tooltip: 'italic',
    },
  },
};

export { ItalicPlugin };
