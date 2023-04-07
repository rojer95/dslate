import { forwardRef } from "react";
import { useFocused } from "slate-react";
import { DSlateRef, DSlateCore } from "@dslate/core";
import classNames from "classnames";
import styled from "styled-components";
import { Toolbar, Progress, Counter, Editable } from "@dslate/component";

import type { SemiStyleDSlateProps } from "../typing";

const SemiClassName = "semi-input-textarea-wrapper";
const StyledComponent = styled.div`
  .dslate-toolbar {
    background-color: var(--semi-color-bg-1);
    border-radius: var(--semi-border-radius-small)
      var(--semi-border-radius-small) 0 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 8px 12px;
    column-gap: 8px;
    border-bottom: 1px solid var(--semi-color-border);
    row-gap: 8px;
  }

  .dslate-container {
  }

  .dslate-editable {
    min-height: 400px !important;

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
        background-color: rgba(var(--semi-blue-5), 0.15);
      }
    }
  }
`;

const SemiStyleEditor = ({
  bordered = true,
  showCounter = false,
  disabled = false,
  placeholder,
  toolbar,
  className,
}: Omit<SemiStyleDSlateProps, "value" | "onChange">) => {
  const focused = useFocused();

  return (
    <StyledComponent
      className={classNames(SemiClassName, className, {
        [`${SemiClassName}-disabled`]: disabled,
        [`${SemiClassName}-borderless`]: !bordered,
        [`${SemiClassName}-focus`]: focused,
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

const SemiEditor = forwardRef<DSlateRef, SemiStyleDSlateProps>(
  ({ value, onChange, disabled, ...rest }, ref) => {
    return (
      <DSlateCore
        ref={ref}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <SemiStyleEditor {...rest} disabled={disabled} />
      </DSlateCore>
    );
  }
);

export { SemiEditor };
