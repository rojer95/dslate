import React from 'react';
import classNames from 'classnames';
import { useFocused } from 'slate-react';

import DSlate, { usePluginHelper } from '@dslate/core';
import { Toolbar, Progress, Editable, Counter } from '@dslate/component';

import type { SemiStyleDSlateProps } from '../../typing';

import './index.less';

const SemiStyleEditor = ({
  bordered = true,
  showCount = false,
  disabled = false,
  placeholder,
  toolbar,
}: Omit<SemiStyleDSlateProps, 'value' | 'onChange'>) => {
  const focused = useFocused();
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = getPrefixCls?.('');

  return (
    <div
      className={classNames(`${prefixCls}`, {
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

export default ({ value, onChange, ...rest }: SemiStyleDSlateProps) => {
  return (
    <DSlate value={value} onChange={onChange} prefixCls={'semi-dslate'}>
      <SemiStyleEditor {...rest} />
    </DSlate>
  );
};
