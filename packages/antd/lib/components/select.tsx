/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select as AntdSelect, Tooltip } from 'antd';
import React, { PropsWithChildren, useMemo } from 'react';

export const Select = ({
  active,
  optionList,
  triggerRender,
  ...props
}: PropsWithChildren<any>) => {
  const Wrap = useMemo(() => {
    if (props?.tooltip) {
      return Tooltip;
    }
    return React.Fragment;
  }, [props?.tooltip]);

  return (
    <Wrap title={props?.tooltip}>
      <AntdSelect {...props} bordered={false} options={optionList}></AntdSelect>
    </Wrap>
  );
};
