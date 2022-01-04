import type { Descendant } from 'slate';
import type { DSlatePlugin } from '../typing';

export default function mergeStyle(node: Descendant, plugins: DSlatePlugin[], nodeType: string) {
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
}
