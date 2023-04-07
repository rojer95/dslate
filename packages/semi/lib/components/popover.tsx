import { Popover as SemiPopover } from "@douyinfe/semi-ui";
import { PropsWithChildren } from "react";

export const Popover = ({
  children,
  active,
  ...props
}: PropsWithChildren<any>) => {
  return (
    <SemiPopover {...props} style={{ padding: 0 }} showArrow>
      {children}
    </SemiPopover>
  );
};
