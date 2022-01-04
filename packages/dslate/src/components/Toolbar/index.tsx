import React, { useContext } from 'react';
import { Space } from 'antd';

import { usePluginHelper } from '../../contexts/PluginContext';
import DSlateContext from '../../contexts/ConfigContext';

import './index.less';
import ToolbarItem from './ToolbarItem';

import ToolbarButton from './ToolbarButton';
import ToolbarSelect from './ToolbarSelect';
import ToolbarModal from './ToolbarModal';

import type { ToolbarButtonProps } from './ToolbarButton';
import type { ToolbarSelectProps } from './ToolbarSelect';
import type { ToolbarModalProps } from './ToolbarModal';

const Toolbar = () => {
  const { plugins } = useContext(DSlateContext);
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = getPrefixCls?.('toolbar');

  return (
    <div className={prefixCls}>
      <Space wrap>
        {plugins.map((plugin) => (
          <ToolbarItem key={`${plugin?.uuid}`} plugin={plugin}>
            {plugin?.toolbar}
          </ToolbarItem>
        ))}
      </Space>
    </div>
  );
};

export { ToolbarButton, ToolbarSelect, ToolbarModal };

export type { ToolbarButtonProps, ToolbarSelectProps, ToolbarModalProps };

Toolbar.Button = ToolbarButton;
Toolbar.Modal = ToolbarModal;
Toolbar.Select = ToolbarSelect;

export default Toolbar;
