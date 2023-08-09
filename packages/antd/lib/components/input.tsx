import { Input as AntdInput } from 'antd';
import { PropsWithChildren } from 'react';

export const Input = ({
  children,
  onChange,
  ...props
}: PropsWithChildren<any>) => {
  return (
    <AntdInput
      {...props}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    >
      {children}
    </AntdInput>
  );
};
