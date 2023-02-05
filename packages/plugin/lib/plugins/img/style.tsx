import { createGlobalStyle } from "styled-components";
export const ImgStyle = createGlobalStyle`

.resize-handle-wrapper {
  > div {
    &::after {
      display: block;
      width: 14px;
      height: 14px;
      margin: 3px;
      background-color: #1890ff;
      border-radius: 7px;
      content: '';
    }
  }
}

.dslate-img-element {
  position: relative;
  display: inline-block;
  border: 1px solid transparent;

  &:hover {
    border-color: fade(#1890ff, 20%);
  }

  &.selected {
    border-color: transparent;
  }

  &-drag {
    border: 1px solid #1890ff;
    visibility: hidden;

    &.selected {
      visibility: visible;
    }

    .size-content {
      display: none;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: #ffffff;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &.draging {
      .size-content {
        display: flex;
      }
    }
  }
}

`;
