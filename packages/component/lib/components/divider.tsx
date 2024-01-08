import { ConfigContext } from '@dslate/core';
import React, { PropsWithChildren, useContext } from 'react';
import { getElement } from '../element';

type DividerProps = {
  layout?: 'vertical' | 'horizontal';
  [index: string]: any;
};

const Divider = ({ children, ...props }: PropsWithChildren<DividerProps>) => {
  const { namespace } = useContext(ConfigContext);
  const DividerElement = getElement('divider', namespace);
  if (!DividerElement) return null;
  return React.createElement(DividerElement, props as any, children);
};

export { Divider };
