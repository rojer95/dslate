import { usePlugin } from '@dslate/core';
import React, { PropsWithChildren } from 'react';
import { Button, ButtonProps } from '../button';
import { Tooltip } from '../tooltip';

export type ToolbarButtonProps = {
  tooltip?: string;
} & ButtonProps;

const ToolbarButton: React.FC<PropsWithChildren<ToolbarButtonProps>> = ({
  children,
  disabled = false,
  active = false,
  onClick,
  tooltip = '',
  ...props
}) => {
  const { disabled: globalDisabled } = usePlugin();
  const isDisabled = disabled || globalDisabled;

  return (
    <Tooltip content={tooltip}>
      <Button
        active={active}
        disabled={isDisabled}
        onClick={(e: any) => {
          if (!isDisabled) onClick?.(e);
        }}
        {...props}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
export default ToolbarButton;
