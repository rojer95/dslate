import React, { useMemo } from 'react';
import Tooltip from 'rc-tooltip';
import { useConfig, usePluginHelper } from '@dslate/core';
import type { TooltipProps } from 'rc-tooltip/lib/Tooltip';

const DTooltip = ({
  prefixCls: parentPrefixCls,
  tooltip,
  overlay,
  placement,
  ...props
}: Omit<TooltipProps, 'overlay'> & {
  tooltip?: string;
  overlay?: (() => React.ReactNode) | React.ReactNode;
}) => {
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = parentPrefixCls ?? getPrefixCls?.('tooltip');
  const { pluginProps } = useConfig();

  const realPlacememt = useMemo(() => {
    if (placement) return placement;
    if (pluginProps?.tooltip?.placement) return pluginProps?.tooltip?.placement;
    return 'top';
  }, [pluginProps, placement]);

  return (
    <Tooltip
      overlay={tooltip ? tooltip : overlay}
      prefixCls={prefixCls}
      placement={realPlacememt}
      arrowContent={<span className={`${prefixCls}-arrow-content`} />}
      {...props}
    />
  );
};

export default DTooltip;
