import { Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Editor, Text as SlateText, Transforms } from 'slate';

import { TwitterPicker } from 'react-color';

import { DSlateCustomText, DSlatePlugin } from '../typing';

import { useSlate, useSlateStatic } from 'slate-react';
import { ToolbarButton } from '../components/Toolbar';
import { IconFont } from '../components/Icon';
const DEFAULT_COLOR = undefined;

const getActvieColor = (editor: Editor): string | undefined => {
  const [match] = Editor.nodes<DSlateCustomText>(editor, {
    match: (n) => SlateText.isText(n) && 'color' in n,
  });

  if (match && match[0]) {
    return match[0]?.color as string;
  }

  return DEFAULT_COLOR;
};

const renderStyle = (text: DSlateCustomText) => {
  if (text.color) {
    return { color: text.color as string };
  }
  return {};
};

const Toolbar = () => {
  const [visible, setVisible] = useState(false);
  const editor = useSlate();
  const [color, setColor] = useState<string | undefined>(undefined);

  const handleChangeComplete = (color: any) => {
    console.log(color);

    Transforms.setNodes(
      editor,
      { color: color?.hex ?? null },
      { match: (n) => SlateText.isText(n), split: true },
    );
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      setColor(getActvieColor(editor));
    }
  }, [visible]);

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
            onChange={(color: any) => {
              setColor(color?.hex ?? DEFAULT_COLOR);
            }}
            onChangeComplete={handleChangeComplete}
            colors={[
              '#000000',
              '#FF6900',
              '#FCB900',
              '#7BDCB5',
              '#00D084',
              '#8ED1FC',
              '#0693E3',
              '#EB144C',
              '#F78DA7',
              '#9900EF',
            ]}
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
            type="icon-zitiyanse"
          />
          <div
            style={{
              width: 14,
              height: 2,
              marginTop: 1,
              backgroundColor: getActvieColor(editor) ?? '#000000',
            }}
          />
        </div>
      </ToolbarButton>
    </Tooltip>
  );
};

const ColorPlugin: DSlatePlugin = {
  type: 'color',
  nodeType: 'text',
  toolbar: <Toolbar />,
  renderStyle,
};

export { ColorPlugin };
