/**
 * defaultShowCode: true
 */
import DSlate, { DefaultToolbar, DSlateRef } from '@dslate/antd';
import { Button, ConfigProvider, Input, Space, theme } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { Descendant } from 'slate';

export default () => {
  const [resultWeapp, setResultWeapp] = useState<string>();
  const [resultHtml, setResultHtml] = useState<string>();
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [
        { text: '当' },
        { type: 'latex', children: [{ text: '' }], formula: 'b=1' },
        { text: '、' },
        { type: 'latex', children: [{ text: '' }], formula: 'c=2' },
        { text: '时，请计算' },
        { type: 'latex', children: [{ text: '' }], formula: 'a=b+c' },
        { text: '的结果？' },
      ],
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
        <DSlate
          toolbar={[...DefaultToolbar, 'latex']}
          ref={ref}
          value={value}
          onChange={setValue}
        />
        <br />
        <Space>
          <Button
            onClick={() => {
              setResultWeapp(
                JSON.stringify(
                  ref.current?.serializeWeapp({
                    children: value,
                  }),
                  null,
                  2,
                ),
              );
              setResultHtml(
                ref.current?.serialize?.({
                  children: value,
                }),
              );
            }}
          >
            转格式
          </Button>
          <Button onClick={switchMode}>
            {mode === 'dark' ? '亮色模式' : '暗色模式'}
          </Button>
        </Space>
        <br />
        <p>小程序结果：</p>
        <Input.TextArea value={resultWeapp} autoSize readOnly />

        <br />
        <p>html结果：</p>
        <Input.TextArea value={resultHtml} autoSize readOnly />
      </div>
    </ConfigProvider>
  );
};
