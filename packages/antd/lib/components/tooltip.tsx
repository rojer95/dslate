import { Tooltip as AntdTooltip } from 'antd';
import { PropsWithChildren } from 'react';

export const Tooltip = ({
  content,
  position,
  children,
}: PropsWithChildren<{
  content?: string;
  position?:
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'left'
    | 'leftTop'
    | 'leftBottom'
    | 'right'
    | 'rightTop'
    | 'rightBottom'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight';
}>) => {
  return (
    <AntdTooltip placement={position} title={content} destroyTooltipOnHide>
      {children}
    </AntdTooltip>
  );
};
