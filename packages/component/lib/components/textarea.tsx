import React, { PropsWithChildren } from 'react';
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
  const InputElement = getElement('textarea');
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
