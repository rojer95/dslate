import { ConfigProvider, Space, Tooltip } from 'antd';
import classnames from 'classnames';
import type { CSSProperties } from 'react';
import React, { useContext } from 'react';

import DSlateContext from '../../context';
import './index.less';

export const ToolbarButton: React.FC<{
  style?: CSSProperties;
  active?: boolean;
  disable?: boolean;
  onClick?: () => void;
  tooltip?: string;
}> = ({ children, disable = false, style = {}, active = false, onClick, tooltip = '' }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('dslate-toolbar-item');

  const Button = (
    <div
      className={classnames(`${prefixCls}`, {
        active,
        disable,
      })}
      style={style}
      onClick={() => {
        if (!disable) onClick?.();
      }}
    >
      {children}
    </div>
  );
  return tooltip ? <Tooltip title={tooltip}>{Button}</Tooltip> : Button;
};

export const Toolbar: React.FC<{ prefixCls: string }> = ({ prefixCls }) => {
  const { plugins } = useContext(DSlateContext);

  const toolbarPrefixCls = `${prefixCls}-toolbar`;

  return (
    <div className={toolbarPrefixCls}>
      <Space>
        {plugins.map((plugin, index) => {
          return plugin?.toolbar ? (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${plugin?.type}_${index}`}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
            >
              {plugin?.toolbar}
            </div>
          ) : null;
        })}
      </Space>
    </div>
  );
};
