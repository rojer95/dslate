import type { InputHTMLAttributes } from 'react';
import React from 'react';
import { usePluginHelper } from '@dslate/core';

const Input = ({
  prefixCls = 'input',
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { prefixCls?: string }) => {
  const { getPrefixCls } = usePluginHelper();
  return <input {...props} className={getPrefixCls?.(prefixCls)} />;
};

export default Input;
