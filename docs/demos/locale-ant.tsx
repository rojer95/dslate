import React, { useState } from 'react';

import { ConfigProvider as AntdConfigProvider, DatePicker, Radio, Space } from 'antd';
import DSlate from '@dslate/dslate';
import { ConfigProvider, defaultConfig, Locales } from '@dslate/core';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

import type { Descendant } from 'slate';
import type { Locale } from 'antd/lib/locale-provider';

const locales = {
  [Locales.enUS]: enUS,
  [Locales.zhCN]: zhCN,
};

export default () => {
  const [localeCode, setLocaleCode] = useState<string>(Locales.enUS);
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
            value={localeCode}
            onChange={(e) => {
              const localeValue = e.target.value;
              setLocaleCode(localeValue);
              setLocale(locales[localeValue]);
            }}
          >
            <Radio.Button key={Locales.enUS} value={Locales.enUS}>
              English
            </Radio.Button>
            <Radio.Button key={Locales.zhCN} value={Locales.zhCN}>
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
              locale: localeCode,
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
