/**
 * defaultShowCode: true
 */
import React, { useRef, useState } from "react";
import type { Descendant } from "slate";
import DSlate from "@dslate/antd";
import type { DSlateRef } from "@dslate/core";
import { Button, Form, Input } from "antd";

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const ref = useRef<DSlateRef>(null);

  return (
    <div>
      <Form.Item label="普通输入框">
        <Input />
      </Form.Item>

      <DSlate ref={ref} value={value} onChange={setValue} />
      <br />
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
    </div>
  );
};
