import { ConfigContext } from '@dslate/core';
import React, { PropsWithChildren, useContext } from 'react';
import { getElement } from '../element';

export type ButtonProps = {
  onClick?: (e: MouseEvent) => void;
  active?: boolean;
  disabled?: boolean;
  [index: string]: any;
};

const Button = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  const ctx = useContext(ConfigContext);
  const ButtonElement = getElement('button', ctx.namespace);
  if (!ButtonElement) return null;
  return React.createElement(ButtonElement, props as any, children);
};

export { Button };
