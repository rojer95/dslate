import { forwardRef } from "react";
import { theme } from "antd";
import { useFocused } from "slate-react";
import { DSlateRef, DSlateCore } from "@dslate/core";
import classNames from "classnames";
import styled from "styled-components";
import { Toolbar, Progress, Counter, Editable } from "@dslate/component";

import type { AntdStyleDSlateProps } from "../typing";

const StyledComponent = styled.div<{ token: any }>`
  border-radius: ${(props) => `${props.token.borderRadius}px`};
  border-width: ${(props) => `${props.token.lineWidth}px`};
  border-style: ${(props) => `${props.token.lineType}`};
  border-color: ${(props) => `${props.token.colorBorder}`};

  &.focus {
    border-color: ${(props) => props.token.colorPrimaryHover};
    box-shadow: ${(props) =>
      `0 0 0 ${props.token.controlOutlineWidth}px ${props.token.controlOutline}`};
    border-inline-end-width: ${(props) => props.token.lineWidth};
    outline: 0;
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
            10
        ) /
          10 -
          props.token.lineWidth,
        3
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
}: Omit<AntdStyleDSlateProps, "value" | "onChange">) => {
  const focused = useFocused();

  const { token } = useToken();

  console.log(
    "token",
    `${token.paddingSM - token.lineWidth}px ${Math.max(
      Math.round(
        ((token.controlHeight - token.fontSize * token.lineHeight) / 2) * 10
      ) /
        10 -
        token.lineWidth,
      3
    )}px`
  );
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
  ({ value, onChange, ...rest }, ref) => {
    return (
      <DSlateCore ref={ref} value={value} onChange={onChange}>
        <AntdStyleEditor {...rest} />
      </DSlateCore>
    );
  }
);

export { AntdEditor };
