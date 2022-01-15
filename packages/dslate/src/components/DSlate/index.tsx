/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useMemo, useState } from 'react';
import type { Descendant } from 'slate';
import { createEditor, Node } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useFocused, useSlate } from 'slate-react';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { ConfigProvider as AntdConfigProvider, Progress } from 'antd';
import {
  ConfigConsumer,
  ConfigProvider,
  useConfig,
  useMessage,
} from '../../contexts/ConfigContext';
import {
  GlobalPluginProvider,
  PluginUuidContext,
  usePluginHelper,
} from '../../contexts/PluginContext';
import { mergeStyle, withPlugins, mergeLocalteFromPlugins } from '../../utils';
import Toolbar from '../Toolbar';

import './index.less';
import type { DSlatePlugin } from '../../typing';
import classNames from 'classnames';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import SizeContext from 'antd/lib/config-provider/SizeContext';

interface ShowCountProps {
  formatter: (args: { count: number }) => string;
}

interface ProgressProps {
  strokeWidth?: number;
  showInfo?: boolean;
}

export interface DSlateProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  prefixCls?: string;
  bordered?: boolean;
  size?: SizeType;
  showCount?: boolean | ShowCountProps;
  disabled?: boolean;
  placeholder?: string;
  progress?: ProgressProps;
}

interface DSlateContentProps {
  bordered?: boolean;
  size?: SizeType;
  showCount?: boolean | ShowCountProps;
  disabled?: boolean;
  placeholder?: string;
  progress?: {
    percent?: number;
  } & ProgressProps;
}

const DSlateContent = ({
  bordered,
  size: customizeSize,
  disabled,
  showCount,
  placeholder,
  progress,
}: DSlateContentProps) => {
  const { getPrefixCls: getAntdPrefixCls } = useContext(AntdConfigProvider.ConfigContext);
  const prefixCls = getAntdPrefixCls('dslate');
  const { setVisibleKey } = usePluginHelper();
  const { plugins } = useConfig();
  const editor = useSlate();

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

  const focused = useFocused();

  const getMessage = useMessage();

  return (
    <SizeContext.Consumer>
      {(size) => {
        const realSize = customizeSize || size;
        let dataCount = '';
        if (showCount) {
          const count = Node.string(editor).length;
          if (typeof showCount === 'object') {
            dataCount = showCount.formatter({ count });
          } else {
            dataCount = `${count}字`;
          }
        }

        return (
          <div
            className={classNames(`${prefixCls}`, {
              [`${prefixCls}-sm`]: realSize === 'small',
              [`${prefixCls}-lg`]: realSize === 'large',
              [`${prefixCls}-disabled`]: disabled,
              [`${prefixCls}-borderless`]: !bordered,
              [`${prefixCls}-focused`]: focused,
              [`${prefixCls}-show-count`]: !!dataCount,
            })}
            data-count={dataCount}
          >
            <Toolbar />

            <div className="editable">
              {progress?.percent ? (
                <div className="progress">
                  <Progress
                    {...progress}
                    type="line"
                    percent={progress?.percent === -1 ? 100 : progress?.percent}
                    status={progress?.percent === -1 ? 'exception' : 'active'}
                  />
                </div>
              ) : null}
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onMouseDown={() => {
                  setVisibleKey?.(undefined);
                }}
                onKeyDown={onKeyDown}
                readOnly={disabled}
                placeholder={placeholder ?? getMessage('placeholder', '')}
              />
            </div>
          </div>
        );
      }}
    </SizeContext.Consumer>
  );
};

const DSlate = ({
  value,
  onChange,
  showCount = false,
  bordered = true,
  disabled = false,
  size: customizeSize,
  prefixCls: customizePrefixCls,
  placeholder,
  progress = {
    strokeWidth: 2,
    showInfo: false,
  },
}: DSlateProps) => {
  const { getPrefixCls: getAntdPrefixCls } = useContext(AntdConfigProvider.ConfigContext);
  const prefixCls = getAntdPrefixCls('dslate', customizePrefixCls);
  const { plugins } = useConfig();
  const editor = useMemo(() => withPlugins(withReact(createEditor()), plugins), []);
  const [visibleKey, setVisibleKey] = useState<React.Key | undefined>(undefined);

  const [percent, setPercent] = useState(0);

  const getPrefixCls = useCallback(
    (key: string) => {
      return `${prefixCls}-${key}`;
    },
    [prefixCls],
  );

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
                setPercent,
              }}
            >
              <Slate editor={editor} value={value} onChange={onChange}>
                <DSlateContent
                  bordered={bordered}
                  size={customizeSize}
                  disabled={disabled}
                  showCount={showCount}
                  placeholder={placeholder}
                  progress={{ ...progress, percent }}
                />
              </Slate>
            </GlobalPluginProvider>
          </ConfigProvider>
        );
      }}
    </ConfigConsumer>
  );
};

export default DSlate;
