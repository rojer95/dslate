import React, { useState } from "react";
import { usePlugin } from "@dslate/core";
import ToolbarButton from "./button";
import { Popover } from "../popover";

export type ToolbarModalProps = {
  overlay: JSX.Element;
  placeholder?: string;
  width?: number;
  disabled?: boolean;
  tooltip?: string;
};

const className = "dslate-toolbar-select";

const ToolbarModal: (
  props: React.PropsWithChildren<ToolbarModalProps>
) => JSX.Element = ({ overlay, children, disabled, tooltip }) => {
  const { visible, setVisible } = usePlugin();

  const toggle = () => {
    setVisible?.(!visible);
  };

  return (
    <div className={className}>
      <Popover
        trigger="custom"
        visible={visible}
        position="bottom"
        content={overlay}
      >
        <span>
          <ToolbarButton disabled={disabled} onClick={toggle} tooltip={tooltip}>
            {children}
          </ToolbarButton>
        </span>
      </Popover>
    </div>
  );
};

export default ToolbarModal;
