import { Editor, Transforms, Text as SlateText } from 'slate';
import type {
  DSlateCustomText,
  DSlatePluginContext,
  DSlateSomePluginContext,
  DSlatePlugin,
} from './typing';

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

export const isTextActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes<DSlateCustomText>(editor, {
    match: (n) => SlateText.isText(n) && !!n?.[format],
  });

  return !!match;
};

export const toggleTextProps = (editor: Editor, format: string, value: any = true) => {
  const active = isTextActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: active ? null : value },
    { match: (n) => SlateText.isText(n), split: true },
  );
};

export const getPluginContext: (
  name: string,
  context: DSlatePluginContext | null,
) => DSlateSomePluginContext = (name: string, context: DSlatePluginContext | null) => {
  const { data = {}, update = () => {} } = context ?? {};

  const mergeUpdate = (mergeData: any) => {
    update(name, {
      ...(data?.[name] ?? {}),
      ...mergeData,
    });
  };

  return {
    data: data?.[name] ?? {},
    update: mergeUpdate,
  };
};
