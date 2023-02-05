import { Button as SemiButton } from "@douyinfe/semi-ui";
import { PropsWithChildren } from "react";

export const Button = ({
  children,
  active,
  ...props
}: PropsWithChildren<any>) => {
  return (
    <SemiButton
      {...props}
      theme="borderless"
      type={active ? "primary" : "tertiary"}
    >
      {children}
    </SemiButton>
  );
};
