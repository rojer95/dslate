import React from 'react';
import Tooltip from '../Tooltip';
import { usePluginHelper } from '@dslate/core';
import type { TooltipProps } from 'rc-tooltip/lib/Tooltip';

const Popover = ({ ...props }: TooltipProps) => {
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = getPrefixCls?.(props.prefixCls ?? 'popover');

  return <Tooltip {...props} prefixCls={prefixCls} />;
};

export default Popover;
