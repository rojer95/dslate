import { Counter, Editable, Progress, Toolbar } from '@dslate/component';
import { DSlateCore, DSlateRef } from '@dslate/core';
import { theme } from 'antd';
import classNames from 'classnames';
import { forwardRef } from 'react';
import { useFocused } from 'slate-react';
import styled from 'styled-components';

import type { AntdStyleDSlateProps } from '../typing';

const StyledComponent = styled.div<{ token: any }>`
  border-radius: ${(props) => `${props.token.borderRadius}px`};
  border-width: ${(props) => `${props.token.lineWidth}px`};
  border-style: ${(props) => `${props.token.lineType}`};
  border-color: ${(props) => `${props.token.colorBorder}`};
  background-color: ${(props) => `${props.token.colorBgContainer}`};
  transition: ${(props) => `all ${props.token.motionDurationMid}`};

  &.focus {
    border-color: ${(props) => `${props.token.colorPrimary}`};
    box-shadow: ${(props) =>
      `0 0 0 ${props.token.controlOutlineWidth}px ${props.token.controlOutline}`};
    outline: 0;
  }

  &:hover {
    border-color: ${(props) => props.token.colorPrimaryHover};
  }

  &.borderless {
    background-color: transparent;
    border: none;
    box-shadow: none;
  }

  &.disabled {
    color: ${(props) => props.token.colorTextDisabled};
    background-color: ${(props) => props.token.colorBgContainerDisabled};
    border-color: ${(props) => props.token.colorBorder};
    box-shadow: none;
    cursor: not-allowed;
    opacity: 1;
  }

  .dslate-toolbar {
    border-radius: ${(props) =>
      `${props.token.borderRadius}px ${props.token.borderRadius}px 0 0`};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 8px 12px;
    column-gap: 8px;
    border-bottom: 1px solid ${(props) => props.token.colorBorder};
    row-gap: 8px;
  }

  .dslate-container {
  }

  .dslate-editable {
    min-height: 400px !important;
    padding: ${(props) =>
      `${Math.max(
        Math.round(
          ((props.token.controlHeight -
            props.token.fontSize * props.token.lineHeight) /
            2) *
            10,
        ) /
          10 -
          props.token.lineWidth,
        3,
      )}px ${props.token.paddingSM - props.token.lineWidth}px`};

    h1 {
      font-size: xx-large !important;
    }

    h2 {
      font-size: x-large !important;
    }

    h3 {
      font-size: large !important;
    }

    h4 {
      font-size: medium !important;
    }

    h5 {
      font-size: small !important;
    }

    h6 {
      font-size: x-small !important;
    }

    * {
      margin: 0;

      &::selection {
        color: inherit;
        background-color: ${(props) => `${props.token.colorPrimary}30`};
      }
    }
  }
`;

const { useToken } = theme;
const AntdStyleEditor = ({
  bordered = true,
  showCounter = false,
  disabled = false,
  placeholder,
  toolbar,
  className,
}: Omit<AntdStyleDSlateProps, 'value' | 'onChange'>) => {
  const focused = useFocused();
  const { token } = useToken();

  return (
    <StyledComponent
      token={token}
      className={classNames(className, {
        [`disabled`]: disabled,
        [`borderless`]: !bordered,
        [`focus`]: focused,
      })}
    >
      <Toolbar toolbar={toolbar} />
      <div className={`dslate-container`}>
        <Progress />
        <Editable
          className="semi-input-textarea"
          disabled={disabled}
          placeholder={placeholder}
        />
        {!showCounter ? null : (
          <div className="semi-input-textarea-counter">
            <Counter showCounter={showCounter} />
          </div>
        )}
      </div>
    </StyledComponent>
  );
};

const AntdEditor = forwardRef<DSlateRef, AntdStyleDSlateProps>(
  ({ value, onChange, disabled, ...rest }, ref) => {
    return (
      <DSlateCore
        ref={ref}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <AntdStyleEditor {...rest} disabled={disabled} />
      </DSlateCore>
    );
  },
);

export { AntdEditor };
