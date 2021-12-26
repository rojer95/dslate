import React, { useCallback, useContext, useMemo, useState } from 'react';
import type { Editor, NodeEntry } from 'slate';
import { createEditor, Element, Text } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { withHistory } from 'slate-history';
import { ConfigProvider } from 'antd';
import DSlateContext, { PluginContext } from '../../context';
import { mergeStyle } from '../../utils';
import { Toolbar } from '../Toolbar';

import './index.less';
import type { DSlatePlugin, DSlateProps } from '../../typing';

const withPlugins = (editor: Editor, plugins: DSlatePlugin[]) => {
  return plugins.reduce<Editor>((preEditor, plugin) => {
    if (!preEditor.styles) preEditor.styles = [];

    if (plugin.renderStyle) preEditor.styles.push(plugin.type);

    const { isVoid, isInline, normalizeNode } = preEditor;

    if ('isVoid' in plugin) {
      preEditor.isVoid = (element) => {
        if (element.type === plugin.type) {
          if (!plugin.isVoid) return false;
          return typeof plugin.isVoid === 'function' ? plugin.isVoid(element) : plugin.isVoid;
        }
        return isVoid(element);
      };
    }

    if ('isInline' in plugin) {
      preEditor.isInline = (element) => {
        if (element.type === plugin.type) {
          if (!plugin.isInline) return false;
          return typeof plugin.isInline === 'function' ? plugin.isInline(element) : plugin.isInline;
        }
        return isInline(element);
      };
    }

    if ('normalizeNode' in plugin) {
      preEditor.normalizeNode = (entry: NodeEntry) => {
        const [node] = entry;

        if (
          (Element.isElement(node) || Text.isText(node)) &&
          node.type === plugin.type &&
          plugin.normalizeNode
        ) {
          plugin.normalizeNode(editor, entry);
          return;
        }

        normalizeNode(entry);
      };
    }

    if (typeof plugin?.injectMethod === 'function') {
      plugin?.injectMethod(preEditor);
    }

    return preEditor;
  }, editor);
};

export const DSlate = ({ value, onChange }: DSlateProps) => {
  const { getPrefixCls: getAntdPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const { plugins } = useContext(DSlateContext);
  const [visibleToolbar, setVisibleToolbar] = useState<string | undefined>(undefined);

  const editor = useMemo(() => withPlugins(withReact(withHistory(createEditor())), plugins), []);

  const renderElement = useCallback((props: RenderElementProps) => {
    const plugin = plugins.find(
      (i) => i.type === props.element.type && i.nodeType === 'element',
    ) as DSlatePlugin | undefined;

    if (plugin && plugin.renderElement) {
      return plugin.renderElement(props);
    }

    return <DefaultElement {...props} />;
  }, []);

  const renderLeaf = useCallback((props) => {
    const { attributes, children, leaf } = props;
    const needRenderPlugin = plugins.find(
      (i) => i.nodeType === 'text' && leaf[i.type] === true && !!i.renderLeaf,
    ) as DSlatePlugin | undefined;

    const style = mergeStyle(leaf, plugins);

    if (needRenderPlugin && needRenderPlugin.renderLeaf) {
      return needRenderPlugin.renderLeaf(props);
    }

    return (
      <span {...attributes} style={style}>
        {children}
      </span>
    );
  }, []);

  const prefixCls = getAntdPrefixCls('dslate');

  const getPrefixCls = (key: string) => {
    return `${prefixCls}-${key}`;
  };

  return (
    <PluginContext.Provider
      value={{
        getPrefixCls,
        visible: visibleToolbar,
        setVisible: setVisibleToolbar,
      }}
    >
      <Slate editor={editor} value={value} onChange={onChange}>
        <div className={prefixCls}>
          <div className={`${prefixCls}-container`}>
            <Toolbar />
            <div className={`${prefixCls}-editbale`}>
              <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
            </div>
          </div>
        </div>
      </Slate>
    </PluginContext.Provider>
  );
};
