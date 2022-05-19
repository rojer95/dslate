import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { useFocused } from 'slate-react';
import type { DSlateRef } from '@dslate/core';
import DSlate, { usePluginHelper } from '@dslate/core';
import { Toolbar, Progress, Editable, Counter } from '@dslate/component';

import type { SemiStyleDSlateProps } from '../typing';

import './index.less';

const SemiStyleEditor = ({
  bordered = true,
  showCount = false,
  disabled = false,
  placeholder,
  toolbar,
  className,
}: Omit<SemiStyleDSlateProps, 'value' | 'onChange'>) => {
  const focused = useFocused();
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = getPrefixCls?.('');

  return (
    <div
      className={classNames(`${prefixCls}`, className, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-borderless`]: !bordered,
        [`${prefixCls}-focused`]: focused,
      })}
    >
      <Toolbar toolbar={toolbar} />
      <Progress />
      <Editable disabled={disabled} placeholder={placeholder} />
      <Counter showCount={showCount} />
    </div>
  );
};

export default forwardRef<DSlateRef, SemiStyleDSlateProps>(({ value, onChange, ...rest }, ref) => {
  return (
    <DSlate ref={ref} value={value} onChange={onChange} prefixCls={'semi-dslate'}>
      <SemiStyleEditor {...rest} />
    </DSlate>
  );
});
