/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { ReactEditor, useSelected, useSlate } from 'slate-react';
import { Rnd } from 'react-rnd';
import Upload from 'rc-upload';
import { usePluginHelper, useConfig, useMessage, promiseUploadFunc, usePlugin } from '@dslate/core';
import { IconFont, Toolbar, Popover, Divider } from '@dslate/component';
import type { RenderElementPropsWithStyle } from '@dslate/core';
import { Transforms } from 'slate';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

type Draggable = {
  status: boolean;
  width?: number;
  height?: number;
};

const prefixCls = 'dslate-img-element';

const inputStyle = {
  width: 80,
  borderRadius: 2,
  border: '1px solid rgba(0, 0, 0, 0.2)',
};
const Img = ({ attributes, children, element, style }: RenderElementPropsWithStyle) => {
  const { setPercent } = usePluginHelper();
  const { customUploadRequest } = useConfig();
  const { props } = usePlugin();

  const getMessage = useMessage();

  const image = useRef<HTMLImageElement>(null);
  const rnd = useRef<Rnd>(null);
  const [loading, setLoading] = useState(false);

  const [draggable, setDraggable] = useState<Draggable>({
    status: false,
  });

  const [editable, setEditable] = useState<{
    width: string;
    height: string;
  }>({
    width: '',
    height: '',
  });

  useEffect(() => {
    setLoading(true);
  }, [element.url]);

  const selected = useSelected();
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);

  const updateSize = (target: any) => {
    const width = isNaN(Number(target.width)) ? target.width : Number(target.width);
    const height = isNaN(Number(target.height)) ? target.height : Number(target.height);
    Transforms.setNodes(
      editor,
      {
        imgHeight: height,
        imgWidth: width,
      },
      {
        at: path,
      },
    );
  };

  const updateEditableSizeEnd = () => {
    updateSize(editable);
  };

  const updateEditableSize = (key: string, value: string) => {
    // 百分比
    if (value.endsWith('%')) {
      const rwidth = key === 'width' ? value : 'auto';
      const rheight = key === 'height' ? value : 'auto';
      setEditable({
        width: rwidth,
        height: rheight,
      });
      return;
    }

    // 非数字跳过
    if (isNaN(Number(value))) return;

    // 等比缩放
    const width = image.current?.naturalWidth ?? 1;
    const height = image.current?.naturalHeight ?? 1;
    const p = width / height;

    const rwidth = key === 'width' ? value : Math.round(p * Number(value)) + '';
    const rheight = key === 'height' ? value : Math.round(Number(value) / p) + '';
    setEditable({
      width: rwidth,
      height: rheight,
    });
  };

  useEffect(() => {
    if (selected) {
      /**
       * 选中状态下，优先同步参数宽度，其次同步实际宽高到编辑框
       */
      const width = element.imgWidth ?? image.current?.width ?? '';
      const height = element.imgHeight ?? image.current?.height ?? '';
      setEditable({
        width: width,
        height: height,
      });
    }

    /**
     * 同步图片实际宽高到拖拽组件
     */
    setDraggable({
      status: false,
      width: image.current?.width,
      height: image.current?.height,
    });
  }, [selected, element.imgWidth, element.imgHeight]);

  /**
   * 图片加载完毕后初始化参数
   */
  const onImageLoad = () => {
    setLoading(false);
    setEditable({
      width: `${image.current?.width}`,
      height: `${image.current?.height}`,
    });
    setDraggable({
      ...draggable,
      width: image.current?.width,
      height: image.current?.height,
    });
  };

  const updateUrl = async (option: UploadRequestOption) => {
    const { url } = await promiseUploadFunc(option, customUploadRequest, setPercent);
    Transforms.setNodes(
      editor,
      {
        url,
        imgWidth: null,
        imgHeight: null,
      },
      {
        at: path,
      },
    );
  };

  return (
    <span {...attributes}>
      {children}
      <span contentEditable={false}>
        <Popover
          trigger={['click']}
          placement="top"
          overlayInnerStyle={{
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            whiteSpace: 'nowrap',
          }}
          overlay={
            <>
              <Upload
                accept="image/*"
                customRequest={(option) => {
                  updateUrl(option);
                }}
              >
                <Toolbar.Button tooltip={getMessage('change', '更换图片')}>
                  <IconFont type="icon-image1" />
                </Toolbar.Button>
              </Upload>
              <Divider />
              <span>{getMessage('width', '宽')}</span>
              <input
                style={inputStyle}
                value={editable.width}
                onChange={(e) => {
                  updateEditableSize('width', e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    updateEditableSizeEnd();
                  }
                }}
              />
              <span>{getMessage('height', '高')}</span>
              <input
                style={inputStyle}
                value={editable.height}
                onChange={(e) => {
                  updateEditableSize('height', e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    updateEditableSizeEnd();
                  }
                }}
              />
            </>
          }
        >
          <span
            className={classNames(prefixCls, {
              selected: selected,
            })}
            style={{
              ...style,
            }}
          >
            {loading ? (
              <div
                style={{
                  ...props?.loadingMinSize,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  color: 'rgba(0,0,0,0.4)',
                  fontSize: 12,
                }}
              >
                {props?.loadingText ?? 'loading...'}
              </div>
            ) : (
              <Rnd
                ref={rnd}
                className={classNames(`${prefixCls}-drag`, {
                  selected: selected,
                  draging: draggable.status,
                })}
                size={{
                  width: draggable.width ?? 0,
                  height: draggable.height ?? 0,
                }}
                resizeHandleWrapperClass="resize-handle-wrapper"
                onResizeStart={() => {
                  setDraggable({
                    ...draggable,
                    status: true,
                  });
                }}
                onResize={(e, direction, ref) => {
                  setDraggable({
                    ...draggable,
                    width: ref.clientWidth,
                    height: ref.clientHeight,
                  });
                }}
                onResizeStop={(e, direction, ref) => {
                  setDraggable({
                    width: ref.clientWidth,
                    height: ref.clientHeight,
                    status: false,
                  });
                  updateSize({
                    width: ref.clientWidth,
                    height: ref.clientHeight,
                  });
                  rnd.current?.updatePosition({ x: 0, y: 0 });
                }}
                enableResizing={{
                  bottomLeft: true,
                  bottomRight: true,
                  topLeft: true,
                  topRight: true,
                  bottom: false,
                  left: false,
                  right: false,
                  top: false,
                }}
                lockAspectRatio
                disableDragging
              >
                <div className="size-content">
                  {draggable.width}x{draggable.height}
                </div>
              </Rnd>
            )}
            <img
              ref={image}
              src={element.url}
              style={{
                width: '100%',
                visibility: loading ? 'hidden' : 'visible',
              }}
              onLoad={onImageLoad}
            />
          </span>
        </Popover>
      </span>
    </span>
  );
};

export default Img;
