import { Divider } from 'antd';
import React from 'react';
import type { DSlatePlugin } from '../typing';

const DividerPlugin: DSlatePlugin = {
  type: 'divider',
  nodeType: 'tool',
  toolbar: <Divider type="vertical" />,
};

export { DividerPlugin };
