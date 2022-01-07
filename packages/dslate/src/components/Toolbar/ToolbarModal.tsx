import { Tooltip } from 'antd';
import classnames from 'classnames';
import React from 'react';
import { usePlugin, usePluginHelper } from '../../contexts/PluginContext';
import ToolbarButton from './ToolbarButton';

export type ToolbarModalProps = {
  overlay: JSX.Element;
  placeholder?: string;
  width?: number;
  disabled?: boolean;
  tooltip?: string;
  color?: string;
};

const ToolbarModal: (props: React.PropsWithChildren<ToolbarModalProps>) => JSX.Element = ({
  overlay,
  children,
  disabled,
  tooltip,
  width = 'max-content',
  color = '#FFFFFF',
}) => {
  const { visible, setVisible } = usePlugin();
  const { getPrefixCls } = usePluginHelper();

  const prefixCls = getPrefixCls?.('toolbar-select');

  const toggle = () => {
    setVisible?.(!visible);
  };

  return (
    <div className={classnames(`${prefixCls}`)}>
      <Tooltip
        trigger={[]}
        visible={visible}
        placement="bottom"
        color={color}
        overlayInnerStyle={{
          padding: 0,
        }}
        overlay={<div className={`${prefixCls}-content`}>{overlay}</div>}
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
