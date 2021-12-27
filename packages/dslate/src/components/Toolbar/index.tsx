/* eslint-disable react/no-array-index-key */

import type { ReactElement } from 'react';
import { useState } from 'react';
import React, { useContext, useMemo } from 'react';
import { Space, Tooltip } from 'antd';
import classnames from 'classnames';

import DSlateContext, { usePlugin } from '../../context';
import type {
  DSlatePlugin,
  ToolbarButtonProps,
  ToolbarModalProps,
  ToolbarSelectProps,
} from '../../typing';
import { IconFont } from '../Icon';
import './index.less';

const ToolbarContext = React.createContext<{
  disabled: string[];
  enableToolbar: (key: string | string[]) => void;
  disableToolbar: (key: string | string[]) => void;
}>({
  disabled: [],
  enableToolbar: () => {},
  disableToolbar: () => {},
});

export const useToolbar = () => {
  return useContext(ToolbarContext);
};

const ToolbarItemContext = React.createContext<{ type?: string }>({
  type: undefined,
});

export const useToolbarType = () => {
  const context = useContext(ToolbarItemContext);
  return context.type;
};

const ToolbarTooltip: React.FC<{ tooltip?: string }> = ({ children, tooltip }) => {
  return tooltip ? <Tooltip title={tooltip}>{children}</Tooltip> : <>{children}</>;
};

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  children,
  disabled = false,
  active = false,
  onClick,
  tooltip = '',
}) => {
  const { getPrefixCls } = usePlugin();
  const type = useToolbarType();
  const { disabled: disabledToolbars } = useToolbar();
  const prefixCls = getPrefixCls('toolbar-button');

  const isDisabled = disabled || disabledToolbars?.includes(type as string);

  return (
    <ToolbarTooltip tooltip={tooltip}>
      <div
        className={classnames(`${prefixCls}`, {
          active,
          disabled: isDisabled,
        })}
        onClick={() => {
          if (!isDisabled) onClick?.();
        }}
      >
        {children}
      </div>
    </ToolbarTooltip>
  );
};

export const ToolbarModal: (props: React.PropsWithChildren<ToolbarModalProps>) => ReactElement = ({
  width = 'max-content',
  overlay,
  children,
  disabled,
  tooltip,
}) => {
  const { getPrefixCls, visible, setVisible } = usePlugin();
  const type = useToolbarType();

  const prefixCls = getPrefixCls('toolbar-select');

  const toggle = () => {
    if (visible === type) {
      setVisible(undefined);
    } else {
      setVisible(type);
    }
  };

  return (
    <div className={classnames(`${prefixCls}`)}>
      <Tooltip
        trigger={[]}
        visible={visible === type}
        placement="bottom"
        color="#FFFFFF"
        overlayInnerStyle={{
          padding: 0,
        }}
        overlay={<div className={`${prefixCls}-drop-content`}>{overlay}</div>}
      >
        <ToolbarButton disabled={disabled} onClick={toggle} tooltip={tooltip}>
          <div className={classnames(`${prefixCls}-button`)}>
            <div className={`${prefixCls}-button-content`} style={{ width }}>
              {children}
            </div>
          </div>
        </ToolbarButton>
      </Tooltip>
    </div>
  );
};

export const ToolbarSelect: <T>(props: ToolbarSelectProps<T>) => ReactElement = ({
  placeholder = '',
  width = 'max-content',
  options,
  value,
  disabled,
  tooltip,
  onChange,
}) => {
  const { getPrefixCls, visible, setVisible } = usePlugin();
  const type = useToolbarType();

  const prefixCls = getPrefixCls('toolbar-select');

  const ActiveValue = useMemo(() => {
    const selected = options.find((i) => i.value === value);

    let dom: React.ReactNode = placeholder;
    if (selected) {
      dom = selected.placeholder ?? selected.label;
    }
    return (
      <div
        style={{
          width,
        }}
      >
        {dom}
      </div>
    );
  }, [options, placeholder, width, value]);

  const toggle = () => {
    if (visible === type) {
      setVisible(undefined);
    } else {
      setVisible(type);
    }
  };

  return (
    <div className={classnames(`${prefixCls}`)}>
      <Tooltip
        trigger={[]}
        visible={visible === type}
        placement="bottom"
        color="#FFFFFF"
        overlayInnerStyle={{
          padding: 0,
        }}
        overlay={
          <div className={`${prefixCls}-drop-content`}>
            {options.map((i) => (
              <div
                onClick={() => {
                  onChange(i.value);
                  setVisible(undefined);
                }}
                key={`${i.value}`}
                className={classnames(`${prefixCls}-drop-content-item`, {
                  active: value === i.value,
                })}
              >
                {i.label}
              </div>
            ))}
          </div>
        }
      >
        <ToolbarButton disabled={disabled} onClick={toggle} tooltip={tooltip}>
          <div className={classnames(`${prefixCls}-button`)}>
            <div className={`${prefixCls}-button-content`}>{ActiveValue}</div>
            <IconFont className={`${prefixCls}-button-icon`} type="icon-down" />
          </div>
        </ToolbarButton>
      </Tooltip>
    </div>
  );
};

const ToolbarItem: React.FC<{ plugin: DSlatePlugin }> = ({ children, plugin }) => {
  if (!children) return null;

  return (
    <ToolbarItemContext.Provider
      value={{
        type: plugin.type,
      }}
    >
      <div
        onMouseDown={(event) => {
          const target: any = event.target;
          if (target && target?.nodeName === 'INPUT') return;
          event.preventDefault();
        }}
      >
        {children}
      </div>
    </ToolbarItemContext.Provider>
  );
};
export const Toolbar = () => {
  const { plugins } = useContext(DSlateContext);
  const { getPrefixCls } = usePlugin();
  const prefixCls = getPrefixCls('toolbar');

  const [disabled, setDisabled] = useState<string[]>([]);

  const enableToolbar = (key: string | string[]) => {
    const keys: string[] = Array.isArray(key) ? key : [key];
    setDisabled(disabled.filter((i) => !keys.includes(i)));
  };

  const disableToolbar = (key: string | string[]) => {
    const keys: string[] = Array.isArray(key) ? key : [key];
    setDisabled(Array.from(new Set([...disabled, ...keys])));
  };

  return (
    <ToolbarContext.Provider
      value={{
        disabled,
        enableToolbar,
        disableToolbar,
      }}
    >
      <div className={prefixCls}>
        <Space wrap>
          {plugins.map((plugin, index) => {
            return (
              <ToolbarItem key={`${plugin?.type}_${index}`} plugin={plugin}>
                {plugin?.toolbar}
              </ToolbarItem>
            );
          })}
        </Space>
      </div>
    </ToolbarContext.Provider>
  );
};
