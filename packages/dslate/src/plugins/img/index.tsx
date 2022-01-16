import React from 'react';
import { Upload } from 'antd';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';

import IconFont from '../../components/IconFont';
import Toolbar from '../../components/Toolbar';

import Img from './Img';
import { file2base64 } from './file2base64';
import { useConfig, useMessage } from '../../contexts/ConfigContext';
import { usePluginHelper } from '../../contexts/PluginContext';
import { promiseUploadFunc } from '../../utils';

import type { Descendant } from 'slate';
import type { CSSProperties } from 'react';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import type { DSlatePlugin, RenderElementPropsWithStyle } from '../../typing';

import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import './index.less';

const TYPE = 'img';

const renderElement = (props: RenderElementPropsWithStyle) => {
  return <Img {...props} />;
};

const renderStyle = (node: Descendant) => {
  if (node.type === TYPE) {
    const style: CSSProperties = {};
    if (node.imgWidth) style.width = node.imgWidth;
    if (node.imgHeight) style.height = node.imgHeight;
    return style;
  }
  return {};
};

const ToolbarButton = () => {
  const { setPercent } = usePluginHelper();
  const { customUploadRequest } = useConfig();
  const editor = useSlate();
  const getMessage = useMessage();

  const insertImg = async (option: UploadRequestOption) => {
    const { url } = await promiseUploadFunc(customUploadRequest ?? file2base64, option, setPercent);
    Transforms.insertNodes(editor, { type: TYPE, url, children: [{ text: '' }] });
  };

  return (
    <Upload
      accept="image/*"
      maxCount={1}
      showUploadList={false}
      customRequest={(option) => insertImg(option)}
    >
      <Toolbar.Button tooltip={getMessage('tooltip', '上传图片')}>
        <IconFont type="icon-image1" />
      </Toolbar.Button>
    </Upload>
  );
};

const ImgPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: <ToolbarButton />,
  isVoid: true,
  isInline: true,
  renderElement,
  renderStyle,
  locale: {
    [zhCN.locale]: {
      tooltip: '上传图片',
      change: '修改图片',
      height: '高',
      width: '宽',
    },
    [enUS.locale]: {
      tooltip: 'upload image',
      change: 'change image',
      height: 'height',
      width: 'width',
    },
  },
};

export { ImgPlugin };
