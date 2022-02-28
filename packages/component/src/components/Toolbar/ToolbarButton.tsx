import classnames from 'classnames';
import React from 'react';
import { usePlugin, usePluginHelper } from '@dslate/core';
import Tooltip from '../Tooltip';

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

  const Button = (
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
  );

  return tooltip ? <Tooltip tooltip={tooltip}>{Button}</Tooltip> : Button;
};

export default ToolbarButton;
