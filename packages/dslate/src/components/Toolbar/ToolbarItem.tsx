import React, { useContext } from 'react';
import type { DSlatePlugin } from '../../typing';

const ToolbarItemContext = React.createContext<{ uuid?: React.Key; type?: string }>({
  uuid: undefined,
  type: undefined,
});

export const usePluginUuid = () => {
  return useContext(ToolbarItemContext);
};

interface ToolbarItemProps {
  plugin: DSlatePlugin;
}

const ToolbarItem: React.FC<ToolbarItemProps> = ({ children, plugin }) => {
  if (!children) return null;

  return (
    <ToolbarItemContext.Provider
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
    </ToolbarItemContext.Provider>
  );
};

export default React.memo<React.PropsWithChildren<ToolbarItemProps>>(ToolbarItem);
