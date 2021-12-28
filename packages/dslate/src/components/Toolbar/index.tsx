/* eslint-disable react/no-array-index-key */

import React, { useContext } from 'react';
import { Space } from 'antd';

import { usePlugin } from '../../PluginContext';
import DSlateContext from '../../ConfigContext';

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
  const { getPrefixCls } = usePlugin();
  const prefixCls = getPrefixCls('toolbar');

  return (
    <div className={prefixCls}>
      <Space wrap>
        {plugins.map((plugin, index) => {
          return (
            <ToolbarItem key={`${plugin?.type}_${index}`} plugin={plugin}>
              {plugin?.toolbar}
            </ToolbarItem>
          );
        })}
      </Space>
    </div>
  );
};

export { ToolbarButton, ToolbarSelect, ToolbarModal };

export type { ToolbarButtonProps, ToolbarSelectProps, ToolbarModalProps };

export default Toolbar;
