import React, { useCallback, useContext, useMemo, useState } from 'react';
import { createEditor, Descendant, Editor } from 'slate';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { withHistory } from 'slate-history';
import { ConfigProvider } from 'antd';
import DSlateContext, { PluginContext } from '../../context';
import { mergeStyle } from '../../utils';
import { Toolbar } from '../Toolbar';

import './index.less';
import { DSlatePlugin, DSlatePluginContext } from '../../typing';

export const withPlugins = (editor: Editor, plugins: DSlatePlugin[]) => {
  return plugins.reduce<Editor>((preEditor, plugin) => {
    if (!preEditor.tool) preEditor.tool = [];
    if (!preEditor.text) preEditor.text = [];
    if (!preEditor.element) preEditor.element = [];

    if (plugin.nodeType === 'tool') {
      preEditor.tool.push(plugin.type);
      return preEditor;
    }

    if (plugin.nodeType === 'element') preEditor.element.push(plugin.type);
    if (plugin.nodeType === 'text') preEditor.text.push(plugin.type);

    const { isVoid, isInline } = preEditor;

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

    return preEditor;
  }, editor);
};

export type DSlateProps = {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  toolbar?: string[];
};

export const DSlate: React.FC<DSlateProps> = ({ value, onChange, toolbar = [] }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const { plugins } = useContext(DSlateContext);
  const [pluginContextData, setPluginContextData] = useState<DSlatePluginContext['data']>({});

  const editor = useMemo(() => withPlugins(withReact(withHistory(createEditor())), plugins), []);

  const renderElement = useCallback((props) => {
    const plugin = plugins.find(
      (i) => i.type === props.element.type && i.nodeType === 'element',
    ) as DSlatePlugin | undefined;

    if (plugin && plugin.renderElement) {
      return plugin.renderElement(props);
    }

    return <DefaultElement {...props} />;
  }, []);

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    const needRenderPlugin = plugins.find(
      (i) => i.nodeType === 'text' && leaf[i.type] === true && !!i.renderElement,
    ) as DSlatePlugin | undefined;

    const style = mergeStyle(leaf, plugins);

    if (needRenderPlugin && needRenderPlugin.renderElement) {
      return needRenderPlugin.renderElement({ attributes, children, style });
    }

    return (
      <span {...attributes} style={style}>
        {children}
      </span>
    );
  }, []);

  const prefixCls = getPrefixCls('dslate');
  const updatePluginData = (name: string, data: any) => {
    setPluginContextData({
      ...pluginContextData,
      [name]: data,
    });
  };

  return (
    <PluginContext.Provider
      value={{
        data: pluginContextData,
        update: updatePluginData,
      }}
    >
      <Slate editor={editor} value={value} onChange={onChange}>
        <div className={prefixCls}>
          <div className={`${prefixCls}-container`}>
            <Toolbar prefixCls={prefixCls} toolbar={toolbar} />
            <div className={`${prefixCls}-editbale`}>
              <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
            </div>
          </div>
        </div>
      </Slate>
    </PluginContext.Provider>
  );
};
