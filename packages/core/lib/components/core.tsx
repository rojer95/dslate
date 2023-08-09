import escapeHtml from 'escape-html';
import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import type { Descendant, Editor } from 'slate';
import { createEditor, Text } from 'slate';
import { Slate, withReact } from 'slate-react';

import { useConfig } from '../contexts/ConfigContext';
import { GlobalPluginProvider } from '../contexts/PluginContext';
import { mergeStyle, style2string, withPlugins } from '../utils';

export interface DSlateProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  disabled?: boolean;
}

export type DSlateRef = {
  serialize: (v: any) => string;
  serializeWeapp: (v: any) => any;
  getEditor: () => Editor;
};

const DSlateCore = forwardRef<DSlateRef, PropsWithChildren<DSlateProps>>(
  ({ value, onChange, children, disabled = false }, ref) => {
    const { plugins = [], pluginProps } = useConfig();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const editor = useMemo(
      () => withPlugins(withReact(createEditor()), plugins),
      [],
    );

    const [visibleKey, setVisibleKey] = useState<React.Key | undefined>(
      undefined,
    );

    const [percent, setPercent] = useState(0);

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
          return `<span style="${style2string(style)}">${escapeHtml(
            node.text,
          )}</span>`;
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
        return childrenHtml.join('').replace(/style=""/gi, '');
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [plugins, pluginProps],
    );

    const serializeWeapp = useCallback(
      (node: any) => {
        if (Text.isText(node)) {
          const style = mergeStyle(node, plugins, 'text', editor);
          return {
            type: 'node',
            name: 'span',
            attrs: {
              style: style2string(style),
            },
            children: [
              {
                type: 'text',
                text: escapeHtml(node.text),
              },
            ],
          };
        }

        const childrens = node.children.map((n: any) => serializeWeapp(n));
        const style = mergeStyle(node, plugins, 'element', editor);
        const match = Object.values(plugins).find(
          (i) => i.type === node.type && i.nodeType === 'element',
        );

        if (match && match.serializeWeapp) {
          const matchPluginProps = {
            ...(match?.props ?? {}),
            ...(pluginProps?.[match.type ?? ''] ?? {}),
            style: style2string(style),
          };
          return match.serializeWeapp(node, matchPluginProps, childrens);
        }

        return childrens;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [plugins, pluginProps],
    );

    const getEditor = useCallback(() => {
      return editor;
    }, [editor]);

    useImperativeHandle(ref, () => ({ serialize, getEditor, serializeWeapp }), [
      serialize,
      getEditor,
    ]);

    return (
      <GlobalPluginProvider
        value={{
          visibleKey: visibleKey,
          setVisibleKey: setVisibleKey,
          disabledTypes,
          enablePluginByType,
          disablePluginByType,
          setPercent,
          percent,
          disabled,
        }}
      >
        <Slate
          editor={editor}
          // @ts-ignore
          initialValue={value}
          // @ts-ignore
          value={value}
          onChange={onChange}
        >
          {children}
        </Slate>
      </GlobalPluginProvider>
    );
  },
);

export { DSlateCore };
