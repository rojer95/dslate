import { ComponentClass, FunctionComponent } from 'react';

export type ElementType =
  | 'tooltip'
  | 'divider'
  | 'progress'
  | 'popover'
  | 'input'
  | 'input-number'
  | 'button'
  | 'select';

export const elements: Record<
  ElementType,
  FunctionComponent | ComponentClass | string | undefined
> = {
  tooltip: undefined,
  divider: undefined,
  progress: undefined,
  popover: undefined,
  input: undefined,
  'input-number': undefined,
  button: undefined,
  select: undefined,
};

export const registerElement = (
  type: ElementType,
  elemet: FunctionComponent | ComponentClass | string,
) => {
  elements[type] = elemet;
};

export const getElement = (type: ElementType) => {
  if (!elements[type]) {
    console.warn('Please reigster element first: ' + type);
    return null;
  }

  return elements[type];
};
