import React from 'react';
import { PluginUuidContext } from '@dslate/core';
import type { DSlatePlugin } from '@dslate/core';

interface ToolbarItemProps {
  plugin: DSlatePlugin;
}

const ToolbarItem: React.FC<ToolbarItemProps> = ({ children, plugin }) => {
  if (!children) return null;

  return (
    <PluginUuidContext.Provider
      value={{
        uuid: plugin.uuid,
        type: plugin.type,
      }}
    >
      <div
        onMouseDown={(event) => {
          const target: any = event.target;
          if (target && target?.nodeName === 'INPUT') return;
          event.preventDefault();
        }}
      >
        {children}
      </div>
    </PluginUuidContext.Provider>
  );
};

export default React.memo<React.PropsWithChildren<ToolbarItemProps>>(ToolbarItem);
