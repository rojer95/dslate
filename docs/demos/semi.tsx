/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import type { Descendant } from 'slate';

import DSlate from '@dslate/semi';

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  return <DSlate value={value} onChange={setValue} />;
};
