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
      active={getTextProps(editor, 'through')}
      onClick={() => {
        toggleTextProps(editor, 'through');
      }}
      tooltip="删除线"
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
};

export { ThroughPlugin };
