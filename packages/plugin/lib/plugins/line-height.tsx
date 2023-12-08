import type { DSlatePlugin } from '@dslate/core';
import { Locales, usePlugin } from '@dslate/core';
import type { CSSProperties } from 'react';

import { Icon, Toolbar } from '@dslate/component';
import { getTextProps, setTextProps, useMessage } from '@dslate/core';
import type { Descendant } from 'slate';
import { useSlate } from 'slate-react';

const TYPE = 'line-height';

const renderStyle = (text: Descendant) => {
  if (text[TYPE] && text?.[TYPE] > 0) {
    return { lineHeight: `${text?.[TYPE]}` } as CSSProperties;
  }
  return {};
};

const DefaultLineHeight = [1, 1.5, 2, 2.5, 3, 3.5, 4];

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const { props } = usePlugin();

  const onChange = (lineHeight: number | undefined) => {
    setTextProps(editor, TYPE, lineHeight);
  };

  return (
    <Toolbar.Select<number | undefined>
      placeholder={<Icon type="icon-line-height" />}
      onChange={onChange}
      options={[
        {
          label: getMessage('default', '默认'),
          value: -1,
          placeholder: <Icon type="icon-line-height" />,
        },
        ...(props?.heights ?? DefaultLineHeight).map(
          (height: number | undefined) => ({
            label: `${height}倍`,
            value: height,
            placeholder: <Icon type="icon-line-height" />,
          }),
        ),
      ]}
      tooltip={getMessage('tooltip', '行高')}
      value={getTextProps(editor, TYPE, -1)}
    />
  );
};

const LineHeightPlugin: DSlatePlugin = {
  type: 'line-height',
  nodeType: 'text',
  toolbar: ToolbarButton,
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
