import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { useFocused } from 'slate-react';
import SizeContext from 'antd/lib/config-provider/SizeContext';

import DSlate from '../DSlate';
import Toolbar from '../Toolbar';
import Progress from '../Progress';
import Editable from '../Editable';
import Counter from '../Counter';
import { usePluginHelper } from '../../contexts/PluginContext';

import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { DSlateProps } from '../DSlate';
import type { ProgressProps, ShowCountProps } from '../../typing';

import './index.less';

export interface AntdStyleEditorProps extends Omit<DSlateProps, 'prefixCls'> {
  bordered?: boolean;
  size?: SizeType;
  showCount?: boolean | ShowCountProps;
  disabled?: boolean;
  placeholder?: string;
  progress?: ProgressProps;
}

const AntdStyleEditor = ({
  bordered = true,
  size: customizeSize,
  showCount = false,
  disabled = false,
  placeholder,
  progress = {
    strokeWidth: 2,
    showInfo: false,
  },
}: Omit<AntdStyleEditorProps, 'value' | 'onChange'>) => {
  const focused = useFocused();
  const { getPrefixCls } = usePluginHelper();
  const prefixCls = getPrefixCls?.('');

  return (
    <SizeContext.Consumer>
      {(size) => {
        const realSize = customizeSize || size;
        return (
          <div
            className={classNames(`${prefixCls}`, {
              [`${prefixCls}-sm`]: realSize === 'small',
              [`${prefixCls}-lg`]: realSize === 'large',
              [`${prefixCls}-disabled`]: disabled,
              [`${prefixCls}-borderless`]: !bordered,
              [`${prefixCls}-focused`]: focused,
            })}
          >
            <Toolbar />
            <Progress
              progress={{
                ...progress,
              }}
            />
            <Editable disabled={disabled} placeholder={placeholder} />
            <Counter showCount={showCount} />
          </div>
        );
      }}
    </SizeContext.Consumer>
  );
};

export default ({ value, onChange, ...rest }: AntdStyleEditorProps) => {
  const { getPrefixCls: getAntdPrefixCls } = useContext(AntdConfigProvider.ConfigContext);
  return (
    <DSlate value={value} onChange={onChange} prefixCls={getAntdPrefixCls('dslate')}>
      <AntdStyleEditor {...rest} />
    </DSlate>
  );
};
