import React from 'react';
import { useSlate } from 'slate-react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import { Space } from 'antd';
import type { Descendant } from 'slate';

import IconFont from '../components/IconFont';
import { ToolbarButton } from '../components/Toolbar';
import type { DSlatePlugin } from '../typing';

import { getTextProps, toggleTextProps } from '../utils';
import { useMessage } from '../contexts/ConfigContext';

const TYPE = 'decoration';

const Toolbar = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  return (
    <Space>
      <ToolbarButton
        active={getTextProps(editor, 'underline')}
        onClick={() => {
          toggleTextProps(editor, 'underline');
        }}
        tooltip={getMessage('underline.tooltip', '下划线')}
      >
        <IconFont style={{ fontSize: '90%' }} type="icon-xiahuaxian" />
      </ToolbarButton>
      <ToolbarButton
        active={getTextProps(editor, 'through')}
        onClick={() => {
          toggleTextProps(editor, 'through');
        }}
        tooltip={getMessage('through.tooltip', '删除线')}
      >
        <IconFont type="icon-strikethrough" />
      </ToolbarButton>
    </Space>
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

  return textDecoration.length === 0 ? {} : { textDecoration: textDecoration.join(' ') };
};

const DecorationPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'text',
  toolbar: <Toolbar />,
  renderStyle: renderStyle,
  locale: {
    [zhCN.locale]: {
      underline: {
        tooltip: '下划线',
      },
      through: {
        tooltip: '删除线',
      },
    },
    [enUS.locale]: {
      underline: {
        tooltip: 'underline',
      },
      through: {
        tooltip: 'strikethrough',
      },
    },
  },
};

export { DecorationPlugin };
