import React from 'react';
import { useSlate } from 'slate-react';
import { IconFont } from '../components/Icon';
import { ToolbarButton } from '../components/Toolbar';
import { DSlatePlugin } from '../typing';
import { isTextActive, toggleTextProps } from '../utils';

const Toolbar = () => {
  const editor = useSlate();

  return (
    <ToolbarButton
      onClick={() => {
        toggleTextProps(editor, 'bold');
      }}
      active={isTextActive(editor, 'bold')}
      tooltip="加粗"
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
};

export { BoldPlugin };
