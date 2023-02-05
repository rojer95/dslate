import React, { useEffect, useRef, useState } from "react";
import type { Descendant } from "slate";
import DSlate from "../lib/index";
import type { DSlateRef } from "@dslate/core";

import { ConfigProvider, Button, Form, Space, Input, theme } from "antd";
const { useToken } = theme;

export default () => {
  const { token } = useToken();
  const [isDark, setSsDark] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(token.colorPrimary);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const ref = useRef<DSlateRef>(null);

  const switchMode = () => {
    setSsDark((i) => !i);
  };

  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = "#000000";
    } else {
      document.body.style.backgroundColor = "#FFFFFF";
    }
  }, [isDark]);

  const toggleTheme = () => {
    setPrimaryColor((p) =>
      p === token.colorPrimary ? "#ff9d00" : token.colorPrimary
    );
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: primaryColor,
          },
        }}
      >
        <Form layout="vertical">
          <Form.Item name="input" label="普通输入框">
            <Input />
          </Form.Item>

          <Form.Item name="textarea" label="多行输入框">
            <Input.TextArea />
          </Form.Item>
          <DSlate ref={ref} value={value} onChange={setValue} />
          <br />
          <br />
          <Space>
            <Button
              onClick={() => {
                console.log(value);
                console.log(
                  ref.current?.serialize({
                    children: value,
                  })
                );
              }}
            >
              转内容为HTML
            </Button>
            <Button onClick={toggleTheme}>切换主题</Button>
            <Button onClick={switchMode}>暗色模式</Button>
          </Space>
        </Form>
      </ConfigProvider>
    </div>
  );
};
