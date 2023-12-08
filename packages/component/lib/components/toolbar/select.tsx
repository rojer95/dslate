import { usePlugin } from '@dslate/core';
import React, { useCallback } from 'react';
import { Select } from '../select';
import ToolbarButton from './button';

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
  placeholder = '',
  width = 'max-content',
}) => {
  const { disabled: globalDisabled } = usePlugin();
  const isDisabled = disabled || globalDisabled;

  const triggerRender = useCallback(() => {
    const selected = options?.find((i) => i.value === value);
    let dom: React.ReactNode = placeholder;

    if (selected) {
      dom = selected.placeholder ?? selected.label;
    }

    return (
      <ToolbarButton
        disabled={isDisabled}
        tooltip={tooltip}
        style={{
          width: '100%',
        }}
      >
        <div>{dom}</div>
      </ToolbarButton>
    );
  }, [options, value, placeholder, disabled, tooltip]);

  return (
    <Select
      disabled={isDisabled}
      optionList={options}
      onChange={onChange}
      triggerRender={triggerRender}
      value={value}
      tooltip={tooltip}
      style={{
        width,
      }}
    />
  );
};

export default ToolbarSelect;
