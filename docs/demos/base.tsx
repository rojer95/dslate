/**
 * defaultShowCode: true
 */
import React, { useRef, useState } from 'react';
import type { Descendant } from 'slate';
import DSlate from '@dslate/dslate';
import type { DSlateRef } from '@dslate/core';

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
      <DSlate ref={ref} value={value} onChange={setValue} />
      <button
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
      </button>
    </div>
  );
};
