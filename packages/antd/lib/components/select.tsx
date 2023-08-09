/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select as AntdSelect } from 'antd';
import { PropsWithChildren } from 'react';

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
