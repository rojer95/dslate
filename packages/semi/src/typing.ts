import type { DSlateProps } from '@dslate/core';
import type { ProgressProps, ShowCountProps } from '@dslate/core';

export interface SemiStyleDSlateProps extends Omit<DSlateProps, 'prefixCls'> {
  toolbar?: string[];
  bordered?: boolean;
  showCount?: boolean | ShowCountProps;
  disabled?: boolean;
  placeholder?: string;
  progress?: ProgressProps;
}
