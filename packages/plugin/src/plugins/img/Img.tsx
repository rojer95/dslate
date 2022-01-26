/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { ReactEditor, useSelected, useSlate } from 'slate-react';
import { Rnd } from 'react-rnd';
import { InputNumber, Spin, Upload, Space } from 'antd';
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

  const [editable, setEditable] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setLoading(true);
  }, [element.url]);

  const selected = useSelected();
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);

  const updateSize = (target: any) => {
    Transforms.setNodes(
      editor,
      {
        imgHeight: target.height,
        imgWidth: target.width,
      },
      {
        at: path,
      },
    );
  };

  const updateEditableSize = (key: string, value: number) => {
    const width = image.current?.naturalWidth ?? 1;
    const height = image.current?.naturalHeight ?? 1;
    const p = width / height;

    const rwidth = key === 'width' ? value : Math.round(p * value);
    const rheight = key === 'height' ? value : Math.round(value / p);
    setEditable({
      width: rwidth,
      height: rheight,
    });
  };

  const loadSizeFromImg = () => {
    setEditable({
      width: image.current?.width ?? 0,
      height: image.current?.height ?? 0,
    });

    setDraggable({
      ...draggable,
      width: image.current?.width ?? 0,
      height: image.current?.height ?? 0,
    });
  };

  useEffect(() => {
    if (selected) loadSizeFromImg();
  }, [selected, element.imgWidth, element.imgHeight]);

  const onImageLoad = () => {
    setLoading(false);
    loadSizeFromImg();
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
          overlayClassName=""
          trigger={['click']}
          content={
            <Space>
              <Upload
                accept="image/*"
                maxCount={1}
                showUploadList={false}
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
              <InputNumber
                value={editable.width}
                onChange={(w) => {
                  updateEditableSize('width', w);
                }}
                onPressEnter={() => updateSize(editable)}
              />
              <span>{getMessage('height', '高')}</span>
              <InputNumber
                value={editable.height}
                onChange={(h) => {
                  updateEditableSize('height', h);
                }}
                onPressEnter={() => updateSize(editable)}
              />
            </Space>
          }
        >
          <span
            className={classNames(prefixCls, {
              selected: selected,
            })}
          >
            <Spin spinning={loading} tip={getMessage('loading', '图片加载中')}>
              {loading ? (
                <div style={{ ...props?.loadingMinSize }} />
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
                  ...style,
                  visibility: loading ? 'hidden' : 'visible',
                }}
                onLoad={onImageLoad}
              />
            </Spin>
          </span>
        </Popover>
      </span>
    </span>
  );
};

export default Img;
