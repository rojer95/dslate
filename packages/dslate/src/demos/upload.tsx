import React, { useState } from 'react';
import type { Descendant } from 'slate';

import DSlate, { ConfigProvider, defaultConfig } from 'dslate';
import axios from 'axios';
import { message, Radio, Space } from 'antd';

export default () => {
  const [url, setUrl] = useState('/api/upload');
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <span style={{ marginRight: 16 }}>Change locale of components: </span>
          <Radio.Group
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            value={url}
          >
            <Radio.Button value="https://www.mocky.io/v2/5cc8019d300000980a055e76">
              失败情况
            </Radio.Button>
            <Radio.Button value="/api/upload">成功情况</Radio.Button>
          </Radio.Group>
        </Space>
      </div>
      <ConfigProvider
        value={{
          ...defaultConfig,
          customUploadRequest: ({ file, onSuccess, onError, onProgress }) => {
            const formData = new FormData();
            formData.append('file', file);
            axios
              .post(url, formData, {
                headers: {
                  authorization: 'authorization-text',
                },
                onUploadProgress: ({ total, loaded }) => {
                  onProgress?.({ percent: Number(Math.round((loaded / total) * 100).toFixed(2)) });
                },
              })
              .then(({ data: response }) => {
                onSuccess?.(response);
              })
              .catch((error) => {
                message.error(error.message);
                onError?.(error);
              });
          },
        }}
      >
        <DSlate value={value} onChange={setValue} />
      </ConfigProvider>
    </div>
  );
};
