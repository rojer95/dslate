import React from 'react';

import { TwitterPicker } from 'react-color';
import { Locales } from '@dslate/core';

import type { DSlatePlugin } from '@dslate/core';

import { useSlate } from 'slate-react';
import { IconFont, Toolbar } from '@dslate/component';
import { useMessage, usePlugin, getTextProps, setTextProps } from '@dslate/core';
import type { Descendant } from 'slate';

const DEFAULT_COLOR = undefined;
const TYPE = 'color';

const renderStyle = (text: Descendant) => {
  if (text[TYPE]) {
    return { color: text[TYPE] as string };
  }
  return {};
};

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();
  const { props } = usePlugin();

  const handleChangeComplete = (value: any) => {
    setTextProps(editor, TYPE, value?.hex ?? DEFAULT_COLOR);
  };

  return (
    <Toolbar.Modal
      tooltip={getMessage('tooltip', '字体颜色')}
      overlay={
        <TwitterPicker
          color={getTextProps(editor, TYPE, DEFAULT_COLOR)}
          onChangeComplete={handleChangeComplete}
          colors={props?.colors}
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
    </Toolbar.Modal>
  );
};

const ColorPlugin: DSlatePlugin = {
  type: 'color',
  nodeType: 'text',
  toolbar: <ToolbarButton />,
  renderStyle,
  props: {
    colors: [
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
    ],
  },
  locale: [
    { locale: Locales.zhCN, tooltip: '字体颜色' },
    { locale: Locales.enUS, tooltip: 'font colore' },
  ],
};

export { ColorPlugin };
