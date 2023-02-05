import React, { PropsWithChildren } from "react";
import { getElement } from "../element";

type DividerProps = {
  layout?: "vertical" | "horizontal";
  [index: string]: any;
};

const Divider = ({ children, ...props }: PropsWithChildren<DividerProps>) => {
  const DividerElement = getElement("divider");
  if (!DividerElement) return null;
  return React.createElement(DividerElement, props as any, children);
};

export { Divider };
