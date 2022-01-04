import React, { useEffect } from 'react';
import type { NodeEntry } from 'slate';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import { Editor, Element, Transforms, Node, Text } from 'slate';
import { useSlate } from 'slate-react';
import { ToolbarSelect } from '../components/Toolbar';
import { usePluginHelper } from '../contexts/PluginContext';
import type { DSlateCustomElement, DSlatePlugin, RenderElementPropsWithStyle } from '../typing';
import { useMessage } from '../contexts/ConfigContext';

const TYPE = 'paragraph';
const DEFAULT_TYPE = 'paragraph';

type TYPES = 'paragraph' | 'h1' | 'h2' | 'h3' | 'h4';
const types = ['paragraph', 'h1', 'h2', 'h3', 'h4'];

const getActvieType = (editor: Editor): TYPES => {
  const { selection } = editor;
  if (!selection) return DEFAULT_TYPE;

  const [match] = Editor.nodes<DSlateCustomElement>(editor, {
    match: (n) => Element.isElement(n) && types.includes(n.type),
  });

  if (match) {
    return match[0]?.type as TYPES;
  }

  return DEFAULT_TYPE;
};

const setType = (editor: Editor, type: TYPES) => {
  if (!editor.selection) return;
  Transforms.setNodes(editor, { type });
};

const Toolbar = () => {
  const editor = useSlate();

  const onChange = (type: TYPES) => {
    setType(editor, type);
  };

  const activeType = getActvieType(editor);

  const getMessage = useMessage();
  const { disablePluginByType, enablePluginByType } = usePluginHelper();

  useEffect(() => {
    if (activeType !== 'paragraph') {
      disablePluginByType?.(['bold', 'font-size']);
    } else {
      enablePluginByType?.(['bold', 'font-size']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType]);

  return (
    <ToolbarSelect<TYPES>
      placeholder={getMessage('paragraph', '正文')}
      onChange={onChange}
      options={[
        {
          value: 'paragraph',
          label: getMessage('paragraph', '正文'),
          placeholder: getMessage('paragraph', '正文'),
        },
        {
          value: 'h1',
          label: <h1 style={{ margin: 0 }}>{getMessage('h1', '标题1')}</h1>,
          placeholder: getMessage('h1', '标题1'),
        },
        {
          value: 'h2',
          label: <h2 style={{ margin: 0 }}>{getMessage('h2', '标题2')}</h2>,
          placeholder: getMessage('h2', '标题2'),
        },
        {
          value: 'h3',
          label: <h3 style={{ margin: 0 }}>{getMessage('h3', '标题3')}</h3>,
          placeholder: getMessage('h3', '标题3'),
        },
        {
          value: 'h4',
          label: <h4 style={{ margin: 0 }}>{getMessage('h4', '标题4')}</h4>,
          placeholder: getMessage('h4', '标题4'),
        },
      ]}
      tooltip={getMessage('tooltip', '段落与标题')}
      value={activeType}
    />
  );
};

const renderElement = (props: RenderElementPropsWithStyle) => {
  const { attributes, children, element, style } = props;

  if (element?.type === 'h1') {
    return (
      <h1 {...attributes} style={style}>
        {children}
      </h1>
    );
  }

  if (element?.type === 'h2') {
    return (
      <h2 {...attributes} style={style}>
        {children}
      </h2>
    );
  }

  if (element?.type === 'h3') {
    return (
      <h3 {...attributes} style={style}>
        {children}
      </h3>
    );
  }

  if (element?.type === 'h4') {
    return (
      <h4 {...attributes} style={style}>
        {children}
      </h4>
    );
  }

  return (
    <p {...attributes} style={style}>
      {children}
    </p>
  );
};

const normalizeNode = (editor: Editor, entry: NodeEntry) => {
  const [node, path] = entry;

  /**
   * 标题，移除加粗和字号样式
   */
  if (Element.isElement(node) && ['h1', 'h2', 'h3', 'h4'].includes(node.type)) {
    for (const [child, childPath] of Node.children(editor, path)) {
      if (
        Text.isText(child) &&
        (Object.hasOwnProperty.call(child, 'bold') ||
          Object.hasOwnProperty.call(child, 'font-size'))
      ) {
        Transforms.unsetNodes(editor, ['bold', 'font-size'], { at: childPath });
        return;
      }
    }
  }
};

const ParagraphPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: <Toolbar />,
  renderElement,
  normalizeNode,
  isDefaultElement: true,
  match: (n) => types.includes(n.type),
  locale: {
    [zhCN.locale]: {
      tooltip: '段落与标题',
      paragraph: '正文',
      h1: '标题1',
      h2: '标题2',
      h3: '标题3',
      h4: '标题4',
    },
    [enUS.locale]: {
      tooltip: 'paragraph and title',
      paragraph: 'paragraph',
      h1: 'H1',
      h2: 'H2',
      h3: 'H3',
      h4: 'H4',
    },
  },
};

export { ParagraphPlugin };
