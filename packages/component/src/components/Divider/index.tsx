import { usePluginHelper } from '@dslate/core';
import React from 'react';

export default () => {
  const { getPrefixCls } = usePluginHelper();
  return <div className={getPrefixCls?.('divider')} role="separator" />;
};
