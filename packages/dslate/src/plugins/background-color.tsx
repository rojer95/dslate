import { Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Editor, Text as SlateText, Transforms } from 'slate';

import { TwitterPicker } from 'react-color';

import type { DSlateCustomText, DSlatePlugin } from '../typing';

import { useSlate } from 'slate-react';
import { ToolbarButton } from '../components/Toolbar';
import { IconFont } from '../components/Icon';
import DSlateContext from '../context';
const DEFAULT_COLOR = undefined;
const TYPE = 'background-color';

const getActvieColor = (editor: Editor): string | undefined => {
  const [match] = Editor.nodes<DSlateCustomText>(editor, {
    match: (n) => SlateText.isText(n) && TYPE in n,
  });

  if (match && match[0]) {
    return match[0]?.[TYPE] as string;
  }

  return DEFAULT_COLOR;
};

const renderStyle = (text: DSlateCustomText) => {
  if (text[TYPE]) {
    return { backgroundColor: text[TYPE] as string };
  }
  return {};
};

const DefaultColors = [
  'transparent',
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#EB144C',
  '#F78DA7',
  '#9900EF',
];

const Toolbar = () => {
  const [visible, setVisible] = useState(false);
  const editor = useSlate();
  const [color, setColor] = useState<string | undefined>(undefined);

  const context = useContext(DSlateContext);

  const handleChangeComplete = (value: any) => {
    Transforms.setNodes(
      editor,
      { [TYPE]: value?.hex ?? null },
      { match: (n) => SlateText.isText(n), split: true },
    );
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      setColor(getActvieColor(editor));
    }
  }, [visible, editor]);

  return (
    <Tooltip
      visible={visible}
      trigger={[]}
      placement="bottom"
      color="#FFFFFF"
      overlayInnerStyle={{
        padding: 0,
      }}
      overlay={
        <div>
          <TwitterPicker
            color={color}
            onChange={(value: any) => {
              setColor(value?.hex ?? DEFAULT_COLOR);
            }}
            onChangeComplete={handleChangeComplete}
            colors={context.backgroundColors || DefaultColors}
            triangle="hide"
          />
        </div>
      }
    >
      <ToolbarButton
        onClick={() => {
          setVisible(!visible);
        }}
        tooltip="字体颜色"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <IconFont
            style={{
              fontSize: '80%',
            }}
            type="icon-beijingse"
          />
          <div
            style={{
              width: 14,
              height: 2,
              marginTop: 1,
              backgroundColor: getActvieColor(editor) ?? 'transparent',
            }}
          />
        </div>
      </ToolbarButton>
    </Tooltip>
  );
};

const BackgroundColorPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'text',
  toolbar: <Toolbar />,
  renderStyle,
};

export { BackgroundColorPlugin };
