import React, { useState } from 'react';

import { ConfigProvider as AntdConfigProvider, DatePicker, Radio, Space } from 'antd';
import DSlate from '@dslate/dslate';
import { ConfigProvider, defaultConfig } from '@dslate/core';
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
      <AntdConfigProvider locale={locale}>
        <div style={{ marginBottom: 16 }}>
          <ConfigProvider
            value={{
              ...defaultConfig,
              // 通过DSlate提供的 ConfigProvider 定义编辑器语言包。目前只有 placeholder 有用到，其余的语言包均定义在插件内部
              locales: [
                { locale: zhCN.locale, placeholder: '请在这里输入呦 (#^.^#)' },
                { locale: enUS.locale, placeholder: 'please enter here (#^.^#)' },
              ],
            }}
          >
            <DSlate value={value} onChange={setValue} />
          </ConfigProvider>
        </div>
        <div style={{ marginBottom: 16 }}>Antd组件：</div>
        <div style={{ marginBottom: 16 }}>
          <DatePicker />
        </div>
      </AntdConfigProvider>
    </div>
  );
};
