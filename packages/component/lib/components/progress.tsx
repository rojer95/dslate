import { ConfigContext, usePluginHelper } from '@dslate/core';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { getElement } from '../element';

type ProgressProps = {
  percent?: number;
  [index: string]: any;
};

const Progress = ({ children, ...props }: PropsWithChildren<ProgressProps>) => {
  const { percent } = usePluginHelper();
  const { namespace } = useContext(ConfigContext);
  const ProgressElement = getElement('progress', namespace);

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
