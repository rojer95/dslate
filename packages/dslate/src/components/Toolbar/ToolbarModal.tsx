import { Tooltip } from 'antd';
import classnames from 'classnames';
import React from 'react';
import { usePlugin } from '../../contexts/PluginContext';
import ToolbarButton from './ToolbarButton';
import { usePluginType } from './ToolbarItem';

export type ToolbarModalProps = {
  overlay: JSX.Element;
  placeholder?: string;
  width?: number;
  disabled?: boolean;
  tooltip?: string;
};

const ToolbarModal: (props: React.PropsWithChildren<ToolbarModalProps>) => JSX.Element = ({
  width = 'max-content',
  overlay,
  children,
  disabled,
  tooltip,
}) => {
  const type = usePluginType();
  const { getPrefixCls, visible, setVisible } = usePlugin(type);

  const prefixCls = getPrefixCls('toolbar-select');

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
        overlay={<div className={`${prefixCls}-drop-content`}>{overlay}</div>}
      >
        <ToolbarButton disabled={disabled} onClick={toggle} tooltip={tooltip}>
          <div className={classnames(`${prefixCls}-button`)}>
            <div className={`${prefixCls}-button-content`} style={{ width }}>
              {children}
            </div>
          </div>
        </ToolbarButton>
      </Tooltip>
    </div>
  );
};

export default ToolbarModal;
