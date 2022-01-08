import { Divider, InputNumber, Space } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { useSelected } from 'slate-react';
import IconFont from '../../components/IconFont';
import Toolbar from '../../components/Toolbar';
import { usePluginHelper } from '../../contexts/PluginContext';
import type { RenderElementPropsWithStyle } from '../../typing';
import Popover from '../../components/Popover';

const Img = ({ attributes, children, element, style }: RenderElementPropsWithStyle) => {
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = getPrefixCls?.('img');

  const selected = useSelected();

  return (
    <span {...attributes}>
      {children}
      <span contentEditable={false}>
        <Popover
          overlayClassName=""
          content={
            <Space>
              <Toolbar.Button>
                <IconFont type="icon-image1" />
              </Toolbar.Button>
              <Divider type="vertical" />
              <span>宽</span>
              <InputNumber />
              <span>高</span>
              <InputNumber />
            </Space>
          }
        >
          <span
            className={classNames(prefixCls, {
              selected: selected,
            })}
          >
            <img src={element.url} style={style} />
          </span>
        </Popover>
      </span>
    </span>
  );
};

export default Img;
