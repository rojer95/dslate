import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { useFocused } from 'slate-react';
import SizeContext from 'antd/lib/config-provider/SizeContext';

import type { DSlateRef } from '@dslate/core';
import DSlate, { usePluginHelper } from '@dslate/core';
import { Toolbar, Progress, Editable, Counter } from '@dslate/component';

import type { AntdStyleDSlateProps } from '../../typing';

import './index.less';

const AntdStyleEditor = ({
  bordered = true,
  size: customizeSize,
  showCount = false,
  disabled = false,
  placeholder,
  toolbar,
  className,
}: Omit<AntdStyleDSlateProps, 'value' | 'onChange'>) => {
  const focused = useFocused();
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = getPrefixCls?.('');

  return (
    <SizeContext.Consumer>
      {(size) => {
        const realSize = customizeSize || size;
        return (
          <div
            className={classNames(`${prefixCls}`, className, {
              [`${prefixCls}-sm`]: realSize === 'small',
              [`${prefixCls}-lg`]: realSize === 'large',
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
      }}
    </SizeContext.Consumer>
  );
};

export default forwardRef<DSlateRef, AntdStyleDSlateProps>(({ value, onChange, ...rest }, ref) => {
  const { getPrefixCls: getAntdPrefixCls } = useContext(AntdConfigProvider.ConfigContext);
  return (
    <DSlate ref={ref} value={value} onChange={onChange} prefixCls={getAntdPrefixCls('dslate')}>
      <AntdStyleEditor {...rest} />
    </DSlate>
  );
});
