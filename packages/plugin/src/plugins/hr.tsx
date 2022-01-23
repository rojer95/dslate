import { IconFont, Toolbar } from '@dslate/component';
import type { DSlatePlugin, RenderElementPropsWithStyle } from '@dslate/core';
import { isBlockActive, useMessage, usePlugin } from '@dslate/core';
import type { Descendant } from 'slate';
import { Editor, Path, Range, Transforms } from 'slate';
import { useSelected, useSlate } from 'slate-react';
import { Divider } from 'antd';
import locale from '../locale';
import type { CSSProperties } from 'react';

const TYPE = 'hr';

const insertHr = (editor: Editor) => {
  Editor.withoutNormalizing(editor, () => {
    if (!editor.selection) return;
    if (Range.isExpanded(editor.selection)) {
      Transforms.delete(editor);
    }
    Transforms.insertNodes(editor, {
      type: TYPE,
      children: [{ text: '' }],
    });
  });
};

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  return (
    <Toolbar.Button
      active={isBlockActive(editor, TYPE)}
      onClick={() => insertHr(editor)}
      tooltip={getMessage('toolbar', '分割线')}
    >
      <IconFont type="icon-hr" />
    </Toolbar.Button>
  );
};

const remove = (editor: Editor) => {
  Transforms.removeNodes(editor, {
    match: (n) => n.type === TYPE,
  });
};

const withPlugin = (editor: Editor) => {
  const { deleteBackward, deleteForward, insertBreak } = editor;
  editor.deleteBackward = (t) => {
    const is = isBlockActive(editor, TYPE);
    if (is) {
      return remove(editor);
    }
    deleteBackward(t);
  };

  editor.deleteForward = (t) => {
    const is = isBlockActive(editor, TYPE);
    if (is) {
      return remove(editor);
    }
    deleteForward(t);
  };

  editor.insertBreak = () => {
    if (editor.selection) {
      const [hr] = Editor.nodes(editor, {
        match: (n) => n.type === TYPE,
      });
      if (!!hr) {
        const [, hrpath] = hr;
        Editor.withoutNormalizing(editor, () => {
          Transforms.insertNodes(
            editor,
            { type: editor.defaultElement, children: [{ text: '' }] } as Descendant,
            {
              at: Path.next(hrpath),
            },
          );

          Transforms.select(editor, Path.next(hrpath));
        });
        return;
      }
    }
    insertBreak();
  };

  return editor;
};

const Hr = (props: RenderElementPropsWithStyle) => {
  const selected = useSelected();
  const { props: pluginProps } = usePlugin();

  return (
    <div {...props.attributes} style={props.style}>
      {props.children}
      <div contentEditable={false}>
        <Divider
          style={{
            borderColor: !selected ? pluginProps?.color : pluginProps?.hoverColor,
          }}
        />
      </div>
    </div>
  );
};
const renderElement = (props: RenderElementPropsWithStyle) => <Hr {...props} />;

const renderStyle = (node: Descendant) => {
  if (node.type === TYPE) {
    return {
      padding: '10px 0px',
      border: '1px solid transparent',
      borderRadius: 4,
    } as CSSProperties;
  }
  return {};
};

const HrPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  isVoid: true,
  toolbar: <ToolbarButton />,
  renderElement,
  renderStyle,
  withPlugin,
  props: {
    color: 'rgba(0, 0, 0, 0.06)',
    hoverColor: '#1890ff',
  },
  locale: [
    {
      locale: locale.zhCN,
      toolbar: '分割线',
    },
    {
      locale: locale.enUS,
      toolbar: 'split line',
    },
  ],
};

export { HrPlugin };
