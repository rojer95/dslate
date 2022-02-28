import React from 'react';
import Tooltip from 'rc-tooltip';
import { usePluginHelper } from '@dslate/core';
import type { TooltipProps } from 'rc-tooltip/lib/Tooltip';

const DTooltip = ({
  prefixCls: parentPrefixCls,
  tooltip,
  overlay,
  ...props
}: Omit<TooltipProps, 'overlay'> & {
  tooltip?: string;
  overlay?: (() => React.ReactNode) | React.ReactNode;
}) => {
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = parentPrefixCls ?? getPrefixCls?.('tooltip');
  return (
    <Tooltip
      overlay={tooltip ? tooltip : overlay}
      placement="top"
      prefixCls={prefixCls}
      arrowContent={<span className={`${prefixCls}-arrow-content`} />}
      {...props}
    />
  );
};

export default DTooltip;
