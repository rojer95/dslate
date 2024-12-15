import { Editable, registerElement } from '@dslate/component';
import { ConfigProvider, DSlateCore } from '@dslate/core';
import DefaultPlugin from '@dslate/plugin';

import React, { PropsWithChildren, useState } from 'react';
import type { Descendant } from 'slate';
import styled from 'styled-components';

const NAMESPACE = Symbol('display');

const DisplayOnly = ({ children }: PropsWithChildren<{}>) => <>{children}</>;

registerElement('tooltip', DisplayOnly, NAMESPACE);
registerElement('popover', DisplayOnly, NAMESPACE);

const ResetStyleBox = styled.div`
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
export default () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [
        {
          text: 'hi! ',
        },
      ],
      paragraphType: 'h1',
      'line-height': 1.5,
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'this is ',
        },
        {
          text: 'display mode',
          underline: true,
          color: '#ff6900',
        },
        {
          text: '!',
        },
      ],
      paragraphType: 'h3',
      'line-height': 1.5,
    },
    {
      type: 'paragraph',
      paragraphType: 'h3',
      'line-height': 1.5,
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'paragraph',
      paragraphType: 'h3',
      'line-height': 1.5,
      children: [
        {
          text: 'link:  ',
        },
        {
          type: 'link',
          children: [
            {
              text: 'www.baidu.com',
            },
          ],
          href: 'https://www.baidu.com',
        },
        {
          text: ' ',
        },
      ],
    },
    {
      type: 'paragraph',
      paragraphType: 'h3',
      'line-height': 1.5,
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'paragraph',
      paragraphType: 'h3',
      'line-height': 1.5,
      children: [
        {
          text: 'img: ',
        },
        {
          type: 'img',
          url: 'data:image/png;base64,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',
          children: [
            {
              text: '',
            },
          ],
          imgHeight: 99,
          imgWidth: 102,
        },
        {
          text: '',
        },
      ],
    },
    {
      type: 'paragraph',
      paragraphType: 'h3',
      'line-height': 1.5,
      children: [
        {
          text: '',
        },
      ],
    },
  ]);

  return (
    <ResetStyleBox>
      <ConfigProvider
        value={{
          plugins: Object.values(DefaultPlugin),
          locale: '',
          locales: [],
          namespace: NAMESPACE,
        }}
      >
        <DSlateCore
          disabled
          value={value}
          onChange={function (value: Descendant[]): void {
            // do nothing...
          }}
        >
          <Editable disabled />
        </DSlateCore>
      </ConfigProvider>
    </ResetStyleBox>
  );
};
