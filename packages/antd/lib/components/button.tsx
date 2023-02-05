import React, { PropsWithChildren } from "react";
import { Button as AntdButton, theme } from "antd";

const { useToken } = theme;
export const Button = ({
  children,
  active,
  ...props
}: PropsWithChildren<any>) => {
  const { token } = useToken();
  return (
    <AntdButton
      {...props}
      type="text"
      style={{
        color: active ? token.colorPrimary : token.colorText,
      }}
    >
      {children}
    </AntdButton>
  );
};
