import React from 'react';

import type { PopoverProps } from 'antd';
import { Popover as AntPopover } from 'antd';
import { usePluginHelper } from '../../contexts/PluginContext';
import './index.less';

const Popover = (props: PopoverProps) => {
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = getPrefixCls?.('popover');

  return <AntPopover {...props} overlayClassName={props.overlayClassName ?? prefixCls} />;
};

export default Popover;
