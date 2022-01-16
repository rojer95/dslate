import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont';
import { ConfigContext } from '../../contexts/ConfigContext';

const DEFAULT_URL = '//at.alicdn.com/t/font_3062978_2vfzjar92f5.js';

export default (props: IconFontProps) => {
  const { iconScriptUrl } = React.useContext(ConfigContext);
  const IconFont = React.useMemo(() => {
    const url = Array.isArray(iconScriptUrl) ? iconScriptUrl : iconScriptUrl ? [iconScriptUrl] : [];
    return createFromIconfontCN({
      scriptUrl: [DEFAULT_URL, ...url],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <IconFont {...props} />;
};
