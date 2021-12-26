import React from 'react';
import { Editor, Text as SlateText, Transforms } from 'slate';

import type { DSlateCustomText, DSlatePlugin } from '../typing';

import { useSlate } from 'slate-react';
import { ToolbarSelect } from '../components/Toolbar';

const DEFAULT_FONT_SIZE = 14;
const TYPE = 'font-size';

const getActvieSize = (editor: Editor): number => {
  const [match] = Editor.nodes<DSlateCustomText>(editor, {
    match: (n) => SlateText.isText(n) && TYPE in n,
  });

  if (match && match[0] && match[0]?.[TYPE]) {
    return Number(match[0]?.[TYPE]);
  }

  return DEFAULT_FONT_SIZE;
};

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
    Transforms.setNodes(
      editor,
      { [TYPE]: size },
      { match: (n) => SlateText.isText(n), split: true },
    );
  };

  return (
    <ToolbarSelect<number>
      placeholder="14px"
      onChange={onChange}
      options={DefaultSizes.map((size) => ({
        label: `${size}px`,
        value: size,
      }))}
      tooltip="字体大小"
      value={getActvieSize(editor)}
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
