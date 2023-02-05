import type { DSlateProps } from "@dslate/core";
import type { ProgressProps, ShowCountProps } from "@dslate/core";

export interface SemiStyleDSlateProps extends DSlateProps {
  toolbar?: string[];
  bordered?: boolean;
  showCounter?: boolean | ShowCountProps;
  disabled?: boolean;
  placeholder?: string;
  progress?: ProgressProps;
  className?: string;
}
