import { Icon, Toolbar } from '@dslate/component';
import type { DSlatePlugin, RenderElementPropsWithStyle } from '@dslate/core';
import { isBlockActive, isStart, Locales, useMessage } from '@dslate/core';
import { Editor, Element, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { IS_ORDERED, TYPE as LIST_TYPE } from './list';

const TYPE = 'todo-list';

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();
  const toggle = () => {
    const isActive = isBlockActive(editor, TYPE);
    Editor.withoutNormalizing(editor, () => {
      Transforms.unwrapNodes(editor, {
        match: (n) =>
          Element.isElement(n) && !Editor.isEditor(n) && n.type === LIST_TYPE,
      });
      Transforms.setNodes(
        editor,
        { type: isActive ? editor.defaultElement : TYPE, [IS_ORDERED]: null },
        {
          hanging: true,
          match: (n) => Element.isElement(n) && !Editor.isEditor(n),
        },
      );
    });
  };
  return (
    <Toolbar.Button
      tooltip={getMessage('tooltip', '任务列表')}
      active={isBlockActive(editor, TYPE)}
      onClick={toggle}
      icon={<Icon type="icon-multipleChoiceList" />}
    />
  );
};

const renderElement = (props: RenderElementPropsWithStyle, editor: Editor) => {
  const { attributes, children, style, element } = props;

  const onChange = (e: any) => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(
      editor,
      {
        checked: e.target.checked,
      },
      { at: path },
    );
  };
  return (
    <p {...attributes} style={style}>
      <span contentEditable={false} style={{ marginRight: 6 }}>
        <input type="checkbox" onChange={onChange} checked={element?.checked} />
      </span>
      {children}
    </p>
  );
};

const withTodoList = (editor: Editor) => {
  const { deleteBackward } = editor;

  editor.deleteBackward = (...args) => {
    if (isStart(editor, TYPE)) {
      Transforms.setNodes(
        editor,
        {
          type: editor.defaultElement,
        },
        {
          match: (n) =>
            !Editor.isEditor(n) && Element.isElement(n) && n.type === TYPE,
        },
      );
    }
    deleteBackward(...args);
  };

  return editor;
};

const TodoListPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: ToolbarButton,
  renderElement,
  withPlugin: withTodoList,
  locale: [
    {
      locale: Locales.zhCN,
      tooltip: '任务列表',
    },
    {
      locale: Locales.enUS,
      tooltip: 'todo list',
    },
  ],
  serialize: (element, props, children) => {
    return `<p style="${
      props.style ?? ''
    }"><span style={{ marginRight: 6 }}><input type="checkbox" /></span>${children.join(
      '',
    )}</p>`;
  },
};

export { TodoListPlugin };
