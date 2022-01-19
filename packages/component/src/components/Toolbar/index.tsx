import React, { useContext, useEffect } from 'react';
import { Space } from 'antd';

import { usePluginHelper, ConfigContext } from '@dslate/core';

import ToolbarItem from './ToolbarItem';

import ToolbarButton from './ToolbarButton';
import ToolbarSelect from './ToolbarSelect';
import ToolbarModal from './ToolbarModal';

import type { ToolbarButtonProps } from './ToolbarButton';
import type { ToolbarSelectProps } from './ToolbarSelect';
import type { ToolbarModalProps } from './ToolbarModal';

import { useFocused } from 'slate-react';

const Toolbar = () => {
  const { plugins } = useContext(ConfigContext);
  const { getPrefixCls, setVisibleKey } = usePluginHelper();
  const prefixCls = getPrefixCls?.('toolbar');
  const focused = useFocused();
  useEffect(() => {
    if (!focused) setVisibleKey?.(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

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