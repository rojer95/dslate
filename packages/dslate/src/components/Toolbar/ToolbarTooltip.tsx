import { Tooltip } from 'antd';
import React from 'react';

export type ToolbarTooltipProps = {
  tooltip?: string;
};

const ToolbarTooltip: React.FC<ToolbarTooltipProps> = ({ children, tooltip }) => {
  return tooltip ? <Tooltip title={tooltip}>{children}</Tooltip> : <>{children}</>;
};

export default ToolbarTooltip;
