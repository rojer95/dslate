import React, { PropsWithChildren } from "react";
import { Select as AntdSelect } from "antd";

export const Select = ({
  children,
  active,
  optionList,
  triggerRender,
  ...props
}: PropsWithChildren<any>) => {
  return (
    <AntdSelect {...props} bordered={false} options={optionList}>
      {children}
    </AntdSelect>
  );
};
