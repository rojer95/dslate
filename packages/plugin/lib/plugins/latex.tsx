import { Icon, Popover, Textarea, Toolbar } from '@dslate/component';
import {
  DSlatePlugin,
  isBlockActive,
  Locales,
  RenderElementPropsWithStyle,
  useMessage,
  usePlugin,
} from '@dslate/core';
import parseKatexWeapp from '@rojer/katex-mini';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useMemo } from 'react';
import { Editor, Text, Transforms } from 'slate';
import { ReactEditor, useSelected, useSlate } from 'slate-react';
const TYPE = 'latex';

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
      at: editor.selection,
      match: (n) => Text.isText(n),
      split: true,
    },
  );
};

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const toggle = () => {
    if (!editor.selection) return;
    const isActive = isBlockActive(editor, TYPE);
    if (isActive) {
      remove(editor);
    } else {
      add(editor);
    }
  };

  return (
    <Toolbar.Button
      tooltip={getMessage('latex', 'Latex')}
      active={isBlockActive(editor, TYPE)}
      onClick={toggle}
      icon={<Icon type="icon-icon_adddec" />}
    />
  );
};

const LatexWrap = ({
  attributes,
  element,
  children,
}: RenderElementPropsWithStyle) => {
  const selected = useSelected();
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);
  const getMessage = useMessage();
  const { props } = usePlugin();

  const LatexDom = useMemo(() => {
    if (typeof element.formula !== 'string' || !element.formula) {
      return (
        <span style={{ cursor: 'pointer', color: 'blue' }}>
          {getMessage('edit', '点击编辑Latex')}
        </span>
      );
    }

    const html = katex.renderToString(element.formula, {
      displayMode: props?.displayMode,
      throwOnError: false,
    });

    return (
      <span
        contentEditable={false}
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ cursor: 'pointer' }}
      />
    );
  }, [element.formula, props?.displayMode]);

  return (
    <span {...attributes}>
      <span contentEditable={false} style={{ padding: '0px 4px' }}>
        <Popover
          visible={selected}
          placement="top"
          content={
            <div
              style={{
                padding: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
                width: 'max-content',
              }}
            >
              <div>{getMessage('latex', 'Latex')}：</div>
              <Textarea
                value={element.formula}
                style={{ width: 300 }}
                onChange={(value: any) => {
                  Transforms.setNodes(
                    editor,
                    {
                      formula: value,
                    },
                    {
                      at: path,
                    },
                  );
                }}
                autosize
              />
              <Toolbar.Button
                tooltip={getMessage('remove', '删除')}
                onClick={() => {
                  Transforms.unwrapNodes(editor, {
                    at: path,
                    split: true,
                  });
                }}
              >
                <Icon type="icon-empty" />
              </Toolbar.Button>
            </div>
          }
        >
          {LatexDom}
        </Popover>
      </span>
      {children}
    </span>
  );
};

const renderElement = (props: RenderElementPropsWithStyle) => {
  return <LatexWrap {...props} />;
};

const LatexPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  isVoid: true,
  isInline: true,
  renderElement,
  toolbar: ToolbarButton,
  props: {
    displayMode: false,
  },
  locale: [
    { locale: Locales.zhCN, remove: '删除', latex: 'Latex', edit: '点击编辑' },
    {
      locale: Locales.enUS,
      remove: 'remove',
      latex: 'Latex',
      edit: 'click edit',
    },
  ],
  serialize: (element, pluginProps) => {
    if (typeof element.formula === 'string') {
      return katex.renderToString(element.formula, {
        displayMode: pluginProps.displayMode,
        throwOnError: false,
      });
    }
    return '';
  },

  serializeWeapp: (element, pluginProps) => {
    if (typeof element.formula === 'string') {
      return {
        type: 'node',
        name: 'span',
        children: parseKatexWeapp(element.formula, {
          throwError: false,
          displayMode: pluginProps.displayMode,
        }),
      };
    }
    return {
      type: 'text',
      text: '',
    };
  },
};

export { LatexPlugin };
