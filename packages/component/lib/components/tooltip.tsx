import React, { PropsWithChildren } from "react";
import { getElement } from "../element";

type TooltipProps = {
  content: string;
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

const Tooltip = ({ children, ...props }: PropsWithChildren<TooltipProps>) => {
  const TooltipElement = getElement("tooltip");
  if (!TooltipElement) return null;
  return React.createElement(TooltipElement, props as any, children);
};

export { Tooltip };
