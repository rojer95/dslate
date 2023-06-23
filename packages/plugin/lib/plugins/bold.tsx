import { Locales } from '@dslate/core';
import { useSlate } from 'slate-react';

import { Icon, Toolbar } from '@dslate/component';
import type { DSlatePlugin } from '@dslate/core';
import { getTextProps, toggleTextProps, useMessage } from '@dslate/core';

const TYPE = 'bold';

const ToolbarButton = () => {
  const editor = useSlate();

  const getMessage = useMessage();

  return (
    <Toolbar.Button
      onClick={() => {
        toggleTextProps(editor, TYPE);
      }}
      active={getTextProps(editor, TYPE)}
      tooltip={getMessage('tooltip', '加粗')}
      icon={<Icon type="icon-bold" />}
    />
  );
};

const BoldPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'text',
  toolbar: ToolbarButton,
  renderStyle: { fontWeight: 'bold' },
  locale: [
    { locale: Locales.zhCN, tooltip: '加粗' },
    { locale: Locales.enUS, tooltip: 'bold' },
  ],
};

export { BoldPlugin };
