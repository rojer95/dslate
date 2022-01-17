/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { DefaultElement, Editable, useSlate } from 'slate-react';
import { PluginUuidContext, usePluginHelper } from '../../contexts/PluginContext';

import { mergeStyle } from '../../utils';
import { useConfig, useMessage } from '../../contexts/ConfigContext';

import type { RenderElementProps } from 'slate-react';
import type { DSlatePlugin } from '../../typing';

interface EditableProps {
  disabled?: boolean;
  placeholder?: string;
}

export default ({ disabled = false, placeholder }: EditableProps) => {
  const { plugins } = useConfig();
  const { setVisibleKey, getPrefixCls } = usePluginHelper();
  const editor = useSlate();
  const getMessage = useMessage();

  const prefixCls = getPrefixCls?.('editable');

  const renderElement = useCallback((props: RenderElementProps) => {
    const style = mergeStyle(props.element, plugins, 'element', editor);
    const plugin = plugins.find(
      (i) => i.nodeType === 'element' && i.type === props.element.type,
    ) as DSlatePlugin | undefined;

    let dom;
    if (plugin && plugin.renderElement) {
      dom = (
        <PluginUuidContext.Provider
          value={{
            uuid: plugin.uuid,
            type: plugin.type,
          }}
        >
          {plugin.renderElement({ ...props, style }, editor)}
        </PluginUuidContext.Provider>
      );
    } else {
      const defaultElementPlugin = plugins.find((p) => p.isDefaultElement);

      if (defaultElementPlugin && defaultElementPlugin.renderElement) {
        dom = (
          <PluginUuidContext.Provider
            value={{
              uuid: defaultElementPlugin.uuid,
              type: defaultElementPlugin.type,
            }}
          >
            {defaultElementPlugin.renderElement({ ...props, style }, editor)}
          </PluginUuidContext.Provider>
        );
      }
    }

    return dom ?? <DefaultElement {...props} />;
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

  return (
    <Editable
      className={prefixCls}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      onMouseDown={() => {
        setVisibleKey?.(undefined);
      }}
      onKeyDown={onKeyDown}
      readOnly={disabled}
      placeholder={placeholder ?? getMessage('placeholder', '')}
    />
  );
};
