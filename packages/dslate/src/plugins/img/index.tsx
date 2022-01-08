import { Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import type { Editor } from 'slate';
import { Transforms } from 'slate';
import { useSelected, useSlate } from 'slate-react';

import IconFont from '../../components/IconFont';
import Toolbar from '../../components/Toolbar';

import type { DSlatePlugin, RenderElementPropsWithStyle } from '../../typing';
import Img from './Img';
import './index.less';

const TYPE = 'img';

const TEST_IMG =
  'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png';

const renderElement = (props: RenderElementPropsWithStyle) => {
  return <Img {...props} />;
};

const insertImg = (editor: Editor, url = TEST_IMG) => {
  Transforms.insertNodes(editor, { type: TYPE, url, children: [{ text: '' }] });
};

const ToolbarButton = () => {
  const editor = useSlate();
  return (
    <Toolbar.Button
      onClick={() => {
        insertImg(editor);
      }}
    >
      <IconFont type="icon-image1" />
    </Toolbar.Button>
  );
};

const ImgPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: <ToolbarButton />,
  isVoid: true,
  isInline: true,
  renderElement,
};

export { ImgPlugin };
