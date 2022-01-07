import React from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import type { DSlatePlugin, NormalizeNode, RenderElementPropsWithStyle } from '../typing';

import { useSlate } from 'slate-react';
import { ToolbarButton } from '../components/Toolbar';
import { getBlockProps, isBlockActive } from '../utils';
import { useMessage } from '../contexts/ConfigContext';
import IconFont from '../components/IconFont';
import type { Descendant, NodeEntry } from 'slate';
import { Editor, Element, Transforms, Range, Node, Path } from 'slate';
import { Space } from 'antd';
import { TextIndentPlugin } from './indent';

const TYPE = 'list';
const ITEM_TYPE = 'list-item';
const IS_ORDERED = 'listIsOrdered';
const LIST_START_KEY = 'listStart';

/**
 * 获取缩进列表的
 */
const getListIndent = (n: Node) => n?.children?.[0]?.[TextIndentPlugin.type] ?? 0;

/**
 * 移除列表
 */
const remove = (editor: Editor) => {
  Editor.withoutNormalizing(editor, () => {
    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === TYPE,
      split: true,
    });

    Transforms.setNodes(
      editor,
      { type: editor.defaultElement, [IS_ORDERED]: null },
      {
        hanging: true,
        match: (n) => Editor.isBlock(editor, n),
      },
    );
  });
};

/**
 * 创建列表
 * @param editor
 * @param isOrdered
 */
const create = (editor: Editor, isOrdered: boolean) => {
  Editor.withoutNormalizing(editor, () => {
    Transforms.setNodes(
      editor,
      { type: ITEM_TYPE, [IS_ORDERED]: isOrdered },
      {
        hanging: true,
        match: (n) => Editor.isBlock(editor, n),
      },
    );

    const block = { type: TYPE, children: [], [IS_ORDERED]: isOrdered };
    Transforms.wrapNodes(editor, block);
  });
};

/**
 * 是否处于开头处
 */
const isStart = (editor: Editor, type: string) => {
  if (!editor.selection || Range.isExpanded(editor.selection)) return false;

  const [match] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.type === type,
  });

  if (!!match) {
    return Editor.isStart(editor, editor.selection?.focus, match[1]);
  }

  return false;
};

/**
 * 重新构建列表序号
 */
const buildListNumber = (editor: Editor) => {
  Editor.withoutNormalizing(editor, () => {
    const nodes = Array.from(
      Editor.nodes(editor, {
        at: [],
        match: (n) => n.type === TYPE,
      }),
    );

    for (const [node, path] of nodes) {
      let searchPath = path;
      let start = 1;

      do {
        const pre = Editor.previous(editor, {
          at: searchPath,
        });

        if (!pre || pre[0].type !== TYPE) break;

        const [preNode, prePath] = pre;

        searchPath = prePath;
        if (getListIndent(preNode) === getListIndent(node)) {
          start = preNode[LIST_START_KEY] ?? 0;
          start++;
          break;
        }
      } while (true);

      Transforms.setNodes(
        editor,
        {
          [LIST_START_KEY]: start,
        },
        {
          at: path,
        },
      );
    }
  });
};

/**
 * 在开头处可以进行删除
 */
const removeOnStart = (editor: Editor) => {
  if (isStart(editor, TYPE)) {
    remove(editor);
    buildListNumber(editor);
    return true;
  }
  return false;
};

/**
 * 空行退出列表
 */
const exitListOnEmptyListItem = (editor: Editor) => {
  if (!editor.selection) return false;

  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return Element.isElement(n) && n.type === ITEM_TYPE && Node.string(n) === '';
    },
  });

  if (!!match) {
    Editor.withoutNormalizing(editor, () => {
      const [, path] = match;
      const nextPath = Path.next(Path.parent(path));
      Transforms.moveNodes(editor, {
        at: path,
        to: nextPath,
      });

      Transforms.setNodes(
        editor,
        {
          type: editor.defaultElement,
          [IS_ORDERED]: null,
        },
        {
          at: nextPath,
        },
      );
    });

    buildListNumber(editor);
    return true;
  }

  return false;
};

const Toolbar = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const toggle = (isOrdered: boolean) => {
    const isList = isBlockActive(editor, TYPE);
    const currentIsOrder = getBlockProps(editor, IS_ORDERED, false);

    if (isList) {
      remove(editor);
      if (currentIsOrder === isOrdered) return;
    }

    create(editor, isOrdered);
  };

  return (
    <Space>
      <ToolbarButton
        tooltip={getMessage('unorder_tooltip', '无序列表')}
        onClick={() => toggle(false)}
        active={getBlockProps(editor, IS_ORDERED, null) === false}
      >
        <IconFont type="icon-unorderedList" />
      </ToolbarButton>

      <ToolbarButton
        tooltip={getMessage('order_tooltip', '有序列表')}
        onClick={() => toggle(true)}
        active={getBlockProps(editor, IS_ORDERED, null) === true}
      >
        <IconFont type="icon-orderedList" />
      </ToolbarButton>
    </Space>
  );
};

const renderElement = (props: RenderElementPropsWithStyle) => {
  const { attributes, children, element, style } = props;
  if (element[IS_ORDERED]) {
    return (
      <ol {...attributes} style={style} start={element?.[LIST_START_KEY] ?? 1}>
        {children}
      </ol>
    );
  }

  return (
    <ul {...attributes} style={style}>
      {children}
    </ul>
  );
};

const withList = (editor: Editor) => {
  const { deleteBackward, insertBreak } = editor;

  editor.deleteBackward = (unit) => {
    if (removeOnStart(editor)) return;
    deleteBackward(unit);
    buildListNumber(editor);
  };

  editor.insertBreak = () => {
    if (editor.selection && Range.isCollapsed(editor.selection)) {
      if (removeOnStart(editor)) return;
      if (exitListOnEmptyListItem(editor)) return;
    }
    insertBreak();
    buildListNumber(editor);
  };

  editor.onIndent = () => {
    buildListNumber(editor);
  };

  return editor;
};

const normalizeNode = (entry: NodeEntry, editor: Editor, next: NormalizeNode) => {
  const [node, path] = entry;
  if (node.type === TYPE) {
    if (node.children.length > 1) {
      // split
      Transforms.unwrapNodes(editor, {
        at: path,
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === TYPE,
        split: true,
      });
      return;
    }

    for (const [child, childPath] of Node.children(editor, path)) {
      if (child.type !== ITEM_TYPE) {
        Transforms.setNodes(editor, { type: ITEM_TYPE }, { at: childPath });
        return;
      }
    }
  }

  next(entry);
};

const listStyles: Record<number, string> = {
  0: 'decimal',
  1: 'lower-alpha',
  2: 'lower-roman',
};

const renderStyle = (element: Descendant) => {
  if (element.type === TYPE) {
    const firstChildren = element.children?.[0];
    const indent = firstChildren ? firstChildren[TextIndentPlugin.type] : 0;
    const listStyleType = !element[IS_ORDERED] ? 'disc' : listStyles[indent % 3];
    if (indent) {
      return {
        listStyleType,
        paddingLeft: `calc(40px + ${indent * 2}em)`,
      };
    }

    return {
      listStyleType,
      paddingLeft: 40,
    };
  }

  return {};
};

const ListPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: <Toolbar />,
  renderElement,
  renderStyle,
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

const normalizeNodeItem = (entry: NodeEntry, editor: Editor, next: NormalizeNode) => {
  const [node, path] = entry;

  if (node.type === ITEM_TYPE) {
    const [parent] = Editor.parent(editor, path);
    if (Editor.isEditor(parent) || parent.type !== TYPE) {
      Transforms.wrapNodes(
        editor,
        {
          type: TYPE,
          [IS_ORDERED]: node[IS_ORDERED],
          children: [],
        },
        {
          at: path,
        },
      );
      return;
    }
  }

  next(entry);
};

const renderElementItem = (props: RenderElementPropsWithStyle) => {
  const { attributes, children, style } = props;
  return (
    <li {...attributes} style={style}>
      {children}
    </li>
  );
};

const ListItemPlugin: DSlatePlugin = {
  type: ITEM_TYPE,
  nodeType: 'element',
  renderElement: renderElementItem,
  normalizeNode: normalizeNodeItem,
};

export { ListPlugin, ListItemPlugin };
