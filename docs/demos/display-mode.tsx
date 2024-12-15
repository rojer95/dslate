import { Editable } from '@dslate/component';
import { ConfigProvider, DSlateCore } from '@dslate/core';

import DefaultPlugin from '@dslate/plugin';
import React, { useState } from 'react';
import type { Descendant } from 'slate';
import styled from 'styled-components';

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
  ]);

  return (
    <ResetStyleBox>
      <ConfigProvider
        value={{
          plugins: Object.values(DefaultPlugin),
          locale: '',
          locales: [],
        }}
      >
        <DSlateCore
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
