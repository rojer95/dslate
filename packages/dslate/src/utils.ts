import { Editor, Transforms, Element } from 'slate';
import type { DSlateCustomText, DSlatePlugin } from './typing';

export const mergeStyle = (text: DSlateCustomText, plugins: DSlatePlugin[]) => {
  const textPlugins = plugins.filter((i) => i.nodeType === 'text') as DSlatePlugin[];
  return textPlugins.reduce((preStyle, plugin) => {
    const style: any = { ...preStyle };
    if (!plugin.renderStyle) return { ...style };
    let gstyle;

    if (typeof plugin.renderStyle === 'function') {
      gstyle = plugin.renderStyle(text);
    } else if (!!text[plugin.type]) {
      gstyle = plugin.renderStyle;
    }

    Object.entries(gstyle || {}).map(([key, value]) => {
      if (style[key]) style[key] += ` ${value}`;
      else style[key] = value;
    });
    return style;
  }, {});
};

export const getTextProps = (editor: Editor, format: string, defaultValue: any = false) => {
  const marks = Editor.marks(editor);
  return marks?.[format] ?? defaultValue;
};

export const setTextProps = (editor: Editor, format: string, value: any) => {
  Editor.addMark(editor, format, value);
};

export const toggleTextProps = (editor: Editor, format: string) => {
  const active = getTextProps(editor, format);
  if (active) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    }),
  );

  return !!match;
};

export const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const newProperties: Partial<Element> = {
    type: isActive ? editor.defaultElement ?? 'paragraph' : format,
  };
  Transforms.setNodes<Element>(editor, newProperties);
};
