import React, { useState } from 'react';

import { ConfigProvider, DatePicker, Radio, Space } from 'antd';
import DSlate from 'dslate';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

import type { Descendant } from 'slate';
import type { Locale } from 'antd/lib/locale-provider';

export default () => {
  const [locale, setLocale] = useState<Locale>(enUS);
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
            value={locale}
            onChange={(e) => {
              const localeValue = e.target.value;
              setLocale(localeValue);
            }}
          >
            <Radio.Button key="en" value={enUS}>
              English
            </Radio.Button>
            <Radio.Button key="cn" value={zhCN}>
              中文
            </Radio.Button>
          </Radio.Group>
        </Space>
      </div>
      <ConfigProvider locale={locale}>
        <div style={{ marginBottom: 16 }}>
          <DSlate value={value} onChange={setValue} />
        </div>
        <div style={{ marginBottom: 16 }}>Antd组件：</div>
        <div style={{ marginBottom: 16 }}>
          <DatePicker />
        </div>
      </ConfigProvider>
    </div>
  );
};
