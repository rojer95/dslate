import React from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import type { DSlatePlugin } from '../typing';

import { useSlate } from 'slate-react';
import { ToolbarButton } from '../components/Toolbar';
import { getBlockProps, setBlockProps } from '../utils';
import { useMessage } from '../contexts/ConfigContext';
import IconFont from '../components/IconFont';
import { Editor, Range } from 'slate';
import type { Descendant } from 'slate';
import { Space } from 'antd';
import { clearBlockProps } from '../utils/block';

const DEFAULT_VALUE = 0;
const TYPE = 'text-indent';
const iconStyle = { opacity: 0.7, fontSize: '93%' };

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
        <IconFont type="icon-indent" style={iconStyle} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => decrease(editor)}
        tooltip={getMessage('outdent.tooltip', '减少缩进')}
        disabled={getBlockProps(editor, TYPE, DEFAULT_VALUE) === 0}
      >
        <IconFont type="icon-outdent" style={iconStyle} />
      </ToolbarButton>
    </Space>
  );
};

const decreaseOnStart = (editor: Editor) => {
  if (!editor.selection || Range.isExpanded(editor.selection)) return false;

  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return TYPE in n;
    },
  });

  if (!!match) {
    const isStart = Editor.isStart(editor, editor.selection?.focus, match[1]);
    if (isStart) {
      decrease(editor);
      return true;
    }
  }

  return false;
};

const withIndent = (editor: Editor) => {
  const { deleteBackward } = editor;

  editor.deleteBackward = (unit) => {
    // 在开头处按下删除，减少一个缩进
    if (decreaseOnStart(editor)) return;
    deleteBackward(unit);
  };

  return editor;
};

const onKeyDown = (e: React.KeyboardEvent, editor: Editor) => {
  if (e.key === 'Tab' && !e.altKey && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    if (e.shiftKey) {
      decrease(editor);
    } else {
      increase(editor);
    }
  }
};

const TextIndentPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: <Toolbar />,
  renderStyle,
  withPlugin: withIndent,
  onKeyDown,
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
