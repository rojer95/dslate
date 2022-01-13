/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, InputNumber, Space, Upload } from 'antd';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { ReactEditor, useSelected, useSlate } from 'slate-react';
import { Rnd } from 'react-rnd';
import IconFont from '../../components/IconFont';
import Toolbar from '../../components/Toolbar';
import { usePluginHelper } from '../../contexts/PluginContext';
import type { RenderElementPropsWithStyle } from '../../typing';
import Popover from '../../components/Popover';
import { Transforms } from 'slate';
import { defaultFileUpload, promiseUploadFunc } from './defaultFileUpload';
import { useConfig } from '../../contexts/ConfigContext';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

type Draggable = {
  status: boolean;
  width?: number;
  height?: number;
};

const Img = ({ attributes, children, element, style }: RenderElementPropsWithStyle) => {
  const { getPrefixCls, setPercent } = usePluginHelper();
  const { customUploadRequest } = useConfig();

  const prefixCls = getPrefixCls?.('img');

  const img = useRef<HTMLImageElement>(null);
  const rnd = useRef<Rnd>(null);

  const [draggable, setDraggable] = useState<Draggable>({
    status: false,
  });

  const [editable, setEditable] = useState({
    width: 0,
    height: 0,
  });

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

    setDraggable({
      ...draggable,
      width: target.width,
      height: target.height,
    });

    setEditable({
      width: target.width,
      height: target.height,
    });
  };

  const updateEditableSize = (key: string, value: number) => {
    const width = img.current?.width ?? 1;
    const height = img.current?.height ?? 1;
    const p = width / height;

    const rwidth = key === 'width' ? value : Math.round(p * value);
    const rheight = key === 'height' ? value : Math.round(value / p);
    setEditable({
      width: rwidth,
      height: rheight,
    });
  };

  const loadEditableSizeFromImg = () => {
    setEditable({
      width: img.current?.width ?? 0,
      height: img.current?.height ?? 0,
    });
  };

  const updateUrl = async (option: UploadRequestOption) => {
    const { url } = await promiseUploadFunc(
      customUploadRequest ?? defaultFileUpload,
      option,
      setPercent,
    );
    Transforms.setNodes(
      editor,
      {
        url,
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
          onVisibleChange={(v) => {
            if (v) loadEditableSizeFromImg();
          }}
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
                <Toolbar.Button tooltip="更换图片">
                  <IconFont type="icon-image1" />
                </Toolbar.Button>
              </Upload>
              <Divider type="vertical" />
              <span>宽</span>
              <InputNumber
                value={editable.width}
                onChange={(w) => {
                  updateEditableSize('width', w);
                }}
                onPressEnter={() => updateSize(editable)}
              />
              <span>高</span>
              <InputNumber
                value={editable.width}
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
            <img
              ref={img}
              src={element.url}
              style={style}
              onLoad={(e: any) => {
                setDraggable({
                  ...draggable,
                  width: e.target?.width ?? 0,
                  height: e.target?.height ?? 0,
                });
                setEditable({
                  width: e.target?.width ?? 0,
                  height: e.target?.height ?? 0,
                });
              }}
            />
          </span>
        </Popover>
      </span>
    </span>
  );
};

export default Img;
