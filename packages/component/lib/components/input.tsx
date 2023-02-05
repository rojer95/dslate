import React, { PropsWithChildren } from "react";
import { getElement } from "../element";

type InputProps = {
  value?: string;
  onChange: (value: string) => void;
  [index: string]: any;
};

const Input = ({ children, ...props }: PropsWithChildren<InputProps>) => {
  const InputElement = getElement("input");
  if (!InputElement) return null;
  return React.createElement(InputElement, props as any, children);
};

export { Input };
