/**
 * defaultShowCode: true
 */
import DSlate, { DSlateRef } from '@dslate/semi';
import React, { useEffect, useRef, useState } from 'react';
import type { Descendant } from 'slate';

import { Button, Form, Space } from '@douyinfe/semi-ui';

const attrName = 'data-prefers-color';

export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const [mode, setMode] = useState(
    document.documentElement.getAttribute('data-prefers-color') ?? 'light',
  );

  const ref = useRef<DSlateRef>(null);

  const switchMode = () => {
    const doc = document.documentElement;
    if (!doc.hasAttribute(attrName) || doc.getAttribute(attrName) === 'dark') {
      doc.setAttribute(attrName, 'light');
      setMode('light');
    } else {
      doc.setAttribute(attrName, 'dark');
      setMode('dark');
    }
  };

  const watch = (mutationsList: any[]) => {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === attrName) {
        document.body.setAttribute(
          'theme-mode',
          document.documentElement.getAttribute(attrName) ?? 'light',
        );
      }
    }
  };

  useEffect(() => {
    let observer: any;
    document.body.setAttribute(
      'theme-mode',
      document.documentElement.getAttribute(attrName) ?? 'light',
    );
    if (MutationObserver) {
      observer = new MutationObserver(watch);
      // 以上述配置开始观察目标节点
      observer.observe(document.documentElement, { attributes: true });
      // 之后，可停止观察
    }
    return () => observer?.disconnect?.();
  }, []);

  const toggleTheme = () => {
    //@ts-ignore
    if (window.setSemiThemeSwitcherVisible) {
      //@ts-ignore
      window.setSemiThemeSwitcherVisible();
    } else {
      const scriptUrl =
        'https://unpkg.byted-static.com/latest/ies/semi-theme-switcher-opensource/dist/semi-theme-switcher.js';
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.onload = function () {
        //@ts-ignore
        setTimeout(() => window.setSemiThemeSwitcherVisible(), 1000);
      };
      script.src = scriptUrl;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };

  return (
    <div>
      <Form>
        <Form.Input field="input" label="普通输入框" />
        <DSlate ref={ref} value={value} onChange={setValue} showCounter />
        <br />
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
          <Button onClick={toggleTheme}>切换主题</Button>
          <Button onClick={switchMode}>
            {mode === 'dark' ? '亮色模式' : '暗色模式'}
          </Button>
        </Space>
      </Form>
    </div>
  );
};
