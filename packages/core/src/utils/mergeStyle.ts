import type { Descendant, Editor } from 'slate';
import type { DSlatePlugin } from '../typing';

export const mergeStyle = (
  node: Descendant,
  plugins: DSlatePlugin[],
  nodeType: string,
  editor: Editor,
) => {
  const targetPlugins = plugins.filter((i) => i.nodeType === nodeType) as DSlatePlugin[];
  return targetPlugins.reduce((preStyle, plugin) => {
    const style: any = { ...preStyle };
    if (!plugin.renderStyle) return { ...style };
    let gstyle = {};
    if (typeof plugin.renderStyle === 'function') {
      gstyle = plugin.renderStyle(node, editor, plugin.props);
    } else if (!!node[plugin.type]) {
      gstyle = plugin.renderStyle;
    }
    return { ...style, ...gstyle };
  }, {});
};
