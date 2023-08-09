/* eslint-disable react-hooks/exhaustive-deps */
import { Icon, Input, InputNumber, Popover, Toolbar } from '@dslate/component';
import type { RenderElementPropsWithStyle } from '@dslate/core';
import {
  promiseUploadFunc,
  useConfig,
  useMessage,
  usePlugin,
  usePluginHelper,
} from '@dslate/core';
import Upload from 'rc-upload';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { Transforms } from 'slate';
import { ReactEditor, useSelected, useSlate } from 'slate-react';

type Draggable = {
  status: boolean;
  width?: number;
  height?: number;
};

const prefixCls = 'dslate-img-element';

type Size = { width: string; height: string };

const resize = (
  origin: Size,
  fixBy: 'width' | 'height',
  value: string,
): Size => {
  if (String(value).endsWith('%')) {
    return {
      width: fixBy === 'width' ? value : 'auto',
      height: fixBy === 'height' ? value : 'auto',
    };
  }

  const p = Number(origin.width) / Number(origin.height);

  if (isNaN(Number(value)) && Number(value) <= 0) return origin;

  const valueNumber = Number(value);

  return {
    width: String(
      fixBy === 'height' ? Math.floor(valueNumber * p) : valueNumber,
    ),
    height: String(
      fixBy === 'width' ? Math.floor(valueNumber / p) : valueNumber,
    ),
  };
};

const Img = ({
  attributes,
  children,
  element,
  style,
}: RenderElementPropsWithStyle) => {
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
    if (element.url.indexOf(';base64,') === -1) {
      setLoading(true);
    }
  }, [element.url]);

  const selected = useSelected();
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);

  const updateSize = (target: any) => {
    const width = isNaN(Number(target.width))
      ? target.width
      : Number(target.width);
    const height = isNaN(Number(target.height))
      ? target.height
      : Number(target.height);
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

  const updateAlign = (align: string) => {
    Transforms.setNodes(
      editor,
      {
        align,
      },
      {
        at: path,
      },
    );
  };

  const updateMargin = (position: string, margin: number) => {
    Transforms.setNodes(
      editor,
      {
        margin: {
          ...(element.margin || {}),
          [position]: margin,
        },
      },
      {
        at: path,
      },
    );
  };

  const updateEditableSizeEnd = () => {
    updateSize(editable);
  };

  const updateEditableSize = (key: 'width' | 'height', value: string) => {
    // 等比缩放
    const width = String(image.current?.naturalWidth ?? 1);
    const height = String(image.current?.naturalHeight ?? 1);
    const nSize = resize({ width, height }, key, value);
    setEditable((pre) => ({
      ...pre,
      ...nSize,
    }));
  };

  useEffect(() => {
    if (selected) {
      /**
       * 选中状态下，优先同步参数宽度，其次同步实际宽高到编辑框
       */
      const width = element.imgWidth ?? image.current?.width ?? '';
      const height = element.imgHeight ?? image.current?.height ?? '';
      setEditable((pre) => {
        return {
          ...pre,
          width: width,
          height: height,
        };
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
    const defaultWidth = props?.defaultWidth;
    let width = String(image.current?.width ?? '');
    let height = String(image.current?.height ?? '');

    if (!width || !height) return;

    if (defaultWidth) {
      ({ width, height } = resize({ width, height }, 'width', defaultWidth));
    }

    if (element.imgWidth) width = element.imgWidth;
    if (element.imgHeight) height = element.imgHeight;

    setEditable((pre) => {
      return {
        ...pre,
        width: width,
        height: height,
      };
    });

    setDraggable({
      ...draggable,
      width: Number(width),
      height: Number(height),
    });

    updateSize({
      width,
      height,
    });

    setLoading(false);
  };

  const updateUrl = async (option: UploadRequestOption) => {
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
          trigger="click"
          position="top"
          content={
            <div
              style={{
                padding: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span>{getMessage('width', '宽')}</span>
                <Input
                  value={editable.width}
                  style={{ width: 70 }}
                  onChange={(number) => {
                    updateEditableSize('width', number);
                  }}
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      updateEditableSizeEnd();
                    }
                  }}
                />
                <span>{getMessage('height', '高')}</span>
                <Input
                  value={editable.height}
                  style={{ width: 70 }}
                  onChange={(number) => {
                    updateEditableSize('height', String(number));
                  }}
                />
                <Upload
                  accept="image/*"
                  customRequest={(option) => {
                    updateUrl(option);
                  }}
                >
                  <Toolbar.Button
                    tooltip={getMessage('change', '更换图片')}
                    icon={<Icon type="icon-image1" />}
                  />
                </Upload>
                <Toolbar.Button
                  tooltip={getMessage('remove', '删除')}
                  onClick={() => {
                    Transforms.removeNodes(editor, {
                      at: path,
                    });
                  }}
                  icon={
                    <Icon
                      type="icon-empty"
                      style={{
                        color: 'red',
                      }}
                    />
                  }
                />
              </div>

              {/* <Toolbar.Button
                onClick={() => {
                  updateEditableSizeEnd();
                }}
              >
                {getMessage('confirm', '确认')}
              </Toolbar.Button> */}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: 8,
                }}
              >
                {['20%', '40%', '60%', '80%', '100%'].map((p) => (
                  <Toolbar.Button
                    onClick={() => {
                      updateEditableSize('width', p);
                      updateSize({
                        width: p,
                        height: 'auto',
                      });
                    }}
                    style={{
                      backgroundColor: '#eee',
                      borderRadius: '8px',
                      fontSize: '12px',
                      height: '22px',
                    }}
                    key={p}
                  >
                    {p}
                  </Toolbar.Button>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: 8,
                }}
              >
                <span>{getMessage('float', '浮动方式')}</span>
                <Toolbar.Button
                  tooltip={getMessage('float-default', '默认')}
                  onClick={() => {
                    updateAlign('');
                  }}
                  icon={<Icon type="icon-alignjustify" />}
                />
                <Toolbar.Button
                  tooltip={getMessage('float-left', '左浮动')}
                  onClick={() => {
                    updateAlign('left');
                  }}
                  icon={<Icon type="icon-alignleft" />}
                />
                <Toolbar.Button
                  tooltip={getMessage('float-right', '右浮动')}
                  onClick={() => {
                    updateAlign('right');
                  }}
                  icon={<Icon type="icon-alignright" />}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{getMessage('margin', '外边距')}</span>
                <InputNumber
                  value={element?.margin?.top}
                  style={{ width: 70 }}
                  onChange={(number) => {
                    updateMargin('top', number as number);
                  }}
                  placeholder={getMessage('top', '上')}
                />
                <InputNumber
                  value={element?.margin?.right}
                  style={{ width: 70 }}
                  onChange={(number) => {
                    updateMargin('right', number as number);
                  }}
                  placeholder={getMessage('right', '右')}
                />
                <InputNumber
                  value={element?.margin?.bottom}
                  style={{ width: 70 }}
                  onChange={(number) => {
                    updateMargin('bottom', number as number);
                  }}
                  placeholder={getMessage('bottom', '下')}
                />
                <InputNumber
                  value={element?.margin?.left}
                  style={{ width: 70 }}
                  onChange={(number) => {
                    updateMargin('left', number as number);
                  }}
                  placeholder={getMessage('left', '左')}
                />
              </div>
            </div>
          }
        >
          <span
            className={`${prefixCls} ${selected ? 'selected' : ''}`}
            style={{
              ...style,
              maxWidth: props?.maxWidth ?? undefined,
            }}
          >
            {loading ? (
              <div
                style={{
                  ...(props?.loadingStyle || {}),
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
                className={`${prefixCls}-drag ${selected ? 'selected' : ''} ${
                  draggable.status ? 'draging' : ''
                }`}
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
