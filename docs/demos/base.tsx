import DSlateAntd from '@dslate/antd';
import DSlateSemi from '@dslate/semi';
import React, { useState } from 'react';
import type { Descendant } from 'slate';

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  return (
    <>
      <DSlateAntd
        value={value}
        onChange={setValue}
        placeholder="Antd 风格编辑器"
      />
      <br />
      <br />
      <DSlateSemi
        value={value}
        onChange={setValue}
        placeholder="Semi 风格编辑器"
      />
    </>
  );
};
