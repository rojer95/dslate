import React from 'react';
import { useSlate } from 'slate-react';
import locale from '../locale';

import { IconFont, Toolbar } from '@dslate/component';
import type { DSlatePlugin } from '@dslate/core';

import { useMessage, getTextProps, toggleTextProps } from '@dslate/core';

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  return (
    <Toolbar.Button
      active={getTextProps(editor, 'italic')}
      onClick={() => {
        toggleTextProps(editor, 'italic');
      }}
      tooltip={getMessage('tooltip', '斜体')}
    >
      <IconFont type="icon-italic" />
    </Toolbar.Button>
  );
};

const ItalicPlugin: DSlatePlugin = {
  type: 'italic',
  nodeType: 'text',
  toolbar: <ToolbarButton />,
  renderStyle: { fontStyle: 'italic' },
  locale: [
    { locale: locale.zhCN, tooltip: '斜体' },
    { locale: locale.enUS, tooltip: 'italic' },
  ],
};

export { ItalicPlugin };
