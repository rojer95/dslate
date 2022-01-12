import { Upload } from 'antd';
import type { CSSProperties } from 'react';
import React from 'react';
import type { Descendant } from 'slate';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';

import IconFont from '../../components/IconFont';
import Toolbar from '../../components/Toolbar';

import type { DSlatePlugin, RenderElementPropsWithStyle } from '../../typing';
import Img from './Img';
import './index.less';
import { defaultFileUpload } from './defaultFileUpload';

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
  const editor = useSlate();

  const insertImg = async (file: File) => {
    const url = await defaultFileUpload(file);
    Transforms.insertNodes(editor, { type: TYPE, url, children: [{ text: '' }] });
  };

  return (
    <Upload
      accept="image/*"
      maxCount={1}
      showUploadList={false}
      customRequest={({ file }) => insertImg(file as File)}
    >
      <Toolbar.Button tooltip="上传图片">
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
};

export { ImgPlugin };
