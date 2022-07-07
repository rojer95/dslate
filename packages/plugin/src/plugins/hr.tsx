import { IconFont, Popover, Toolbar } from '@dslate/component';
import type { DSlatePlugin, RenderElementPropsWithStyle } from '@dslate/core';
import { isBlockActive, useMessage, usePlugin } from '@dslate/core';
import type { Descendant } from 'slate';
import { Editor, Path, Range, Transforms } from 'slate';
import { ReactEditor, useSelected, useSlate } from 'slate-react';
import { Locales } from '@dslate/core';
import type { CSSProperties } from 'react';
import { css } from '@emotion/css';

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
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, props.element);
  const getMessage = useMessage();

  return (
    <div {...props.attributes} style={props.style}>
      <div contentEditable={false}>
        <Popover
          overlayInnerStyle={{
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            whiteSpace: 'nowrap',
          }}
          overlay={
            <>
              <Toolbar.Button
                tooltip={getMessage('remove', '删除')}
                onClick={() => {
                  Transforms.removeNodes(editor, {
                    at: path,
                  });
                }}
              >
                <IconFont
                  type="icon-empty"
                  style={{
                    color: 'red',
                  }}
                />
              </Toolbar.Button>
            </>
          }
        >
          <div
            className={css`
              padding: 10px 0px;
              cursor: pointer;
              .hr {
                border-bottom: 1px solid ${!selected ? pluginProps?.color : pluginProps?.hoverColor};
              }
            `}
          >
            <div className="hr" />
          </div>
        </Popover>
      </div>
      {props.children}
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
      locale: Locales.zhCN,
      toolbar: '分割线',
      remove: '删除',
    },
    {
      locale: Locales.enUS,
      toolbar: 'split line',
      remove: 'remove',
    },
  ],
  serialize: (e, p) => `<hr style="backgroud-color: ${p.color};height: 1px;border: none;" />`,
};

export { HrPlugin };
