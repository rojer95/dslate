import React, { useEffect } from 'react';
import type { NodeEntry } from 'slate';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import { Editor, Element, Transforms, Node, Text } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSlate } from 'slate-react';
import { ToolbarSelect } from '../components/Toolbar';
import { usePlugin } from '../PluginContext';
import type { DSlateCustomElement, DSlatePlugin } from '../typing';
import { useMessage } from '../ConfigContext';

const TYPE = 'paragraph';
const DEFAULT_TYPE = 'p';

type TYPES = 'p' | 'h1' | 'h2' | 'h3' | 'h4';

const getActvieType = (editor: Editor): TYPES => {
  const { selection } = editor;
  if (!selection) return DEFAULT_TYPE;

  const [match] = Editor.nodes<DSlateCustomElement>(editor, {
    match: (n) => Element.isElement(n) && n.type === TYPE,
  });

  if (match && match[0] && match[0]?.[TYPE]) {
    return match[0]?.[TYPE];
  }

  return DEFAULT_TYPE;
};

const Toolbar = () => {
  const editor = useSlate();

  const onChange = (type: string) => {
    Transforms.setNodes(
      editor,
      { [TYPE]: type },
      { match: (n) => Element.isElement(n) && n.type === TYPE },
    );
  };

  const activeType = getActvieType(editor);

  const getMessage = useMessage();
  const { disablePlugin, enablePlugin } = usePlugin();

  useEffect(() => {
    if (activeType !== 'p') {
      disablePlugin(['bold', 'font-size']);
    } else {
      enablePlugin(['bold', 'font-size']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType]);

  return (
    <ToolbarSelect<string>
      placeholder={getMessage('p', '正文')}
      width={38}
      onChange={onChange}
      options={[
        {
          value: 'p',
          label: getMessage('p', '正文'),
          placeholder: getMessage('p', '正文'),
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

const renderElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;

  if (element?.[TYPE] === 'h1') {
    return <h1 {...attributes}>{children}</h1>;
  }

  if (element?.[TYPE] === 'h2') {
    return <h2 {...attributes}>{children}</h2>;
  }

  if (element?.[TYPE] === 'h3') {
    return <h3 {...attributes}>{children}</h3>;
  }

  if (element?.[TYPE] === 'h4') {
    return <h4 {...attributes}>{children}</h4>;
  }

  return <p {...attributes}>{children}</p>;
};

const normalizeNode = (editor: Editor, entry: NodeEntry) => {
  const [node, path] = entry;

  /**
   * 标题，移除加粗和字号样式
   */
  if (Element.isElement(node) && ['h1', 'h2', 'h3', 'h4'].includes(node[TYPE])) {
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
  locale: {
    [zhCN.locale]: {
      tooltip: '段落与标题',
      p: '正文',
      h1: '标题1',
      h2: '标题2',
      h3: '标题3',
      h4: '标题4',
    },
    [enUS.locale]: {
      tooltip: 'paragraph and title',
      p: 'P',
      h1: 'H1',
      h2: 'H2',
      h3: 'H3',
      h4: 'H4',
    },
  },
};

export { ParagraphPlugin };
