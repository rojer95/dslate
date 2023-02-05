import type { NodeEntry } from "slate";
import { Editor, Transforms, Element } from "slate";
import type { DSlateCustomElement } from "../typing";

export const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        Editor.isBlock(editor, n) &&
        n.type === format,
    })
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
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        Editor.isBlock(editor, n) &&
        n.type === (isActive ? format : editor.defaultElement),
    }
  );
};

export const getBlockProps = (
  editor: Editor,
  format: string,
  defaultValue: any
) => {
  const { selection } = editor;

  if (!selection) {
    return defaultValue;
  }

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      Editor.isBlock(editor, n) &&
      format in n,
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
    {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        Editor.isBlock(editor, n),
    }
  );
};

export const clearBlockProps = (editor: Editor, format: string | string[]) => {
  const { selection } = editor;

  if (!selection) return;

  Transforms.unsetNodes(editor, format, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && Editor.isBlock(editor, n),
  });
};
