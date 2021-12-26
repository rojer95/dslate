import { Select } from 'antd';
import React, { useContext } from 'react';
import { Editor, Text as SlateText, Transforms } from 'slate';

import type { DSlateCustomText, DSlatePlugin } from '../typing';

import { useSlate } from 'slate-react';
import { ToolbarButton } from '../components/Toolbar';
import DSlateContext from '../context';

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
  const context = useContext(DSlateContext);

  const onChange = (size: number) => {
    Transforms.setNodes(
      editor,
      { [TYPE]: size },
      { match: (n) => SlateText.isText(n), split: true },
    );
  };

  return (
    <ToolbarButton tooltip="字体大小">
      <Select
        onChange={onChange}
        value={getActvieSize(editor)}
        style={{ width: 80 }}
        bordered={false}
      >
        {(context.fontSizes || DefaultSizes).map((size: number) => (
          <Select.Option key={size} value={size}>
            {size}px
          </Select.Option>
        ))}
      </Select>
    </ToolbarButton>
  );
};

const FontSizePlugin: DSlatePlugin = {
  type: 'font-size',
  nodeType: 'text',
  toolbar: <Toolbar />,
  renderStyle,
};

export { FontSizePlugin };
