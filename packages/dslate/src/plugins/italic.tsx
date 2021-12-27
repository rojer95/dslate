import React from 'react';
import { useSlate } from 'slate-react';
import { IconFont } from '../components/Icon';
import { ToolbarButton } from '../components/Toolbar';
import type { DSlatePlugin } from '../typing';

import { getTextProps, toggleTextProps } from '../utils';

const Toolbar = () => {
  const editor = useSlate();
  return (
    <ToolbarButton
      active={getTextProps(editor, 'italic')}
      onClick={() => {
        toggleTextProps(editor, 'italic');
      }}
      tooltip="斜体"
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
};

export { ItalicPlugin };
