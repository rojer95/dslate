import { Locales } from '@dslate/core';
import { useSlate } from 'slate-react';

import type { Descendant } from 'slate';

import { Icon, Toolbar } from '@dslate/component';

import { getTextProps, toggleTextProps, useMessage } from '@dslate/core';

import type { DSlatePlugin } from '@dslate/core';
const TYPE = 'decoration';

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  return (
    <>
      <Toolbar.Button
        active={getTextProps(editor, 'underline')}
        onClick={() => {
          toggleTextProps(editor, 'underline');
        }}
        tooltip={getMessage('underline.tooltip', '下划线')}
        icon={<Icon style={{ fontSize: '90%' }} type="icon-xiahuaxian" />}
      />
      <Toolbar.Button
        active={getTextProps(editor, 'through')}
        onClick={() => {
          toggleTextProps(editor, 'through');
        }}
        tooltip={getMessage('through.tooltip', '删除线')}
        icon={<Icon type="icon-strikethrough" />}
      />
    </>
  );
};

const renderStyle = (text: Descendant) => {
  const textDecoration = [];
  if (text.through) {
    textDecoration.push('line-through');
  }

  if (text.underline) {
    textDecoration.push('underline');
  }

  return textDecoration.length === 0
    ? {}
    : { textDecoration: textDecoration.join(' ') };
};

const DecorationPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'text',
  toolbar: ToolbarButton,
  renderStyle: renderStyle,
  locale: [
    {
      locale: Locales.zhCN,
      underline: {
        tooltip: '下划线',
      },
      through: {
        tooltip: '删除线',
      },
    },
    {
      locale: Locales.enUS,
      underline: {
        tooltip: 'underline',
      },
      through: {
        tooltip: 'strikethrough',
      },
    },
  ],
};

export { DecorationPlugin };
