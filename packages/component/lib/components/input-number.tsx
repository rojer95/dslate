import React, { PropsWithChildren } from "react";
import { getElement } from "../element";

type InputProps = {
  value?: number | string;
  onChange: (value: number | string) => void;
  min?: number;
  max?: number;
  precision?: number;
  [index: string]: any;
};

const InputNumber = ({ children, ...props }: PropsWithChildren<InputProps>) => {
  const InputElement = getElement("input-number");
  if (!InputElement) return null;
  return React.createElement(InputElement, props as any, children);
};

export { InputNumber };
