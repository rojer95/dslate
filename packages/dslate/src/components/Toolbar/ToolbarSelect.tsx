import { Tooltip } from 'antd';
import classnames from 'classnames';
import React, { useMemo } from 'react';
import { usePlugin } from '../../PluginContext';
import IconFont from '../IconFont';
import ToolbarButton from './ToolbarButton';
import { usePluginType } from './ToolbarItem';

export type ToolbarSelectProps<T> = {
  options: { label: React.ReactNode; value: T; placeholder?: string }[];
  placeholder?: string;
  width?: number;
  value: T;
  disabled?: boolean;
  tooltip?: string;
  onChange: (value: T) => void;
};

const ToolbarSelect: <T>(props: ToolbarSelectProps<T>) => JSX.Element = ({
  placeholder = '',
  width = 'max-content',
  options,
  value,
  disabled,
  tooltip,
  onChange,
}) => {
  const type = usePluginType();
  const { getPrefixCls, visible, setVisible } = usePlugin(type);

  const prefixCls = getPrefixCls('toolbar-select');

  const ActiveValue = useMemo(() => {
    const selected = options.find((i) => i.value === value);

    let dom: React.ReactNode = placeholder;
    if (selected) {
      dom = selected.placeholder ?? selected.label;
    }
    return (
      <div
        style={{
          width,
        }}
      >
        {dom}
      </div>
    );
  }, [options, placeholder, width, value]);

  const toggle = () => {
    setVisible(!visible);
  };

  return (
    <div className={classnames(`${prefixCls}`)}>
      <Tooltip
        trigger={[]}
        visible={visible}
        placement="bottom"
        color="#FFFFFF"
        overlayInnerStyle={{
          padding: 0,
        }}
        overlay={
          <div className={`${prefixCls}-drop-content`}>
            {options.map((i) => (
              <div
                onClick={() => {
                  onChange(i.value);
                  setVisible(false);
                }}
                key={`${i.value}`}
                className={classnames(`${prefixCls}-drop-content-item`, {
                  active: value === i.value,
                })}
              >
                {i.label}
              </div>
            ))}
          </div>
        }
      >
        <ToolbarButton disabled={disabled} onClick={toggle} tooltip={tooltip}>
          <div className={classnames(`${prefixCls}-button`)}>
            <div className={`${prefixCls}-button-content`}>{ActiveValue}</div>
            <IconFont className={`${prefixCls}-button-icon`} type="icon-down" />
          </div>
        </ToolbarButton>
      </Tooltip>
    </div>
  );
};

export default ToolbarSelect;