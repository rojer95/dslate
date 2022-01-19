import React from 'react';
import { Node } from 'slate';
import { useSlate } from 'slate-react';
import { usePluginHelper } from '@dslate/core';
import type { ShowCountProps } from '@dslate/core';

export default ({ showCount = false }: { showCount?: boolean | ShowCountProps }) => {
  const { getPrefixCls } = usePluginHelper();
  const editor = useSlate();

  if (!showCount) return null;
  const count = Node.string(editor).length;
  return (
    <div className={getPrefixCls?.('counter')}>
      {typeof showCount === 'object' ? showCount.formatter({ count }) : `${count}字`}
    </div>
  );
};
