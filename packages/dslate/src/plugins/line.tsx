import { Select } from 'antd';
import React from 'react';
import type { NodeEntry } from 'slate';
import { Editor, Element, Transforms, Node, Text } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSlate } from 'slate-react';
import { ToolbarButton } from '../components/Toolbar';
import type { DSlateCustomElement, DSlatePlugin } from '../typing';

const TYPE = 'line';
const DEFAULT_LINE = 'p';

type LINE = 'p' | 'h1' | 'h2' | 'h3' | 'h4';

const getActvieType = (editor: Editor): LINE => {
  const [match] = Editor.nodes<DSlateCustomElement>(editor, {
    match: (n) => Element.isElement(n) && n.type === TYPE,
  });

  if (match && match[0] && match[0]?.[TYPE]) {
    return match[0]?.[TYPE];
  }

  return DEFAULT_LINE;
};

const Toolbar = () => {
  const editor = useSlate();

  const onChange = (size: LINE) => {
    Transforms.setNodes(
      editor,
      { [TYPE]: size },
      { match: (n) => Element.isElement(n) && n.type === TYPE },
    );
  };

  return (
    <ToolbarButton tooltip="正文与标题">
      <Select<LINE>
        onChange={onChange}
        value={getActvieType(editor)}
        style={{ width: 150 }}
        bordered={false}
      >
        <Select.Option value="p">正文</Select.Option>
        <Select.Option value="h1">
          <span style={{ fontSize: 22 }}>标题1</span>
          <span style={{ color: 'rgba(0,0,0,0.5)', marginLeft: 8, fontSize: 12 }}>(H1)</span>
        </Select.Option>
        <Select.Option value="h2">
          <span style={{ fontSize: 20 }}>标题2</span>
          <span style={{ color: 'rgba(0,0,0,0.5)', marginLeft: 8, fontSize: 12 }}>(H2)</span>
        </Select.Option>
        <Select.Option value="h3">
          <span style={{ fontSize: 18 }}>标题3</span>
          <span style={{ color: 'rgba(0,0,0,0.5)', marginLeft: 8, fontSize: 12 }}>(H3)</span>
        </Select.Option>
        <Select.Option value="h4">
          <span style={{ fontSize: 16 }}>标题4</span>
          <span style={{ color: 'rgba(0,0,0,0.5)', marginLeft: 8, fontSize: 12 }}>(H4)</span>
        </Select.Option>
      </Select>
    </ToolbarButton>
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

  return <div {...attributes}>{children}</div>;
};

const normalizeNode = (editor: Editor, entry: NodeEntry) => {
  const [node, path] = entry;

  /**
   * 大标题，移除加粗和字号
   */
  if (Element.isElement(node) && ['h1', 'h2', 'h3', 'h4'].includes(node[TYPE])) {
    for (const [child, childPath] of Node.children(editor, path)) {
      if (
        Text.isText(child) &&
        (Object.hasOwnProperty.call(child, 'bold') ||
          Object.hasOwnProperty.call(child, 'font-size'))
      ) {
        Transforms.setNodes(editor, { bold: null, ['font-size']: null }, { at: childPath });
        return;
      }
    }
  }
};

const LinePlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: <Toolbar />,
  renderElement,
  normalizeNode,
};

export { LinePlugin };
