import { ConfigProvider, Space, Tooltip } from 'antd';
import classnames from 'classnames';
import React, { CSSProperties, useContext } from 'react';

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

export const Toolbar: React.FC<{ toolbar: string[]; prefixCls: string }> = ({
  toolbar,
  prefixCls,
}) => {
  const { plugins } = useContext(DSlateContext);

  let toolbars: Array<React.ReactNode | string | undefined> = toolbar;

  if (toolbar.length === 0) {
    toolbars = plugins.map((i) => i.type);
  }

  const toolbarPrefixCls = `${prefixCls}-toolbar`;

  return (
    <div className={toolbarPrefixCls}>
      <Space>
        {toolbars.map((toolbar, index) => {
          if (toolbar === undefined) return null;
          const plugin = plugins.find((i) => i.type === toolbar);
          return plugin?.toolbar ? (
            <div
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
