import { ConfigContext } from '@dslate/core';
import React, { PropsWithChildren, useContext } from 'react';
import { getElement } from '../element';

type TooltipProps = {
  content: string;
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

const Tooltip = ({ children, ...props }: PropsWithChildren<TooltipProps>) => {
  const { namespace } = useContext(ConfigContext);
  const TooltipElement = getElement('tooltip', namespace);
  if (!TooltipElement) return null;
  if (!props.content) return <>{children}</>;
  return React.createElement(TooltipElement, props as any, children);
};

export { Tooltip };
