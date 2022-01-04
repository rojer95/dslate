import React from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import type { DSlatePlugin } from '../typing';

import { useSlate } from 'slate-react';
import { ToolbarButton } from '../components/Toolbar';
import { getBlockProps, setBlockProps } from '../utils';
import { useMessage } from '../contexts/ConfigContext';
import IconFont from '../components/IconFont';
import { Editor, Node } from 'slate';
import type { Descendant } from 'slate';
import { Space } from 'antd';
import { clearBlockProps } from '../utils/block';

const DEFAULT_VALUE = 0;
const TYPE = 'text-indent';

const renderStyle = (text: Descendant) => {
  if (text[TYPE]) {
    return { textIndent: `${text?.[TYPE] * 2}em` };
  }
  return {};
};

const increase = (editor: Editor) => {
  const indent = getBlockProps(editor, TYPE, DEFAULT_VALUE);
  setBlockProps(editor, TYPE, indent + 1);
};

const decrease = (editor: Editor) => {
  let indent = getBlockProps(editor, TYPE, DEFAULT_VALUE);
  indent--;
  if (indent <= 0) {
    clearBlockProps(editor, TYPE);
  } else {
    setBlockProps(editor, TYPE, indent);
  }
};

const Toolbar = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  return (
    <Space>
      <ToolbarButton
        onClick={() => increase(editor)}
        tooltip={getMessage('indent.tooltip', '增加缩进')}
      >
        <IconFont type="icon-indent" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => decrease(editor)}
        tooltip={getMessage('outdent.tooltip', '减少缩进')}
        disabled={getBlockProps(editor, TYPE, DEFAULT_VALUE) === 0}
      >
        <IconFont type="icon-outdent" />
      </ToolbarButton>
    </Space>
  );
};

const emptyLineDecrease = (editor: Editor) => {
  if (!editor.selection) return false;

  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return TYPE in n && Node.string(n) === '';
    },
  });

  if (!!match) {
    decrease(editor);
    return true;
  }

  return false;
};

const withIndent = (editor: Editor) => {
  // 空行按下删除，减少一个缩进
  const { deleteBackward } = editor;

  editor.deleteBackward = (unit) => {
    if (emptyLineDecrease(editor)) return;
    deleteBackward(unit);
  };

  return editor;
};

const TextIndentPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: <Toolbar />,
  renderStyle,
  withPlugin: withIndent,
  locale: {
    [zhCN.locale]: {
      indent: {
        tooltip: '增加缩进',
      },
      outdent: {
        tooltip: '减少缩进',
      },
    },
    [enUS.locale]: {
      indent: {
        tooltip: 'increase indent',
      },
      outdent: {
        tooltip: 'decrease indent',
      },
    },
  },
};

export { TextIndentPlugin };
