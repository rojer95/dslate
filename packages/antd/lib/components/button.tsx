import React, { PropsWithChildren } from "react";
import { Button as AntdButton, theme } from "antd";

const { useToken } = theme;
export const Button = ({
  children,
  active,
  disabled,
  ...props
}: PropsWithChildren<any>) => {
  const { token } = useToken();
  return (
    <AntdButton
      {...props}
      disabled={disabled}
      type="text"
      style={{
        color: disabled
          ? token.colorTextDisabled
          : active
          ? token.colorPrimary
          : token.colorText,
      }}
    >
      {children}
    </AntdButton>
  );
};
