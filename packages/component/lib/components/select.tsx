import { ConfigContext } from '@dslate/core';
import React, { PropsWithChildren, useContext } from 'react';
import { getElement } from '../element';

type SelectProps = {
  onChange: (value: any) => void;
  optionList?: { value: any; label: any }[];
  disabled?: boolean;
  [index: string]: any;
};

const Select = ({ children, ...props }: PropsWithChildren<SelectProps>) => {
  const { namespace } = useContext(ConfigContext);
  const SelectElement = getElement('select', namespace);
  if (!SelectElement) return null;
  return React.createElement(SelectElement, props as any, children);
};

export { Select };
