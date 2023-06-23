import { Icon, Toolbar } from '@dslate/component';
import { isBlockActive, isEmpty, isStart, useMessage } from '@dslate/core';
import { Editor, Element, Path, Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';

import type { DSlatePlugin, RenderElementPropsWithStyle } from '@dslate/core';
import { Locales } from '@dslate/core';
import type { CSSProperties } from 'react';
import type { Descendant } from 'slate';

const TYPE = 'blockquote';

const remove = (editor: Editor) => {
  if (!editor.selection) return;
  Transforms.unwrapNodes(editor, {
    match: (n) => n.type === TYPE,
    split: true,
  });
};

const add = (editor: Editor) => {
  if (!editor.selection) return;
  Transforms.wrapNodes(
    editor,
    {
      type: TYPE,
      children: [],
    },
    {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        Editor.isBlock(editor, n),
      mode: 'highest',
    },
  );
};

const ToolbarButton = () => {
  const editor = useSlate();

  const toggle = () => {
    if (!editor.selection) return;
    const isActive = isBlockActive(editor, TYPE);
    if (isActive) {
      remove(editor);
    } else {
      add(editor);
    }
  };

  const getMessage = useMessage();

  return (
    <Toolbar.Button
      tooltip={getMessage('toolbar', '引用')}
      active={isBlockActive(editor, TYPE)}
      onClick={toggle}
    >
      <Icon type="icon-blockquote" />
    </Toolbar.Button>
  );
};

const renderElement = (props: RenderElementPropsWithStyle) => {
  return (
    <blockquote {...props.attributes} style={props.style}>
      {props.children}
    </blockquote>
  );
};

const renderStyle = (node: Descendant) => {
  const style: CSSProperties = {};
  if (node.type === TYPE) {
    style.paddingLeft = 10;
    style.borderLeft = '3px solid #eeeeee';
    style.marginTop = 10;
    style.marginBottom = 10;
  }

  return style;
};

/**
 * 在开头处可以进行删除
 */
const removeOnStart = (editor: Editor) => {
  if (isStart(editor, TYPE)) {
    remove(editor);
    return true;
  }
  return false;
};

/**
 * 空行退出
 */
const exitOnEmpty = (editor: Editor) => {
  if (!editor.selection) return false;

  const [isBlockquote] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.type === TYPE,
  });

  if (isEmpty(editor) && !!isBlockquote) {
    Editor.withoutNormalizing(editor, () => {
      const match = Editor.above(editor);
      if (!match) return;
      const [, path] = match;
      const nextPath = Path.next(Path.parent(path));
      Transforms.moveNodes(editor, {
        at: path,
        to: nextPath,
      });
    });
    return true;
  }

  return false;
};

const withPlugin = (editor: Editor) => {
  const { insertBreak, deleteBackward } = editor;
  editor.deleteBackward = (unit) => {
    if (removeOnStart(editor)) return;
    deleteBackward(unit);
  };

  editor.insertBreak = () => {
    if (editor.selection && Range.isCollapsed(editor.selection)) {
      if (removeOnStart(editor)) return;
      if (exitOnEmpty(editor)) return;
    }
    insertBreak();
  };

  return editor;
};

const BlockquotePlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: ToolbarButton,
  renderElement,
  renderStyle,
  withPlugin,
  locale: [
    {
      locale: Locales.zhCN,
      toolbar: '引用',
    },
    {
      locale: Locales.enUS,
      toolbar: 'blockquote',
    },
  ],
  serialize: (el, props, chils) => {
    return `<blockquote style="${props.style ?? ''}">${chils.join(
      '',
    )}</blockquote>`;
  },
};

export { BlockquotePlugin };
