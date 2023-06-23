import React, { useState } from 'react';

import DSlate, { ConfigProvider, defaultConfig, Locales } from '@dslate/antd';
import {
  ConfigProvider as AntdConfigProvider,
  DatePicker,
  Radio,
  Space,
} from 'antd';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

import type { Descendant } from 'slate';

// 将DSlate的语言定义与Ant的语言包关联起来
const locales = {
  [Locales.enUS]: enUS,
  [Locales.zhCN]: zhCN,
};

export default () => {
  const [localeCode, setLocaleCode] = useState<string>(Locales.zhCN);
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
            }}
          >
            <Radio.Button key={Locales.zhCN} value={Locales.zhCN}>
              中文
            </Radio.Button>
            <Radio.Button key={Locales.enUS} value={Locales.enUS}>
              English
            </Radio.Button>
          </Radio.Group>
        </Space>
      </div>
      {/* Antd的国际化配置 */}
      <AntdConfigProvider locale={locales[localeCode]}>
        <div style={{ marginBottom: 16 }}>
          {/* DSlate的国际化配置 */}
          <ConfigProvider
            value={{
              ...defaultConfig,
              // 通过DSlate提供的 ConfigProvider 定义编辑器语言包。目前只有 placeholder 有用到，其余的语言包均定义在插件内部
              locales: [
                { locale: zhCN.locale, placeholder: '请在这里输入呦 (#^.^#)' },
                {
                  locale: enUS.locale,
                  placeholder: 'please enter here (#^.^#)',
                },
              ],
              // 当前选择的语言
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
