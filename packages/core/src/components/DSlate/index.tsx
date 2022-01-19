import React, { useCallback, useMemo, useState } from 'react';
import type { Descendant } from 'slate';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { useConfig } from '../../contexts/ConfigContext';
import { GlobalPluginProvider } from '../../contexts/PluginContext';
import { withPlugins } from '../../utils';

export interface DSlateProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  prefixCls?: string;
}

const DSlate = ({
  value,
  onChange,
  prefixCls = 'dslate',
  children,
}: React.PropsWithChildren<DSlateProps>) => {
  const { plugins = [] } = useConfig();
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
};

export default DSlate;
