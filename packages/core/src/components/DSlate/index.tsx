import type { PropsWithChildren } from 'react';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import type { Descendant } from 'slate';
import { createEditor, Text } from 'slate';
import { Slate, withReact } from 'slate-react';
import escapeHtml from 'escape-html';

import { useConfig } from '../../contexts/ConfigContext';
import { GlobalPluginProvider } from '../../contexts/PluginContext';
import { mergeStyle, style2string, withPlugins } from '../../utils';

export interface DSlateProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  prefixCls?: string;
}

export type DSlateRef = {
  serialize: (v: any) => string;
};

const DSlate = forwardRef<DSlateRef, PropsWithChildren<DSlateProps>>(
  ({ value, onChange, prefixCls = 'dslate', children }, ref) => {
    const { plugins = [], pluginProps } = useConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const editor = useMemo(() => withPlugins(withReact(createEditor()), plugins), []);
    const [visibleKey, setVisibleKey] = useState<React.Key | undefined>(undefined);

    const [percent, setPercent] = useState(0);

    const getPrefixCls = useCallback(
      (key: string) => {
        return `${prefixCls}${key ? `-${key}` : ''}`;
      },
      [prefixCls],
    );

    const [disabledTypes, setDisabledTypes] = useState<string[]>([]);

    const enablePluginByType = useCallback(
      (type: string | string[]) => {
        const types: string[] = Array.isArray(type) ? type : [type];
        setDisabledTypes(disabledTypes.filter((i) => !types.includes(i)));
      },
      [disabledTypes],
    );

    const disablePluginByType = useCallback(
      (type: string | string[]) => {
        const types: string[] = Array.isArray(type) ? type : [type];
        setDisabledTypes(Array.from(new Set([...disabledTypes, ...types])));
      },
      [disabledTypes],
    );

    const serialize = useCallback(
      (node: any) => {
        if (Text.isText(node)) {
          const style = mergeStyle(node, plugins, 'text', editor);
          return `<span style="${style2string(style)}">${escapeHtml(node.text)}</span>`;
        }

        const childrenHtml = node.children.map((n: any) => serialize(n));
        const style = mergeStyle(node, plugins, 'element', editor);
        const match = Object.values(plugins).find(
          (i) => i.type === node.type && i.nodeType === 'element',
        );
        if (match && match.serialize) {
          const matchPluginProps = {
            ...(match?.props ?? {}),
            ...(pluginProps?.[match.type ?? ''] ?? {}),
            style: style2string(style),
          };
          return match.serialize(node, matchPluginProps, childrenHtml);
        }
        return childrenHtml.join('').replace(/ style=\"\"/gi, '');
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [plugins, pluginProps],
    );

    useImperativeHandle(ref, () => ({ serialize }), [serialize]);

    return (
      <GlobalPluginProvider
        value={{
          getPrefixCls,
          visibleKey: visibleKey,
          setVisibleKey: setVisibleKey,
          disabledTypes,
          enablePluginByType,
          disablePluginByType,
          setPercent,
          percent,
        }}
      >
        <Slate editor={editor} value={value} onChange={onChange}>
          {children}
        </Slate>
      </GlobalPluginProvider>
    );
  },
);

export default DSlate;
