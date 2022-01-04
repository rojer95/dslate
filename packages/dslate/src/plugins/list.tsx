import React from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import type { DSlatePlugin, RenderElementPropsWithStyle } from '../typing';

import { useSlate } from 'slate-react';
import { ToolbarButton } from '../components/Toolbar';
import { getBlockProps, isBlockActive } from '../utils';
import { useMessage } from '../contexts/ConfigContext';
import IconFont from '../components/IconFont';
import type { NodeEntry } from 'slate';
import { Editor, Element, Transforms, Range, Node, Path } from 'slate';
import { Space } from 'antd';

const TYPE = 'list';
const LIST_TYPE = 'list-type';
const LIST_ITEM = 'list-item';
const UNORDERED_LIST_TYPE = 'unordered-list';
const ORDERED_LIST_TYPE = 'ordered-list';

const remove = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === TYPE,
    split: true,
  });

  Transforms.setNodes(
    editor,
    { type: editor.defaultElement },
    {
      hanging: true,
      match: (n) => Editor.isBlock(editor, n),
    },
  );
};

const create = (editor: Editor, listType: string) => {
  Transforms.setNodes(
    editor,
    { type: LIST_ITEM },
    {
      hanging: true,
      match: (n) => Editor.isBlock(editor, n),
    },
  );

  const block = { type: TYPE, children: [], [LIST_TYPE]: listType };
  Transforms.wrapNodes(editor, block);
};

const emptyListAutoRemove = (editor: Editor) => {
  if (!editor.selection) return false;

  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return Element.isElement(n) && n.type === TYPE && Node.string(n) === '';
    },
  });

  if (!!match) {
    remove(editor);
    return true;
  }

  return false;
};

const emptyListItemMoveToNewLine = (editor: Editor) => {
  if (!editor.selection) return false;

  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return Element.isElement(n) && n.type === LIST_ITEM && Node.string(n) === '';
    },
  });
  if (!!match) {
    const [, path] = match;

    Transforms.moveNodes(editor, {
      at: path,
      to: Path.next(Path.parent(path)),
    });

    Transforms.setNodes(
      editor,
      {
        type: editor.defaultElement,
      },
      {
        at: Path.next(Path.parent(path)),
      },
    );

    return true;
  }

  return false;
};

const Toolbar = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const toggle = (listType: string) => {
    const isList = isBlockActive(editor, TYPE);
    const currentListType = getBlockProps(editor, LIST_TYPE, null);

    if (isList) {
      remove(editor);
      if (currentListType === listType) return;
    }

    create(editor, listType);
  };

  return (
    <Space>
      <ToolbarButton
        tooltip={getMessage('unorder_tooltip', '无序列表')}
        onClick={() => toggle(UNORDERED_LIST_TYPE)}
        active={getBlockProps(editor, LIST_TYPE, null) === UNORDERED_LIST_TYPE}
      >
        <IconFont type="icon-unorderedList" />
      </ToolbarButton>

      <ToolbarButton
        tooltip={getMessage('order_tooltip', '有序列表')}
        onClick={() => toggle(ORDERED_LIST_TYPE)}
        active={getBlockProps(editor, LIST_TYPE, null) === ORDERED_LIST_TYPE}
      >
        <IconFont type="icon-orderedList" />
      </ToolbarButton>
    </Space>
  );
};

const renderElement = (props: RenderElementPropsWithStyle) => {
  const { attributes, children, element, style } = props;
  if (element.type === LIST_ITEM)
    return (
      <li {...attributes} style={style}>
        {children}
      </li>
    );
  if (element[LIST_TYPE] === UNORDERED_LIST_TYPE) {
    return (
      <ul {...attributes} style={style}>
        {children}
      </ul>
    );
  } else {
    return (
      <ol {...attributes} style={style}>
        {children}
      </ol>
    );
  }
};

const withList = (editor: Editor) => {
  const { deleteBackward, insertBreak } = editor;

  editor.deleteBackward = (unit) => {
    if (emptyListAutoRemove(editor)) return;
    deleteBackward(unit);
  };

  editor.insertBreak = () => {
    if (editor.selection && Range.isCollapsed(editor.selection)) {
      if (emptyListAutoRemove(editor)) return;
      if (emptyListItemMoveToNewLine(editor)) return;
    }
    insertBreak();
  };

  return editor;
};

const normalizeNode = (editor: Editor, entry: NodeEntry) => {
  const [, path] = entry;

  /**
   * 把非list-item转为list-item
   */

  for (const [child, childPath] of Node.children(editor, path)) {
    if (child.type !== LIST_ITEM) {
      Transforms.setNodes(editor, { type: LIST_ITEM }, { at: childPath });
      return;
    }
  }
};

const ListPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: <Toolbar />,
  renderElement,
  match: (n) => n.type === LIST_ITEM,
  normalizeNode,
  withPlugin: withList,
  locale: {
    [zhCN.locale]: {
      unorder_tooltip: '无序列表',
      order_tooltip: '有序列表',
    },
    [enUS.locale]: {
      unorder_tooltip: 'unordered list',
      order_tooltip: 'ordered list',
    },
  },
};

export { ListPlugin };
