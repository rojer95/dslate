import React from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import type { DSlatePlugin } from '../typing';

import { useSlate } from 'slate-react';
import { ToolbarSelect } from '../components/Toolbar';
import { getBlockProps, setBlockProps } from '../utils';
import { useMessage } from '../ConfigContext';
import IconFont from '../components/IconFont';
import type { Descendant } from 'slate';

const DEFAULT_VALUE = 'left';
const TYPE = 'text-align';

const renderStyle = (text: Descendant) => {
  if (text[TYPE]) {
    return { textAlign: text?.[TYPE] };
  }
  return {};
};

const Toolbar = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const onChange = (align: string) => {
    setBlockProps(editor, TYPE, align);
  };

  return (
    <ToolbarSelect<string>
      onChange={onChange}
      direction="horizontal"
      options={[
        {
          tooltip: '左对齐',
          label: <IconFont type="icon-alignLeft" />,
          value: 'left',
        },
        {
          tooltip: '居中对齐',
          label: <IconFont type="icon-center" />,
          value: 'center',
        },
        {
          tooltip: '右对齐',
          label: <IconFont type="icon-alignRight" />,
          value: 'right',
        },
        {
          tooltip: '两端对齐',
          label: <IconFont type="icon-alignBothSides" />,
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
  toolbar: <Toolbar />,
  renderStyle,
  locale: {
    [zhCN.locale]: {
      tooltip: '对齐方式',
    },
    [enUS.locale]: {
      tooltip: 'text align',
    },
  },
};

export { TextAlignPlugin };
