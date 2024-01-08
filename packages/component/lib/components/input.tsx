import { ConfigContext } from '@dslate/core';
import React, { PropsWithChildren, useContext } from 'react';
import { getElement } from '../element';

type InputProps = {
  value?: string;
  onChange: (value: string) => void;
  [index: string]: any;
};

const Input = ({ children, ...props }: PropsWithChildren<InputProps>) => {
  const { namespace } = useContext(ConfigContext);
  const InputElement = getElement('input', namespace);
  if (!InputElement) return null;
  return React.createElement(InputElement, props as any, children);
};

export { Input };
