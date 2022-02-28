import classnames from 'classnames';
import React from 'react';
import { usePlugin, usePluginHelper } from '@dslate/core';
import Popover from '../Popover';
import ToolbarButton from './ToolbarButton';

export type ToolbarModalProps = {
  overlay: JSX.Element;
  placeholder?: string;
  width?: number;
  disabled?: boolean;
  tooltip?: string;
};

const ToolbarModal: (props: React.PropsWithChildren<ToolbarModalProps>) => JSX.Element = ({
  overlay,
  children,
  disabled,
  tooltip,
  width = 'max-content',
}) => {
  const { visible, setVisible } = usePlugin();
  const { getPrefixCls } = usePluginHelper();

  const prefixCls = getPrefixCls?.('toolbar-select');

  const toggle = () => {
    setVisible?.(!visible);
  };

  return (
    <div className={classnames(`${prefixCls}`)}>
      <Popover
        trigger={[]}
        visible={visible}
        placement="bottom"
        overlay={<div className={`${prefixCls}-content`}>{overlay}</div>}
      >
        <ToolbarButton disabled={disabled} onClick={toggle} tooltip={tooltip}>
          <div className={classnames(`${prefixCls}-button`)}>
            <div className={`${prefixCls}-button-content`} style={{ width }}>
              {children}
            </div>
          </div>
        </ToolbarButton>
      </Popover>
    </div>
  );
};

export default ToolbarModal;
