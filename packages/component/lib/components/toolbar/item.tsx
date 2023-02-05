import React, { PropsWithChildren } from "react";
import { PluginUuidContext } from "@dslate/core";
import type { DSlatePlugin } from "@dslate/core";

interface ToolbarItemProps {
  plugin: DSlatePlugin;
}

const ToolbarItem: React.FC<PropsWithChildren<ToolbarItemProps>> = ({
  children,
  plugin,
}) => {
  if (!children) return null;
  return (
    <PluginUuidContext.Provider
      value={{
        uuid: plugin.uuid,
        type: plugin.type,
      }}
    >
      {children}
    </PluginUuidContext.Provider>
  );
};

export default React.memo<React.PropsWithChildren<ToolbarItemProps>>(
  ToolbarItem
);
