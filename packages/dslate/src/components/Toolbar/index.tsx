/* eslint-disable react/no-array-index-key */

import type { ReactElement } from 'react';
import React, { useContext, useMemo } from 'react';
import { Space, Tooltip } from 'antd';
import classnames from 'classnames';

import DSlateContext, { usePlugin } from '../../context';
import type { DSlatePlugin } from '../../typing';
import { IconFont } from '../Icon';
import './index.less';

const ToolbarItemContext = React.createContext<{ type?: string }>({
  type: undefined,
});

const useType = () => {
  const context = useContext(ToolbarItemContext);
  return context.type;
};

const ToolbarTooltip: React.FC<{ tooltip?: string }> = ({ children, tooltip }) => {
  return tooltip ? <Tooltip title={tooltip}>{children}</Tooltip> : <>{children}</>;
};

interface ToolbarSelectProps<T> {
  options: { label: React.ReactNode; value: T; placeholder?: string }[];
  placeholder?: string;
  value: T;
  disabled?: boolean;
  tooltip?: string;
  onChange: (value: T) => void;
}

interface ToolbarButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  tooltip?: string;
}
export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  children,
  disabled = false,
  active = false,
  onClick,
  tooltip = '',
}) => {
  const { getPrefixCls } = usePlugin();
  const prefixCls = getPrefixCls('toolbar-button');

  return (
    <ToolbarTooltip tooltip={tooltip}>
      <div
        className={classnames(`${prefixCls}`, {
          active,
          disabled,
        })}
        onClick={() => {
          if (!disabled) onClick?.();
        }}
      >
        {children}
      </div>
    </ToolbarTooltip>
  );
};

export const ToolbarSelect: <T>(props: ToolbarSelectProps<T>) => ReactElement = ({
  placeholder,
  options,
  value,
  disabled,
  tooltip,
  onChange,
}) => {
  const { getPrefixCls, visible, setVisible } = usePlugin();
  const type = useType();

  const prefixCls = getPrefixCls('toolbar-select');

  const ActiveValue = useMemo(() => {
    const selected = options.find((i) => i.value === value);

    if (!selected) return placeholder;
    return selected.placeholder ?? selected.label;
  }, [options, value, placeholder]);

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

  return (
    <div className={prefixCls}>
      <Space>
        {plugins.map((plugin, index) => {
          return (
            <ToolbarItem key={`${plugin?.type}_${index}`} plugin={plugin}>
              {plugin?.toolbar}
            </ToolbarItem>
          );
        })}
      </Space>
    </div>
  );
};
