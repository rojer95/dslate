/**
 * defaultShowCode: true
 */
import React, { useRef, useState } from 'react';
import type { Descendant } from 'slate';
import DSlate from '@dslate/semi';
import type { DSlateRef } from '@dslate/core';

import { Button } from '@douyinfe/semi-ui';

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const ref = useRef<DSlateRef>(null);

  return (
    <div>
      <DSlate className="my-style" ref={ref} value={value} onChange={setValue} showCount />
      <br />
      <Button
        onClick={() => {
          console.log(value);
          console.log(
            ref.current?.serialize({
              children: value,
            }),
          );
        }}
      >
        转内容为HTML
      </Button>
    </div>
  );
};
