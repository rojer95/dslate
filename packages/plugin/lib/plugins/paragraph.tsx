import { Locales, usePlugin } from '@dslate/core';
import React, { useEffect } from 'react';
import type { NodeEntry } from 'slate';

import { Toolbar } from '@dslate/component';
import type {
  DSlateCustomElement,
  DSlatePlugin,
  NormalizeNode,
  RenderElementPropsWithStyle,
} from '@dslate/core';
import { useMessage, usePluginHelper } from '@dslate/core';
import { Editor, Element, Node, Text, Transforms } from 'slate';
import { useSlate } from 'slate-react';

const TYPE = 'paragraph';
const DEFAULT_TYPE = 'paragraph';
const PROPS_KEY = 'paragraphType';

type TYPES = 'paragraph' | 'h1' | 'h2' | 'h3' | 'h4';

const getActvieType = (editor: Editor): TYPES => {
  const { selection } = editor;
  if (!selection) return DEFAULT_TYPE;

  const [match] = Editor.nodes<DSlateCustomElement>(editor, {
    match: (n) => Element.isElement(n) && n.type === TYPE,
  });

  if (match) {
    return match[0]?.[PROPS_KEY] ?? DEFAULT_TYPE;
  }

  return DEFAULT_TYPE;
};

const setType = (editor: Editor, paragraphType: TYPES) => {
  if (!editor.selection) return;
  Transforms.setNodes(editor, { type: TYPE, [PROPS_KEY]: paragraphType });
};

const ToolbarButton = () => {
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
    <Toolbar.Select<TYPES>
      placeholder={getMessage('paragraph', '正文')}
      onChange={onChange}
      width={100}
      options={[
        {
          value: 'paragraph',
          label: getMessage('paragraph', '正文'),
          placeholder: getMessage('paragraph', '正文'),
        },
        {
          value: 'h1',
          label: getMessage('h1', '标题1'),
          placeholder: getMessage('h1', '标题1'),
        },
        {
          value: 'h2',
          label: getMessage('h2', '标题2'),
          placeholder: getMessage('h2', '标题2'),
        },
        {
          value: 'h3',
          label: getMessage('h3', '标题3'),
          placeholder: getMessage('h3', '标题3'),
        },
        {
          value: 'h4',
          label: getMessage('h4', '标题4'),
          placeholder: getMessage('h4', '标题4'),
        },
      ]}
      tooltip={getMessage('tooltip', '段落与标题')}
      value={activeType}
    />
  );
};

const Paragraph = ({
  attributes,
  children,
  element,
  style,
}: RenderElementPropsWithStyle) => {
  const { props } = usePlugin();

  if (element?.[PROPS_KEY] === 'h1') {
    return (
      <h1 {...attributes} style={style}>
        {children}
      </h1>
    );
  }

  if (element?.[PROPS_KEY] === 'h2') {
    return (
      <h2 {...attributes} style={style}>
        {children}
      </h2>
    );
  }

  if (element?.[PROPS_KEY] === 'h3') {
    return (
      <h3 {...attributes} style={style}>
        {children}
      </h3>
    );
  }

  if (element?.[PROPS_KEY] === 'h4') {
    return (
      <h4 {...attributes} style={style}>
        {children}
      </h4>
    );
  }

  if (props?.tag) {
    return React.createElement(
      props?.tag,
      {
        ...attributes,
        style,
      },
      children,
    );
  }

  return (
    <div {...attributes} style={style}>
      {children}
    </div>
  );
};
const renderElement = (props: RenderElementPropsWithStyle) => {
  return <Paragraph {...props} />;
};

const normalizeNode = (
  entry: NodeEntry,
  editor: Editor,
  next: NormalizeNode,
) => {
  const [node, path] = entry;

  /**
   * 标题，移除加粗和字号样式
   */
  if (
    node.type === TYPE &&
    ['h1', 'h2', 'h3', 'h4'].includes(node[PROPS_KEY])
  ) {
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

  next(entry);
};

const ParagraphPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: ToolbarButton,
  renderElement,
  normalizeNode,
  isDefaultElement: true,
  locale: [
    {
      locale: Locales.zhCN,
      tooltip: '段落与标题',
      paragraph: '正文',
      h1: '标题1',
      h2: '标题2',
      h3: '标题3',
      h4: '标题4',
    },
    {
      locale: Locales.enUS,
      tooltip: 'paragraph and title',
      paragraph: 'paragraph',
      h1: 'H1',
      h2: 'H2',
      h3: 'H3',
      h4: 'H4',
    },
  ],
  serialize: (element, props, children) => {
    const isEmpty = Node.string(element) === '';
    let tag = props?.tag || 'div';

    if (element?.[PROPS_KEY] === 'h1') {
      tag = 'h1';
    }

    if (element?.[PROPS_KEY] === 'h2') {
      tag = 'h2';
    }

    if (element?.[PROPS_KEY] === 'h3') {
      tag = 'h3';
    }

    if (element?.[PROPS_KEY] === 'h4') {
      tag = 'h4';
    }
    return `<${tag} style="${props?.style ?? ''}">${children.join('')}${
      isEmpty ? '&nbsp;' : ''
    }</${tag}>`;
  },
  serializeWeapp: (element, props, children) => {
    let tag = props?.tag || 'div';

    if (element?.[PROPS_KEY] === 'h1') {
      tag = 'h1';
    }

    if (element?.[PROPS_KEY] === 'h2') {
      tag = 'h2';
    }

    if (element?.[PROPS_KEY] === 'h3') {
      tag = 'h3';
    }

    if (element?.[PROPS_KEY] === 'h4') {
      tag = 'h4';
    }

    return {
      type: 'node',
      name: tag,
      children,
    };
  },
};

export { ParagraphPlugin };
