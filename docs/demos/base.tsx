import React, { useState } from 'react';
import type { Descendant } from 'slate';
import DSlateAnt from '@dslate/dslate';
import DSlateSemi from '@dslate/semi';

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  return (
    <div>
      <DSlateAnt value={value} onChange={setValue} placeholder="Ant 风格编辑器" />
      <br />
      <br />
      <DSlateSemi value={value} onChange={setValue} placeholder="Semi 风格编辑器" />
    </div>
  );
};
