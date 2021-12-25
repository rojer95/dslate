import React, { useState } from 'react';
import { Descendant } from 'slate';

import DSlate from 'dslate';

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'p',
      children: [{ text: 'abc', color: '#eeeeee' }, { text: '123' }, { text: 'EDC', color: 'red' }],
    },
  ]);
  return <DSlate value={value} onChange={setValue} />;
};
