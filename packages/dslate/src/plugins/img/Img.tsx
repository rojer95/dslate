/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, InputNumber, Space } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { ReactEditor, useSelected, useSlate } from 'slate-react';
import { Rnd } from 'react-rnd';
import IconFont from '../../components/IconFont';
import Toolbar from '../../components/Toolbar';
import { usePluginHelper } from '../../contexts/PluginContext';
import type { RenderElementPropsWithStyle } from '../../typing';
import Popover from '../../components/Popover';
import { Transforms } from 'slate';

type Draggable = {
  status: boolean;
  width?: number;
  height?: number;
};

const Img = ({ attributes, children, element, style }: RenderElementPropsWithStyle) => {
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = getPrefixCls?.('img');

  const img = useRef<HTMLImageElement>(null);
  const rnd = useRef<Rnd>(null);

  const [draggable, setDraggable] = useState<Draggable>({
    status: false,
  });

  const selected = useSelected();
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);

  const updateSize = () => {
    Transforms.setNodes(
      editor,
      {
        imgHeight: draggable.height,
        imgWidth: draggable.width,
      },
      {
        at: path,
      },
    );
  };

  useEffect(() => {
    if (draggable.status === false && draggable.width && draggable.height) {
      updateSize();
    }
  }, [draggable.status]);

  const updateDraggableSize = (key: string, value: number) => {
    const width = img.current?.width ?? 1;
    const height = img.current?.height ?? 1;
    const p = width / height;

    const rwidth = key === 'width' ? value : Math.round(p * value);
    const rheight = key === 'height' ? value : Math.round(value / p);
    setDraggable({
      ...draggable,
      width: rwidth,
      height: rheight,
    });
  };

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
              <InputNumber
                value={draggable.width}
                onChange={(w) => {
                  updateDraggableSize('width', w);
                }}
                onPressEnter={updateSize}
              />
              <span>高</span>
              <InputNumber
                value={draggable.width}
                onChange={(h) => {
                  updateDraggableSize('height', h);
                }}
                onPressEnter={updateSize}
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
              onLoad={() => {
                setDraggable({
                  ...draggable,
                  width: img.current?.width ?? 0,
                  height: img.current?.height ?? 0,
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
