import React from 'react';
import { Progress } from 'antd';
import type { ProgressProps } from '@dslate/core';
import { usePluginHelper } from '@dslate/core';

export default ({ progress }: { progress: ProgressProps }) => {
  const { getPrefixCls, percent } = usePluginHelper();

  return percent ? (
    <div className={getPrefixCls?.('progress-box')}>
      <div className={getPrefixCls?.('progress')}>
        <Progress
          {...progress}
          type="line"
          percent={percent === -1 ? 100 : percent}
          status={percent === -1 ? 'exception' : 'active'}
        />
      </div>
    </div>
  ) : null;
};
