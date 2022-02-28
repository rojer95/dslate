import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont';
import { ConfigContext } from '@dslate/core';

export default (props: IconFontProps) => {
  const { iconScriptUrl } = React.useContext(ConfigContext);
  const IconFont = React.useMemo(() => {
    const url = Array.isArray(iconScriptUrl) ? iconScriptUrl : iconScriptUrl ? [iconScriptUrl] : [];
    return createFromIconfontCN({
      scriptUrl: url,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <IconFont {...props} />;
};
