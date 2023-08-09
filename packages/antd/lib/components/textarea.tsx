import { Input as AntdInput } from 'antd';
import { PropsWithChildren } from 'react';

export const Textarea = ({
  children,
  onChange,
  ...props
}: PropsWithChildren<any>) => {
  return (
    <AntdInput.TextArea
      {...props}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    >
      {children}
    </AntdInput.TextArea>
  );
};
