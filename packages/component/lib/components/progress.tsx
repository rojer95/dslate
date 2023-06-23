import { usePluginHelper } from '@dslate/core';
import React, { PropsWithChildren, useMemo } from 'react';
import { getElement } from '../element';

type ProgressProps = {
  percent?: number;
  [index: string]: any;
};

const Progress = ({ children, ...props }: PropsWithChildren<ProgressProps>) => {
  const { percent } = usePluginHelper();
  const ProgressElement = getElement('progress');

  console.log('percent', percent);

  const visible = useMemo(() => {
    return percent && Number(percent) > 0 && Number(percent) < 100;
  }, [percent]);

  if (!ProgressElement || !visible) return null;

  return React.createElement(
    ProgressElement,
    { ...(props || {}), percent } as any,
    children,
  );
};

export { Progress };
