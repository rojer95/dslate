import type { Descendant, NodeEntry } from 'slate';
import { Editor, Transforms, Element } from 'slate';
import type { DSlateCustomElement, DSlatePlugin, Locale } from './typing';

export function get(source: Locale, path: string, defaultValue?: string): string | undefined {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = source;
  let message = defaultValue;
  // eslint-disable-next-line no-restricted-syntax
  for (const p of paths) {
    message = Object(result)[p];
    result = Object(result)[p];
    if (message === undefined) {
      return defaultValue;
    }
  }
  return message;
}

export const mergeStyle = (node: Descendant, plugins: DSlatePlugin[], nodeType: string) => {
  const textPlugins = plugins.filter((i) => i.nodeType === nodeType) as DSlatePlugin[];
  return textPlugins.reduce((preStyle, plugin) => {
    const style: any = { ...preStyle };
    if (!plugin.renderStyle) return { ...style };
    let gstyle;

    if (typeof plugin.renderStyle === 'function') {
      gstyle = plugin.renderStyle(node);
    } else if (!!node[plugin.type]) {
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

export const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    }),
  );

  return !!match;
};

export const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  Transforms.setNodes(
    editor,
    { type: isActive ? editor.defaultElement : format },
    {
      hanging: true,
      match: (n) => n.type === (isActive ? format : editor.defaultElement),
    },
  );
};

export const getBlockProps = (editor: Editor, format: string, defaultValue: any) => {
  const { selection } = editor;

  if (!selection) {
    return defaultValue;
  }

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && format in n,
  });

  if (!match) return defaultValue;
  const [node] = match as NodeEntry<DSlateCustomElement>;
  return node[format] ?? defaultValue;
};

export const setBlockProps = (editor: Editor, format: string, value: any) => {
  const { selection } = editor;

  if (!selection) return;

  Transforms.setNodes(
    editor,
    { [format]: value },
    { match: (n) => !Editor.isEditor(n) && Element.isElement(n) },
  );
};

export const clearBlockProps = (editor: Editor, format: string | string[]) => {
  const { selection } = editor;

  if (!selection) return;

  Transforms.unsetNodes(editor, format, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n),
  });
};
