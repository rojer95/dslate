/**
 * defaultShowCode: true
 */
import DSlate, { DSlateRef } from '@dslate/antd';
import { Button, ConfigProvider, Form, Input, Space, theme } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { Descendant } from 'slate';

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const ref = useRef<DSlateRef>(null);
  const [mode, setMode] = useState(
    document.documentElement.getAttribute('data-prefers-color') ?? 'light',
  );

  const switchMode = () => {
    const doc = document.documentElement;
    const attrName = 'data-prefers-color';
    if (!doc.hasAttribute(attrName) || doc.getAttribute(attrName) === 'dark') {
      doc.setAttribute(attrName, 'light');
      setMode('light');
    } else {
      doc.setAttribute(attrName, 'dark');
      setMode('dark');
    }
  };

  const watch = (mutationsList: any[]) => {
    const attrName = 'data-prefers-color';
    for (const mutation of mutationsList) {
      if (mutation.attributeName === attrName) {
        setMode(document.documentElement.getAttribute(attrName) ?? 'light');
      }
    }
  };

  useEffect(() => {
    let observer: any;
    if (MutationObserver) {
      observer = new MutationObserver(watch);
      // 以上述配置开始观察目标节点
      observer.observe(document.documentElement, { attributes: true });
      // 之后，可停止观察
    }
    return () => observer?.disconnect?.();
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div>
        <Form.Item label="普通输入框">
          <Input />
        </Form.Item>

        <DSlate ref={ref} value={value} onChange={setValue} />
        <br />
        <Space>
          <Button
            onClick={() => {
              console.log(value);
              console.log(
                ref.current?.serialize({
                  children: value,
                }),
              );
            }}
          >
            转内容为HTML
          </Button>
          <Button onClick={switchMode}>
            {mode === 'dark' ? '亮色模式' : '暗色模式'}
          </Button>
        </Space>
      </div>
    </ConfigProvider>
  );
};
