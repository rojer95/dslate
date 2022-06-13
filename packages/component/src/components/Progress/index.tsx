import React from 'react';
import { usePluginHelper } from '@dslate/core';

export default () => {
  const { getPrefixCls, percent } = usePluginHelper();

  const prefixCls = getPrefixCls?.('progress');

  const percentStyle = {
    width: `${percent?.toFixed(2)}%`,
    height: 2,
    visibility: percent && Number(percent) > 0 && Number(percent) < 100 ? 'visible' : 'hidden',
    transition: 'all 200ms',
  } as React.CSSProperties;

  return (
    <div className={getPrefixCls?.('progress-box')}>
      <div className={prefixCls}>
        <div className={`${prefixCls}-outer`}>
          <div className={`${prefixCls}-inner`}>
            <div className={`${prefixCls}-bg`} style={percentStyle} />
          </div>
        </div>
      </div>
    </div>
  );
};
