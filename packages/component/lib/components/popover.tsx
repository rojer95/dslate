import { ConfigContext, usePlugin } from '@dslate/core';
import React, { PropsWithChildren, ReactNode, useContext } from 'react';
import { getElement } from '../element';

type PopoverProps = {
  content: ReactNode;
  trigger?: 'hover' | 'focus' | 'click' | 'custom';
  visible?: boolean;
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
  [index: string]: any;
};

const Popover = ({ children, ...props }: PropsWithChildren<PopoverProps>) => {
  const { namespace } = useContext(ConfigContext);
  const { disabled: globalDisabled } = usePlugin();
  const isDisabled = globalDisabled;
  const PopoverElement = getElement('popover', namespace);
  if (!PopoverElement) return null;
  if (isDisabled) return <>{children}</>;
  return React.createElement(PopoverElement, props as any, children);
};

export { Popover };
