import React, { useState } from 'react';

import DSlate from '@dslate/semi';
import { ConfigProvider, defaultConfig, Locales } from '@dslate/core';

import {
  DatePicker,
  LocaleProvider,
  ConfigProvider as SemiConfigProvider,
} from '@douyinfe/semi-ui';
import enUS from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import zhCN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';

import type { Descendant } from 'slate';
import { Radio, Space } from '@douyinfe/semi-ui';
import type { Locale } from '@douyinfe/semi-ui/locale/interface';

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
              const currentLocaleCode = e.target.value;
              setLocale(locales[currentLocaleCode]);
              setLocaleCode(currentLocaleCode);
            }}
            options={[
              {
                value: Locales.enUS,
                label: 'English',
              },
              {
                value: Locales.zhCN,
                label: '中文',
              },
            ]}
          />
        </Space>
      </div>

      <LocaleProvider locale={locale}>
        <SemiConfigProvider locale={locale}>
          <div style={{ marginBottom: 16 }}>
            <ConfigProvider
              value={{
                ...defaultConfig,
                // 通过DSlate提供的 ConfigProvider 定义编辑器语言包。目前只有 placeholder 有用到，其余的语言包均定义在插件内部
                locales: [
                  { locale: zhCN.code, placeholder: '请在这里输入呦 (#^.^#)' },
                  { locale: enUS.code, placeholder: 'please enter here (#^.^#)' },
                ],
                locale: localeCode,
              }}
            >
              <DSlate value={value} onChange={setValue} />
            </ConfigProvider>
          </div>
          <div style={{ marginBottom: 16 }}>Semi组件：</div>
          <div style={{ marginBottom: 16 }}>
            <DatePicker />
          </div>
        </SemiConfigProvider>
      </LocaleProvider>
    </div>
  );
};
