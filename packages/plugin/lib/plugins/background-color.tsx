import { Locales } from '@dslate/core';
import { TwitterPicker } from 'react-color';

import { Icon, Toolbar } from '@dslate/component';
import {
  getTextProps,
  setTextProps,
  useMessage,
  usePlugin,
} from '@dslate/core';
import { useSlate } from 'slate-react';

import type { DSlatePlugin } from '@dslate/core';
import type { Descendant } from 'slate';

const DEFAULT_COLOR = undefined;
const TYPE = 'background-color';

const renderStyle = (text: Descendant) => {
  if (text[TYPE]) {
    return { backgroundColor: text[TYPE] as string };
  }
  return {};
};

const ToolbarButton = () => {
  const editor = useSlate();

  const handleChangeComplete = (value: any) => {
    setTextProps(editor, TYPE, value?.hex ?? DEFAULT_COLOR);
  };

  const getMessage = useMessage();
  const { props, disabled } = usePlugin();

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
        <Icon
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
            backgroundColor: disabled
              ? 'rgba(0, 0, 0, 0.1)'
              : getTextProps(editor, TYPE, 'rgba(0,0,0,0.1)'),
          }}
        />
      </div>
    </Toolbar.Modal>
  );
};

const BackgroundColorPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'text',
  toolbar: ToolbarButton,
  renderStyle,
  props: {
    colors: [
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
    ],
  },
  locale: [
    { locale: Locales.zhCN, tooltip: '字体背景颜色' },
    { locale: Locales.enUS, tooltip: 'font background color' },
  ],
};

export { BackgroundColorPlugin };
