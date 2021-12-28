import React, { useContext } from 'react';
import type { DSlatePlugin } from '../../typing';

const ToolbarItemContext = React.createContext<{ type?: string }>({
  type: undefined,
});

export const usePluginType = () => {
  const context = useContext(ToolbarItemContext);
  return context.type;
};

const ToolbarItem: React.FC<{ plugin: DSlatePlugin }> = ({ children, plugin }) => {
  if (!children) return null;

  return (
    <ToolbarItemContext.Provider
      value={{
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

export default ToolbarItem;
