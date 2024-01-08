import { Divider as AntdDivider } from 'antd';
import { PropsWithChildren } from 'react';

export const Divider = ({
  layout,
}: PropsWithChildren<{
  layout?: 'vertical' | 'horizontal';
}>) => {
  return <AntdDivider type={layout} />;
};
