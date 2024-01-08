import { Tooltip as SemiTooltip } from '@douyinfe/semi-ui';
import { PropsWithChildren } from 'react';

export const Tooltip = ({ children, ...props }: PropsWithChildren<any>) => {
  return (
    <SemiTooltip {...props}>
      <span>{children}</span>
    </SemiTooltip>
  );
};
