import { ComponentClass, FunctionComponent } from 'react';

export type ElementType =
  | 'tooltip'
  | 'divider'
  | 'progress'
  | 'popover'
  | 'input'
  | 'input-number'
  | 'button'
  | 'select'
  | 'textarea';

export const elements: {
  type: ElementType;
  elemet: FunctionComponent | ComponentClass | string | undefined;
  namespace: string | symbol;
}[] = [];

export const registerElement = (
  type: ElementType,
  elemet: FunctionComponent | ComponentClass | string,
  namespace: string | symbol,
) => {
  elements.push({
    type,
    elemet,
    namespace,
  });
};

export const getElement = (type: ElementType, namespace?: string | symbol) => {
  const target = elements.find(
    (i) => i.type === type && i.namespace === namespace,
  );

  if (!target) {
    console.warn('Please reigster element first: ' + type);
    return null;
  }

  return target.elemet;
};
