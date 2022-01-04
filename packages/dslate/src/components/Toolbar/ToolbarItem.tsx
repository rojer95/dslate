import React, { useContext } from 'react';
import type { DSlatePlugin } from '../../typing';

const ToolbarItemContext = React.createContext<{ uuid?: React.Key }>({
  uuid: undefined,
});

export const usePluginUuid = () => {
  const context = useContext(ToolbarItemContext);
  return context.uuid;
};

const ToolbarItem: React.FC<{ plugin: DSlatePlugin }> = ({ children, plugin }) => {
  if (!children) return null;

  return (
    <ToolbarItemContext.Provider
      value={{
        uuid: plugin.uuid,
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

export default ToolbarItem;
