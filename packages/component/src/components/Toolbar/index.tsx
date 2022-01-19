/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useMemo } from 'react';
import { usePluginHelper, ConfigContext } from '@dslate/core';

import ToolbarItem from './ToolbarItem';

import ToolbarButton from './ToolbarButton';
import ToolbarSelect from './ToolbarSelect';
import ToolbarModal from './ToolbarModal';

import type { ToolbarButtonProps } from './ToolbarButton';
import type { ToolbarSelectProps } from './ToolbarSelect';
import type { ToolbarModalProps } from './ToolbarModal';

import { useFocused } from 'slate-react';
import Divider from '../Divider';

export interface ToolbarProps {
  toolbar?: string[];
}

const Toolbar = ({ toolbar }: ToolbarProps) => {
  const { plugins } = useContext(ConfigContext);
  const { getPrefixCls, setVisibleKey } = usePluginHelper();
  const prefixCls = getPrefixCls?.('toolbar');
  const focused = useFocused();

  useEffect(() => {
    if (!focused) setVisibleKey?.(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  const ToolbarItems = useMemo(() => {
    return toolbar?.map((type, index) => {
      if (type === 'divider') return <Divider key={`${type}-${index}`} />;
      const plugin = plugins.find((i) => i.type === type);
      if (plugin && plugin.toolbar) {
        return (
          <ToolbarItem plugin={plugin} key={`${type}-${index}`}>
            {plugin.toolbar}
          </ToolbarItem>
        );
      }
      return null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolbar]);

  return <div className={prefixCls}>{ToolbarItems}</div>;
};

export { ToolbarButton, ToolbarSelect, ToolbarModal };

export type { ToolbarButtonProps, ToolbarSelectProps, ToolbarModalProps };

Toolbar.Button = ToolbarButton;
Toolbar.Modal = ToolbarModal;
Toolbar.Select = ToolbarSelect;

export default Toolbar;
