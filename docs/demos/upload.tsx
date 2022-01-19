/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import type { Descendant } from 'slate';

import DSlate from '@dslate/dslate';
import { ConfigProvider, defaultConfig } from '@dslate/core';

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  return (
    <div>
      <ConfigProvider
        value={{
          ...defaultConfig,
          customUploadRequest: ({ onSuccess, onProgress }) => {
            onProgress?.({ percent: 10 });
            setTimeout(() => {
              onProgress?.({ percent: 50 });
            }, 500);
            setTimeout(() => {
              onSuccess?.({
                url: `https://source.unsplash.com/300x200/?t=${new Date().valueOf()}`,
              });
            }, 1000);
          },
        }}
      >
        <DSlate value={value} onChange={setValue} />
      </ConfigProvider>
    </div>
  );
};
