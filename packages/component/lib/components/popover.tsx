import React, { forwardRef, PropsWithChildren, ReactNode } from "react";
import { getElement } from "../element";

type PopoverProps = {
  content: ReactNode;
  trigger?: "hover" | "focus" | "click" | "custom";
  visible?: boolean;
  position?:
    | "top"
    | "topLeft"
    | "topRight"
    | "left"
    | "leftTop"
    | "leftBottom"
    | "right"
    | "rightTop"
    | "rightBottom"
    | "bottom"
    | "bottomLeft"
    | "bottomRight";
  [index: string]: any;
};

const Popover = ({ children, ...props }: PropsWithChildren<PopoverProps>) => {
  const PopoverElement = getElement("popover");
  if (!PopoverElement) return null;
  return React.createElement(PopoverElement, props as any, children);
};

export { Popover };
