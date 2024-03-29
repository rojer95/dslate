import { Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { Icon, Toolbar } from '@dslate/component';
import Upload from 'rc-upload';

import {
  promiseUploadFunc,
  useConfig,
  useMessage,
  usePlugin,
  usePluginHelper,
} from '@dslate/core';
import Img from './img';

import type { UploadRequestOption } from 'rc-upload/lib/interface';
import type { CSSProperties } from 'react';
import type { Descendant } from 'slate';

import type { DSlatePlugin, RenderElementPropsWithStyle } from '@dslate/core';
import { Locales } from '@dslate/core';
import { ImgStyle } from './style';

const TYPE = 'img';

const renderElement = (props: RenderElementPropsWithStyle) => {
  return <Img {...props} />;
};

const renderStyle = (node: Descendant) => {
  if (node.type === TYPE) {
    const style: CSSProperties = {};
    if (node.imgWidth) style.width = node.imgWidth;
    if (node.imgHeight) style.height = node.imgHeight;
    if (node.align === 'left') style.float = 'left';
    if (node.align === 'right') style.float = 'right';
    if (node.align === '') style.float = undefined;
    for (const position of ['Left', 'Top', 'Bottom', 'Right']) {
      const cssKey = `margin${position}` as
        | 'marginLeft'
        | 'marginTop'
        | 'marginBottom'
        | 'marginRight';
      if (node.margin?.[position.toLowerCase()]) {
        style[cssKey] = `${node.margin[position.toLowerCase()]}px`;
      } else {
        style[cssKey] = undefined;
      }
    }

    return style;
  }
  return {};
};

const ToolbarButton = () => {
  const { setPercent } = usePluginHelper();
  const { customUploadRequest } = useConfig();
  const editor = useSlate();
  const getMessage = useMessage();
  const { disabled } = usePlugin();

  const insertImg = async (option: UploadRequestOption) => {
    const { url } = await promiseUploadFunc(
      {
        onProgress: option.onProgress,
        onError: option.onError,
        onSuccess: option.onSuccess,
        file: option.file as File,
      },
      customUploadRequest,
      setPercent,
    );
    Transforms.insertNodes(editor, {
      type: TYPE,
      url,
      children: [{ text: '' }],
    });
  };

  return (
    <Upload
      disabled={disabled}
      accept="image/*"
      customRequest={(option) => insertImg(option)}
    >
      <ImgStyle />
      <Toolbar.Button
        tooltip={getMessage('tooltip', '上传图片')}
        icon={<Icon type="icon-image1" />}
      />
    </Upload>
  );
};

const ImgPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  toolbar: ToolbarButton,
  isVoid: true,
  isInline: true,
  renderElement,
  renderStyle,
  props: {
    loadingStyle: {
      minHeight: 150,
      minWidth: 300,
    } as CSSProperties,
    maxWidth: false,
    defaultWidth: undefined,
    loadingText: '图片加载中...',
  },
  locale: [
    {
      locale: Locales.zhCN,
      tooltip: '上传图片',
      change: '修改图片',
      confirm: '确认',
      height: '高',
      width: '宽',
      loading: '图片加载中',
      remove: '删除',
      float: '浮动方式',
      ['float-left']: '左浮动',
      ['float-right']: '右浮动',
      ['float-default']: '默认',
      margin: '外边距',
      top: '上',
      left: '左',
      right: '右',
      bottom: '下',
    },
    {
      locale: Locales.enUS,
      tooltip: 'upload image',
      change: 'change image',
      confirm: 'confirm',
      height: 'height',
      width: 'width',
      loading: 'loading',
      remove: 'remove',
      float: 'float',
      ['float-left']: 'float left',
      ['float-right']: 'float right',
      ['float-default']: 'float default',
      margin: 'margin',
      top: 'top',
      left: 'left',
      right: 'right',
      bottom: 'bottom',
    },
  ],
  serialize: (element, props) => {
    const style = [];
    if (props?.style) style.push(props.style);
    if (props?.maxWidth)
      style.push(`max-width: ${props.maxWidth}; height: auto;`);
    return `<img style="${style.join('')}" src="${element.url}" />`;
  },
  serializeWeapp: (element, props) => {
    const style = [];
    if (props?.style) style.push(props.style);
    if (props?.maxWidth)
      style.push(`max-width: ${props.maxWidth}; height: auto;`);
    return {
      type: 'node',
      name: 'img',
      attrs: {
        style: style.join(''),
        src: element.url,
      },
    };
  },
};

export { ImgPlugin };
