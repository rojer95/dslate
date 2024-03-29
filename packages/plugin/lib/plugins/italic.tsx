import { Locales } from '@dslate/core';
import { useSlate } from 'slate-react';

import { Icon, Toolbar } from '@dslate/component';
import type { DSlatePlugin } from '@dslate/core';

import { getTextProps, toggleTextProps, useMessage } from '@dslate/core';

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
      icon={<Icon type="icon-italic" />}
    />
  );
};

const ItalicPlugin: DSlatePlugin = {
  type: 'italic',
  nodeType: 'text',
  toolbar: ToolbarButton,
  renderStyle: { fontStyle: 'italic' },
  locale: [
    { locale: Locales.zhCN, tooltip: '斜体' },
    { locale: Locales.enUS, tooltip: 'italic' },
  ],
};

export { ItalicPlugin };
