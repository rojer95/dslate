import React, { useState } from 'react';
import type { Descendant } from 'slate';

import DSlate from 'dslate';

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'line',
      children: [{ text: '' }],
    },
  ]);
  return <DSlate value={value} onChange={setValue} />;
};
