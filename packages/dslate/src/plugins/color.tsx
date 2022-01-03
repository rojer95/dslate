import React from 'react';

import { TwitterPicker } from 'react-color';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import type { DSlatePlugin } from '../typing';

import { useSlate } from 'slate-react';
import { ToolbarModal } from '../components/Toolbar';
import IconFont from '../components/IconFont';
import { useMessage } from '../ConfigContext';
import { getTextProps, setTextProps } from '../utils';
import type { Descendant } from 'slate';

const DEFAULT_COLOR = undefined;
const TYPE = 'color';

const renderStyle = (text: Descendant) => {
  if (text[TYPE]) {
    return { color: text[TYPE] as string };
  }
  return {};
};

const DefaultColors = [
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
];

const Toolbar = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const handleChangeComplete = (value: any) => {
    setTextProps(editor, TYPE, value?.hex ?? DEFAULT_COLOR);
  };

  return (
    <ToolbarModal
      tooltip={getMessage('tooltip', '字体颜色')}
      overlay={
        <TwitterPicker
          color={getTextProps(editor, TYPE, DEFAULT_COLOR)}
          onChangeComplete={handleChangeComplete}
          colors={DefaultColors}
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
          type="icon-zitiyanse"
        />
        <div
          style={{
            width: 14,
            height: 2,
            marginTop: 2,
            backgroundColor: getTextProps(editor, TYPE, 'rgba(0,0,0,0.85)'),
          }}
        />
      </div>
    </ToolbarModal>
  );
};

const ColorPlugin: DSlatePlugin = {
  type: 'color',
  nodeType: 'text',
  toolbar: <Toolbar />,
  renderStyle,
  locale: {
    [zhCN.locale]: {
      tooltip: '字体颜色',
    },
    [enUS.locale]: {
      tooltip: 'font color',
    },
  },
};

export { ColorPlugin };
