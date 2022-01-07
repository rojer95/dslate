/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useMemo, useState } from 'react';
import type { Descendant } from 'slate';
import { createEditor } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ConfigConsumer, ConfigProvider, useConfig } from '../../contexts/ConfigContext';
import { GlobalPluginProvider } from '../../contexts/PluginContext';
import { mergeStyle, withPlugins, mergeLocalteFromPlugins } from '../../utils';
import Toolbar from '../Toolbar';

import './index.less';
import type { DSlatePlugin } from '../../typing';

export type DSlateProps = {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
};

const DSlate = ({ value, onChange }: DSlateProps) => {
  const { getPrefixCls: getAntdPrefixCls } = useContext(AntdConfigProvider.ConfigContext);
  const { plugins } = useConfig();
  const editor = useMemo(() => withPlugins(withReact(createEditor()), plugins), []);

  const [visibleKey, setVisibleKey] = useState<React.Key | undefined>(undefined);
  const [disabledTypes, setDisabledTypes] = useState<string[]>([]);

  const enablePluginByType = useCallback(
    (type: string | string[]) => {
      const types: string[] = Array.isArray(type) ? type : [type];
      setDisabledTypes(disabledTypes.filter((i) => !types.includes(i)));
    },
    [disabledTypes],
  );

  const disablePluginByType = useCallback(
    (type: string | string[]) => {
      const types: string[] = Array.isArray(type) ? type : [type];
      setDisabledTypes(Array.from(new Set([...disabledTypes, ...types])));
    },
    [disabledTypes],
  );

  const prefixCls = getAntdPrefixCls('dslate');

  const getPrefixCls = useCallback(
    (key: string) => {
      return `${prefixCls}-${key}`;
    },
    [prefixCls],
  );

  const renderElement = useCallback((props: RenderElementProps) => {
    const style = mergeStyle(props.element, plugins, 'element', editor);
    const plugin = plugins.find(
      (i) => i.nodeType === 'element' && i.type === props.element.type,
    ) as DSlatePlugin | undefined;

    if (plugin && plugin.renderElement) {
      return plugin.renderElement({ ...props, style }, editor);
    }

    const defaultElementPlugin = plugins.find((p) => p.isDefaultElement);

    if (defaultElementPlugin && defaultElementPlugin.renderElement) {
      return defaultElementPlugin.renderElement({ ...props, style }, editor);
    }

    return <DefaultElement {...props} />;
  }, []);

  const renderLeaf = useCallback((props) => {
    const { attributes, children, leaf } = props;
    const needRenderPlugin = plugins.find(
      (i) => i.nodeType === 'text' && i.type in leaf && !!i.renderLeaf,
    ) as DSlatePlugin | undefined;

    const style = mergeStyle(leaf, plugins, 'text', editor);

    if (needRenderPlugin && needRenderPlugin.renderLeaf) {
      return needRenderPlugin.renderLeaf({ ...props, style }, editor);
    }

    return (
      <span {...attributes} style={style}>
        {children}
      </span>
    );
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    for (const plugin of plugins) {
      if (typeof plugin.onKeyDown === 'function') {
        plugin.onKeyDown(e, editor);
      }
    }
  }, []);

  const onFocus = useCallback(() => {
    setVisibleKey(undefined);
  }, []);
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
            <GlobalPluginProvider
              value={{
                getPrefixCls,
                visibleKey: visibleKey,
                setVisibleKey: setVisibleKey,
                disabledTypes,
                enablePluginByType,
                disablePluginByType,
              }}
            >
              <Slate editor={editor} value={value} onChange={onChange}>
                <div className={prefixCls}>
                  <div className={`${prefixCls}-container`}>
                    <Toolbar />
                    <div className={`${prefixCls}-editbale`} onMouseDown={onFocus}>
                      <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onKeyDown={onKeyDown}
                      />
                    </div>
                  </div>
                </div>
              </Slate>
            </GlobalPluginProvider>
          </ConfigProvider>
        );
      }}
    </ConfigConsumer>
  );
};

export default DSlate;
