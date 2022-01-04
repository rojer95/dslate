/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useMemo, useState } from 'react';
import type { Descendant } from 'slate';
import { createEditor } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ConfigConsumer, ConfigProvider, useConfig } from '../../contexts/ConfigContext';
import { DSlatePluginProvider } from '../../contexts/PluginContext';
import { mergeStyle, withPlugins } from '../../utils';
import DefaultToolbar from '../Toolbar';

import './index.less';
import type { DSlatePlugin, Locale } from '../../typing';

export type DSlateProps = {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
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

  const editor = useMemo(() => withPlugins(withReact(createEditor()), plugins), []);

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
    const style = mergeStyle(props.element, plugins, 'element');
    const plugin = plugins.find(
      (i) =>
        i.nodeType === 'element' &&
        (i.type === props.element.type || (i.match && i.match(props.element))),
    ) as DSlatePlugin | undefined;

    if (plugin && plugin.renderElement) {
      return plugin.renderElement({ ...props, style });
    }

    const defaultElementPlugin = plugins.find((p) => p.isDefaultElement);

    if (defaultElementPlugin && defaultElementPlugin.renderElement) {
      return defaultElementPlugin.renderElement({ ...props, style });
    }

    return <DefaultElement {...props} />;
  }, []);

  const renderLeaf = useCallback((props) => {
    const { attributes, children, leaf } = props;
    const needRenderPlugin = plugins.find(
      (i) =>
        i.nodeType === 'text' &&
        ((i.type in leaf && !!i.renderLeaf) || (i.match && i.match(props.element))),
    ) as DSlatePlugin | undefined;

    const style = mergeStyle(leaf, plugins, 'text');

    if (needRenderPlugin && needRenderPlugin.renderLeaf) {
      return needRenderPlugin.renderLeaf({ ...props, style });
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    for (const plugin of plugins) {
      if (typeof plugin.onKeyDown === 'function') {
        plugin.onKeyDown(e, editor);
      }
    }
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
                      <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onKeyDown={onKeyDown}
                      />
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
