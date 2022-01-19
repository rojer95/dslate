import React from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import type { DSlatePlugin } from '@dslate/core';

import { useSlate } from 'slate-react';
import { useMessage, getBlockProps, setBlockProps } from '@dslate/core';
import { IconFont, Toolbar } from '@dslate/component';
import type { Descendant } from 'slate';

const DEFAULT_VALUE = 'left';
const TYPE = 'text-align';
const iconStyle = { opacity: 0.7, fontSize: '93%' };
const renderStyle = (text: Descendant) => {
  if (text[TYPE]) {
    return { textAlign: text?.[TYPE] };
  }
  return {};
};

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const onChange = (align: string) => {
    setBlockProps(editor, TYPE, align);
  };

  return (
    <Toolbar.Select<string>
      onChange={onChange}
      direction="horizontal"
      options={[
        {
          tooltip: getMessage('left', '左对齐'),
          label: <IconFont type="icon-alignleft" style={iconStyle} />,
          value: 'left',
        },
        {
          tooltip: getMessage('center', '居中对齐'),
          label: <IconFont type="icon-aligncenter" style={iconStyle} />,
          value: 'center',
        },
        {
          tooltip: getMessage('right', '右对齐'),
          label: <IconFont type="icon-alignright" style={iconStyle} />,
          value: 'right',
        },
        {
          tooltip: getMessage('justify', '两端对齐'),
          label: <IconFont type="icon-alignjustify" style={iconStyle} />,
          value: 'justify',
        },
      ]}
      tooltip={getMessage('tooltip', '对齐方式')}
      value={getBlockProps(editor, TYPE, DEFAULT_VALUE)}
    />
  );
};

const TextAlignPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: <ToolbarButton />,
  renderStyle,
  locale: {
    [zhCN.locale]: {
      tooltip: '对齐方式',
      left: '左对齐',
      center: '居中对齐',
      right: '右对齐',
      justify: '两端对齐',
    },
    [enUS.locale]: {
      tooltip: 'text align',
      left: 'align left',
      center: 'align center',
      right: 'align right',
      justify: 'align justify',
    },
  },
};

export { TextAlignPlugin };
