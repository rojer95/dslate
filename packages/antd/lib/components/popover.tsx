import { Popover as AntdPopover } from "antd";
import React, { PropsWithChildren } from "react";

export const Popover = ({
  content,
  position,
  children,
}: PropsWithChildren<{
  content?: React.ReactNode;
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
}>) => {
  return (
    <AntdPopover
      placement={position}
      content={content}
      overlayInnerStyle={{ padding: 0 }}
    >
      {children}
    </AntdPopover>
  );
};
