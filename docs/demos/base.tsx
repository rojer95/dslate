import DSlateAntd from '@dslate/antd';
import DSlateSemi from '@dslate/semi';
import React, { useEffect, useState } from 'react';
import type { Descendant } from 'slate';

export default () => {
  const [value1, setValue1] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const [value2, setValue2] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  useEffect(() => {
    console.log(value1);
  }, [value1]);

  return (
    <>
      <DSlateAntd
        value={value1}
        onChange={setValue1}
        placeholder="Antd 风格编辑器"
      />
      <br />
      <br />
      <DSlateSemi
        value={value2}
        onChange={setValue2}
        placeholder="Semi 风格编辑器"
      />
    </>
  );
};
