import React from "react";
import { Locales } from "@dslate/core";
import isHotkey from "is-hotkey";
import type { DSlatePlugin } from "@dslate/core";

import { useSlate } from "slate-react";
import { Toolbar } from "@dslate/component";
import {
  useMessage,
  getBlockProps,
  setBlockProps,
  clearBlockProps,
} from "@dslate/core";
import { Icon } from "@dslate/component";
import { Editor, Range } from "slate";
import type { Descendant } from "slate";

const DEFAULT_VALUE = 0;
const TYPE = "text-indent";
const iconStyle = { opacity: 0.7, fontSize: "93%" };

const renderStyle = (element: Descendant) => {
  if (!!element[TYPE]) {
    return { paddingLeft: `${element[TYPE] * 2}em` };
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

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  return (
    <>
      <Toolbar.Button
        onClick={() => increase(editor)}
        tooltip={getMessage("indent.tooltip", "增加缩进")}
        icon={<Icon type="icon-indent" style={iconStyle} />}
      />
      <Toolbar.Button
        onClick={() => decrease(editor)}
        tooltip={getMessage("outdent.tooltip", "减少缩进")}
        disabled={getBlockProps(editor, TYPE, DEFAULT_VALUE) === 0}
        icon={<Icon type="icon-outdent" style={iconStyle} />}
      />
    </>
  );
};

const isStart = (editor: Editor) => {
  if (!editor.selection || Range.isExpanded(editor.selection)) return false;
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return TYPE in n;
    },
  });

  if (!!match) {
    return Editor.isStart(editor, editor.selection?.focus, match[1]);
  }

  return false;
};

const decreaseOnStart = (editor: Editor) => {
  if (isStart(editor)) {
    decrease(editor);
    return true;
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
  if (isHotkey("tab", e)) {
    e.preventDefault();
    increase(editor);
    return;
  }

  if (isHotkey("shift+tab", e)) {
    e.preventDefault();
    decrease(editor);
    return;
  }
};

const TextIndentPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: "element",
  toolbar: <ToolbarButton />,
  renderStyle,
  withPlugin: withIndent,
  onKeyDown,
  locale: [
    {
      locale: Locales.zhCN,
      indent: {
        tooltip: "增加缩进",
      },
      outdent: {
        tooltip: "减少缩进",
      },
    },
    {
      locale: Locales.enUS,
      indent: {
        tooltip: "increase indent",
      },
      outdent: {
        tooltip: "decrease indent",
      },
    },
  ],
};

export { TextIndentPlugin };
