import React, { useState } from "react";

import DSlate, { ConfigProvider, defaultConfig } from "@dslate/semi";
import { Locales } from "@dslate/core";

import {
  DatePicker,
  LocaleProvider as SemiLocaleProvider,
  ConfigProvider as SemiConfigProvider,
} from "@douyinfe/semi-ui";
import enUS from "@douyinfe/semi-ui/lib/es/locale/source/en_US";
import zhCN from "@douyinfe/semi-ui/lib/es/locale/source/zh_CN";

import type { Descendant } from "slate";
import { Radio, Space } from "@douyinfe/semi-ui";

// 将DSlate的语言定义与Semi的语言包关联起来
const locales = {
  [Locales.enUS]: enUS,
  [Locales.zhCN]: zhCN,
};

export default () => {
  const [localeCode, setLocaleCode] = useState<string>(Locales.zhCN);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
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
              setLocaleCode(currentLocaleCode);
            }}
            options={[
              {
                value: Locales.zhCN,
                label: "中文",
              },
              {
                value: Locales.enUS,
                label: "English",
              },
            ]}
          />
        </Space>
      </div>

      {/* Semi国际化配置 */}
      <SemiLocaleProvider locale={locales[localeCode]}>
        <SemiConfigProvider locale={locales[localeCode]}>
          <div style={{ marginBottom: 16 }}>
            {/* DSlate的国际化配置 */}
            <ConfigProvider
              value={{
                ...defaultConfig,
                // 通过DSlate提供的 ConfigProvider 定义编辑器语言包。目前只有 placeholder 有用到，其余的语言包均定义在插件内部
                locales: [
                  { locale: zhCN.code, placeholder: "请在这里输入呦 (#^.^#)" },
                  {
                    locale: enUS.code,
                    placeholder: "please enter here (#^.^#)",
                  },
                ],
                // 当前选择的语言
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
      </SemiLocaleProvider>
    </div>
  );
};
