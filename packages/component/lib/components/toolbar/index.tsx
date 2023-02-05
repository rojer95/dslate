/* eslint-disable react/no-array-index-key */
import { useEffect, useMemo } from "react";
import { DSlatePlugin, useConfig } from "@dslate/core";

import ToolbarItem from "./item";

import ToolbarButton from "./button";
import ToolbarSelect from "./select";
import ToolbarModal from "./modal";

import type { ToolbarButtonProps } from "./button";
import type { ToolbarSelectProps } from "./select";
import type { ToolbarModalProps } from "./modal";

import { Divider } from "../divider";

export interface ToolbarProps {
  toolbar?: string[];
}

const Toolbar = ({ toolbar }: ToolbarProps) => {
  const { plugins } = useConfig();

  const ToolbarItems = useMemo(() => {
    return toolbar?.map((type, index) => {
      if (type === "divider")
        return <Divider layout="vertical" key={`${type}-${index}`} />;
      const plugin = plugins.find((i: DSlatePlugin) => i.type === type);
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
  }, [toolbar, plugins]);

  return <div className="dslate-toolbar">{ToolbarItems}</div>;
};

export { ToolbarButton, ToolbarSelect, ToolbarModal };

export type { ToolbarButtonProps, ToolbarSelectProps, ToolbarModalProps };

Toolbar.Button = ToolbarButton;
Toolbar.Modal = ToolbarModal;
Toolbar.Select = ToolbarSelect;

export { Toolbar };
