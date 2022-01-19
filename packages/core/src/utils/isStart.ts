import { Editor, Range, Element, Point } from 'slate';

export default function isStart(editor: Editor, type: string) {
  const selection = editor.selection;
  if (selection && Range.isCollapsed(selection)) {
    const [match] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
    });

    if (match) {
      const [, path] = match;
      const start = Editor.start(editor, path);
      if (Point.equals(selection.anchor, start)) {
        return true;
      }
    }
  }
  return false;
}
