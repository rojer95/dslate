import React, { useCallback, useMemo } from "react";
import { usePlugin } from "@dslate/core";
import ToolbarButton from "./button";
import { Select } from "../select";

export type ToolbarSelectProps<T> = {
  options: {
    label: React.ReactNode;
    value: T;
    placeholder?: string;
    tooltip?: string;
  }[];
  placeholder?: React.ReactNode;
  width?: number | string;
  value: T;
  disabled?: boolean;
  tooltip?: string;
  onChange: (value: T) => void;
  color?: string;
};

const ToolbarSelect: <T = any>(props: ToolbarSelectProps<T>) => JSX.Element = ({
  options,
  value,
  disabled,
  tooltip,
  onChange,
  placeholder = "",
  width = "max-content",
}) => {
  // const { visible, setVisible } = usePlugin();
  const triggerRender = useCallback(() => {
    const selected = options?.find((i) => i.value === value);
    let dom: React.ReactNode = placeholder;
    if (selected) {
      dom = selected.placeholder ?? selected.label;
    }
    return (
      <ToolbarButton disabled={disabled} tooltip={tooltip}>
        <div
          style={{
            width,
          }}
        >
          {dom}
        </div>
      </ToolbarButton>
    );
  }, [options, value, placeholder, disabled, tooltip]);

  return (
    <Select
      optionList={options}
      onChange={onChange}
      triggerRender={triggerRender}
      value={value}
      style={{
        width,
      }}
    />
  );
};

export default ToolbarSelect;
