import React, { useContext } from 'react';
import { TwitterPicker } from 'react-color';

import type { DSlateCustomText, DSlatePlugin } from '../typing';

import { useSlate } from 'slate-react';
import { ToolbarModal } from '../components/Toolbar';
import IconFont from '../components/IconFont';
import DSlateContext from '../ConfigContext';
import { getTextProps, setTextProps } from '../utils';

const DEFAULT_COLOR = undefined;
const TYPE = 'background-color';

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
  const editor = useSlate();

  const context = useContext(DSlateContext);

  const handleChangeComplete = (value: any) => {
    setTextProps(editor, TYPE, value?.hex ?? DEFAULT_COLOR);
  };

  return (
    <ToolbarModal
      tooltip="字体颜色"
      overlay={
        <TwitterPicker
          color={getTextProps(editor, TYPE, DEFAULT_COLOR)}
          onChangeComplete={handleChangeComplete}
          colors={context.backgroundColors || DefaultColors}
          triangle="hide"
        />
      }
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
            marginTop: 2,
            backgroundColor: getTextProps(editor, TYPE, 'rgba(0,0,0,0.1)'),
          }}
        />
      </div>
    </ToolbarModal>
  );
};

const BackgroundColorPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'text',
  toolbar: <Toolbar />,
  renderStyle,
};

export { BackgroundColorPlugin };
