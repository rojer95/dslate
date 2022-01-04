import classnames from 'classnames';
import React from 'react';
import { usePlugin, usePluginHelper } from '../../contexts/PluginContext';
import ToolbarTooltip from './ToolbarTooltip';

export type ToolbarButtonProps = {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  tooltip?: string;
};

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  children,
  disabled = false,
  active = false,
  onClick,
  tooltip = '',
}) => {
  const { disabled: globalDisabled } = usePlugin();
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = getPrefixCls?.('toolbar-button');
  const isDisabled = disabled || globalDisabled;

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

export default ToolbarButton;
