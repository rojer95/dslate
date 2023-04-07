import { Popover as AntdPopover } from "antd";
import React, { PropsWithChildren } from "react";

export const Popover = ({
  content,
  position,
  children,
  trigger,
  visible,
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

  trigger?: string;
  visible?: boolean;
}>) => {
  return (
    <AntdPopover
      trigger={trigger}
      placement={position}
      content={content}
      overlayInnerStyle={{ padding: 0 }}
      open={visible}
    >
      {children}
    </AntdPopover>
  );
};
