/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useMemo, useState } from 'react';
import type { Descendant, Editor, NodeEntry } from 'slate';
import { createEditor, Element, Text } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { withHistory } from 'slate-history';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ConfigConsumer, ConfigProvider, useConfig } from '../../ConfigContext';
import { DSlatePluginProvider } from '../../PluginContext';
import { mergeStyle } from '../../utils';
import DefaultToolbar from '../Toolbar';

import './index.less';
import type { DSlatePlugin, Locale } from '../../typing';

export type DSlateProps = {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
};

const withPlugins = (editor: Editor, plugins: DSlatePlugin[]) => {
  return plugins.reduce<Editor>((preEditor, plugin) => {
    const { isVoid, isInline, normalizeNode } = preEditor;

    if (plugin.isDefaultElement) preEditor.defaultElement = plugin.type;

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

const mergeLocalteFromPlugins = (locales: Record<string, Locale>, plugins: DSlatePlugin[]) => {
  const newLocales: Record<string, Locale> = { ...locales };
  for (const plugin of plugins) {
    if (!plugin.locale) continue;

    const localeNames = Object.keys(plugin.locale);
    for (const localeName of localeNames) {
      if (!newLocales[localeName]) {
        newLocales[localeName] = {
          locale: localeName,
        };
      }

      newLocales[localeName] = {
        ...newLocales[localeName],
        [plugin.type]: {
          ...(newLocales[localeName][plugin.type] ?? {}),
          ...plugin.locale[localeName],
        },
      };
    }
  }

  return newLocales;
};

const DSlate = ({ value, onChange }: DSlateProps) => {
  const { getPrefixCls: getAntdPrefixCls } = useContext(AntdConfigProvider.ConfigContext);

  const { plugins } = useConfig();
  const [visibleType, setVisibleType] = useState<string | undefined>(undefined);

  const editor = useMemo(() => withPlugins(withReact(withHistory(createEditor())), plugins), []);

  const [disabled, setDisabled] = useState<string[]>([]);

  const enablePlugin = (key: string | string[]) => {
    const keys: string[] = Array.isArray(key) ? key : [key];
    setDisabled(disabled.filter((i) => !keys.includes(i)));
  };

  const disablePlugin = (key: string | string[]) => {
    const keys: string[] = Array.isArray(key) ? key : [key];
    setDisabled(Array.from(new Set([...disabled, ...keys])));
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    const plugin = plugins.find(
      (i) => i.type === props.element.type && i.nodeType === 'element',
    ) as DSlatePlugin | undefined;

    if (plugin && plugin.renderElement) {
      return plugin.renderElement(props);
    }

    const defaultElementPlugin = plugins.find((p) => p.isDefaultElement);

    if (defaultElementPlugin && defaultElementPlugin.renderElement) {
      return defaultElementPlugin.renderElement(props);
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
    <ConfigConsumer>
      {(wrapValue) => {
        return (
          <ConfigProvider
            value={{
              ...wrapValue,
              locales: mergeLocalteFromPlugins(wrapValue.locales, wrapValue.plugins),
            }}
          >
            <DSlatePluginProvider
              value={{
                getPrefixCls,
                visibleType: visibleType,
                setVisibleType: setVisibleType,
                disabled,
                enablePlugin: enablePlugin,
                disablePlugin: disablePlugin,
              }}
            >
              <Slate editor={editor} value={value} onChange={onChange}>
                <div className={prefixCls}>
                  <div className={`${prefixCls}-container`}>
                    <DefaultToolbar />
                    <div
                      className={`${prefixCls}-editbale`}
                      onMouseDown={() => {
                        setVisibleType(undefined);
                      }}
                    >
                      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
                    </div>
                  </div>
                </div>
              </Slate>
            </DSlatePluginProvider>
          </ConfigProvider>
        );
      }}
    </ConfigConsumer>
  );
};

export default DSlate;
