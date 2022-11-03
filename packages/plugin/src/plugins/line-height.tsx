import type { CSSProperties } from 'react';
import React from 'react';
import { Locales } from '@dslate/core';
import type { DSlatePlugin } from '@dslate/core';
import { usePlugin } from '@dslate/core';

import { useSlate } from 'slate-react';
import { Toolbar, IconFont } from '@dslate/component';
import { useMessage, getTextProps, setTextProps } from '@dslate/core';
import type { Descendant } from 'slate';

const TYPE = 'line-height';

const renderStyle = (text: Descendant) => {
  if (text[TYPE]) {
    return { lineHeight: text?.[TYPE] } as CSSProperties;
  }
  return {};
};

const DefaultLineHeight = [1, 2, 2.5, 3];

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const { props } = usePlugin();

  const onChange = (lineHeight: number | undefined) => {
    setTextProps(editor, TYPE, lineHeight);
  };

  return (
    <Toolbar.Select<number | undefined>
      placeholder={<IconFont type="icon-line-height" />}
      onChange={onChange}
      options={[
        {
          label: getMessage('default', '默认'),
          value: undefined,
          placeholder: <IconFont type="icon-line-height" />,
        },
        ...(props?.heights ?? DefaultLineHeight).map((height: number | undefined) => ({
          label: `${height}`,
          value: height,
          placeholder: <IconFont type="icon-line-height" />,
        })),
      ]}
      tooltip={getMessage('tooltip', '行高')}
      value={getTextProps(editor, TYPE, undefined)}
    />
  );
};

const LineHeightPlugin: DSlatePlugin = {
  type: 'line-height',
  nodeType: 'text',
  toolbar: <ToolbarButton />,
  renderStyle,
  locale: [
    { locale: Locales.zhCN, tooltip: '行高', default: '默认' },
    { locale: Locales.enUS, tooltip: 'line height', default: 'default' },
  ],
  props: {
    heights: DefaultLineHeight,
  },
};

export { LineHeightPlugin };
