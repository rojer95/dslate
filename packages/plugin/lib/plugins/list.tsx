import type { DSlatePlugin, RenderElementPropsWithStyle } from '@dslate/core';
import { isEmpty, usePlugin } from '@dslate/core';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';

import { Icon, Toolbar } from '@dslate/component';
import {
  getBlockProps,
  isBlockActive,
  isStart,
  useMessage,
} from '@dslate/core';
import { Editor, Path, Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { Locales } from '@dslate/core';
import { TextIndentPlugin } from './indent';

export const TYPE = 'list';
export const IS_ORDERED = 'listIsOrdered';

/**
 * 移除列表
 */
const remove = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && n.type === TYPE,
    split: true,
  });
};

/**
 * 创建列表
 * @param editor
 * @param isOrdered
 */
const create = (editor: Editor, isOrdered: boolean) => {
  const block = { type: TYPE, children: [], [IS_ORDERED]: isOrdered };
  Transforms.wrapNodes(editor, block);
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
 * 空行退出列表
 */
const exitListOnEmptyListItem = (editor: Editor) => {
  if (!editor.selection || Range.isExpanded(editor.selection)) return false;

  const isActive = isBlockActive(editor, TYPE);
  if (!isActive) return false;

  if (!isEmpty(editor)) return false;

  const path = Editor.above(editor)?.[1];
  if (!path) return false;

  const nextPath = Path.next(Path.parent(path));
  Transforms.moveNodes(editor, {
    at: path,
    to: nextPath,
  });

  return true;
};

const ToolbarButton = () => {
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
    <>
      <Toolbar.Button
        tooltip={getMessage('unorder_tooltip', '无序列表')}
        onClick={() => toggle(false)}
        active={getBlockProps(editor, IS_ORDERED, null) === false}
        icon={<Icon type="icon-unorderedList" />}
      />
      <Toolbar.Button
        tooltip={getMessage('order_tooltip', '有序列表')}
        onClick={() => toggle(true)}
        active={getBlockProps(editor, IS_ORDERED, null) === true}
        icon={<Icon type="icon-orderedList" />}
      />
    </>
  );
};

const List = (props: RenderElementPropsWithStyle) => {
  const { attributes, children, element } = props;
  const isOrdered = element[IS_ORDERED];
  const { props: pluginProps } = usePlugin();

  const ListDom = useMemo(() => {
    const { listStyles } = pluginProps ?? {};
    let start = 0;
    return (Array.isArray(children) ? children : [children]).map(
      (li: any, index: number) => {
        const node = element.children[index];
        const preNode = element.children?.[index - 1];
        const nodeIndent = node?.[TextIndentPlugin.type] ?? 0;
        const preNodeIndent = preNode?.[TextIndentPlugin.type] ?? 0;
        if (nodeIndent !== preNodeIndent) {
          start = 0;
        }

        const listStyleType = !element[IS_ORDERED]
          ? 'disc'
          : listStyles?.[nodeIndent % listStyles?.length] ?? 'decimal';
        let paddingLeft: string | number = 40;

        if (nodeIndent) {
          paddingLeft = `calc(40px + ${nodeIndent * 2}em)`;
        }

        const LiItem = (
          <li
            style={{
              textIndent: `${-nodeIndent * 2}em`,
            }}
          >
            {li}
          </li>
        );
        const style: CSSProperties = {
          listStyleType,
          paddingLeft,
        };

        start++;
        return isOrdered ? (
          <ol start={start} key={li.key} style={style}>
            {LiItem}
          </ol>
        ) : (
          <ul key={li.key} style={style}>
            {LiItem}
          </ul>
        );
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pluginProps, children, isOrdered]);

  return <div {...attributes}>{ListDom}</div>;
};

const renderElement = (props: RenderElementPropsWithStyle) => (
  <List {...props} />
);

const withList = (editor: Editor) => {
  const { deleteBackward, insertBreak } = editor;

  editor.deleteBackward = (unit) => {
    if (removeOnStart(editor)) return;
    deleteBackward(unit);
  };

  editor.insertBreak = () => {
    if (editor.selection && Range.isCollapsed(editor.selection)) {
      if (removeOnStart(editor)) return;
      if (exitListOnEmptyListItem(editor)) return;
    }
    insertBreak();
  };

  return editor;
};

const defaultListStyles: string[] = ['decimal', 'lower-alpha', 'lower-roman'];

const ListPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: ToolbarButton,
  renderElement,
  withPlugin: withList,
  locale: [
    {
      locale: Locales.zhCN,
      unorder_tooltip: '无序列表',
      order_tooltip: '有序列表',
    },
    {
      locale: Locales.enUS,
      unorder_tooltip: 'unordered list',
      order_tooltip: 'ordered list',
    },
  ],
  props: {
    listStyles: defaultListStyles,
  },
  serialize: (element, pluginProps, children) => {
    const isOrdered = element?.[IS_ORDERED];
    const { listStyles } = pluginProps ?? {};
    let start = 0;
    return (Array.isArray(children) ? children : [children])
      .map((li: any, index: number) => {
        const node = element?.children[index];
        const preNode = element?.children?.[index - 1];
        const nodeIndent = node?.[TextIndentPlugin.type] ?? 0;
        const preNodeIndent = preNode?.[TextIndentPlugin.type] ?? 0;

        const style: string[] = [];

        if (nodeIndent !== preNodeIndent) {
          start = 0;
        }

        const listStyleType = !element?.[IS_ORDERED]
          ? 'disc'
          : listStyles?.[nodeIndent % listStyles?.length] ?? 'decimal';

        style.push(`list-style-type: ${listStyleType};`);
        let paddingLeft: string = '40px';

        if (nodeIndent) {
          paddingLeft = `calc(40px + ${nodeIndent * 2}em)`;
        }

        style.push(`padding-left: ${paddingLeft};`);
        const LiItem = `<li style="text-indent: ${
          -nodeIndent * 2
        }em">${li}</li>`;

        start++;
        return isOrdered
          ? `<ol start="${start}" style="${style.join('')}">${LiItem}</ol>`
          : `<ul start="${start}" style="${style.join('')}">${LiItem}</ul>`;
      })
      .join('');
  },

  serializeWeapp: (element, pluginProps, children) => {
    const isOrdered = element?.[IS_ORDERED];
    const { listStyles } = pluginProps ?? {};
    let start = 0;
    return {
      type: 'node',
      name: 'div',
      children: (Array.isArray(children) ? children : [children]).map(
        (li: any, index: number) => {
          const node = element?.children[index];
          const preNode = element?.children?.[index - 1];
          const nodeIndent = node?.[TextIndentPlugin.type] ?? 0;
          const preNodeIndent = preNode?.[TextIndentPlugin.type] ?? 0;

          const style: string[] = [];

          if (nodeIndent !== preNodeIndent) {
            start = 0;
          }

          const listStyleType = !element?.[IS_ORDERED]
            ? 'disc'
            : listStyles?.[nodeIndent % listStyles?.length] ?? 'decimal';

          style.push(`list-style-type: ${listStyleType};`);
          let paddingLeft: string = '40px';

          if (nodeIndent) {
            paddingLeft = `calc(40px + ${nodeIndent * 2}em)`;
          }

          style.push(`padding-left: ${paddingLeft};`);

          start++;

          return {
            type: 'node',
            name: isOrdered ? 'ol' : 'ul',
            attrs: {
              start: isOrdered ? String(start) : undefined,
              style: style.join(''),
            },
            children: [
              {
                type: 'node',
                name: 'li',
                attrs: {
                  style: `text-indent: ${-nodeIndent * 2}em`,
                },
                children: [li],
              },
            ],
          };
        },
      ),
    };
  },
};

export { ListPlugin };
