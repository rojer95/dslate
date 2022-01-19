import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { DSlateProps } from '@dslate/core';
import type { ProgressProps, ShowCountProps } from '@dslate/core';

export interface AntdStyleDSlateProps extends Omit<DSlateProps, 'prefixCls'> {
  toolbar?: string[];
  bordered?: boolean;
  size?: SizeType;
  showCount?: boolean | ShowCountProps;
  disabled?: boolean;
  placeholder?: string;
  progress?: ProgressProps;
}
