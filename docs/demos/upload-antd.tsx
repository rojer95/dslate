/**
 * defaultShowCode: true
 */
import React, { useState } from 'react';
import type { Descendant } from 'slate';

import DSlate, { ConfigProvider, defaultConfig } from '@dslate/antd';

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
              setTimeout(() => {
                onSuccess?.({
                  url: `https://www.dmoe.cc/random.php?t=${new Date().valueOf()}`,
                });
              }, 1000);
            }, 1000);
          },
        }}
      >
        <DSlate value={value} onChange={setValue} />
      </ConfigProvider>
    </div>
  );
};
