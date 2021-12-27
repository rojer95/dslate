import React from 'react';

import type { DSlateCustomText, DSlatePlugin } from '../typing';

import { useSlate } from 'slate-react';
import { ToolbarSelect } from '../components/Toolbar';
import { getTextProps, setTextProps } from '../utils';

const DEFAULT_FONT_SIZE = 14;
const TYPE = 'font-size';

const renderStyle = (text: DSlateCustomText) => {
  if (text[TYPE]) {
    return { fontSize: text?.[TYPE] };
  }
  return {};
};

const DefaultSizes = [12, 13, 14, 15, 16, 19, 22, 24, 29, 32, 40, 48];

const Toolbar = () => {
  const editor = useSlate();
  const onChange = (size: number) => {
    setTextProps(editor, TYPE, size);
  };

  return (
    <ToolbarSelect<number>
      width={38}
      placeholder="14px"
      onChange={onChange}
      options={DefaultSizes.map((size) => ({
        label: `${size}px`,
        value: size,
      }))}
      tooltip="字体大小"
      value={getTextProps(editor, TYPE, DEFAULT_FONT_SIZE)}
    />
  );
};

const FontSizePlugin: DSlatePlugin = {
  type: 'font-size',
  nodeType: 'text',
  toolbar: <Toolbar />,
  renderStyle,
};

export { FontSizePlugin };
