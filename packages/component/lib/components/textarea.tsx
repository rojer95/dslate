import { ConfigContext } from '@dslate/core';
import React, { PropsWithChildren, useContext } from 'react';
import { getElement } from '../element';

type InputProps = {
  value?: string;
  onChange: (value: string) => void;
  autosize?: boolean;
  [index: string]: any;
};

const Textarea = ({
  children,
  autosize,
  ...props
}: PropsWithChildren<InputProps>) => {
  const { namespace } = useContext(ConfigContext);
  const InputElement = getElement('textarea', namespace);
  if (!InputElement) return null;
  return React.createElement(
    InputElement,
    {
      ...(props || {}),
      autoSize: autosize,
    } as any,
    children,
  );
};

export { Textarea };
