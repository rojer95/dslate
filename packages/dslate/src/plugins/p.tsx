import React from 'react';
import { DSlatePlugin } from '../typing';

const PPlugin: DSlatePlugin = {
  type: 'p',
  nodeType: 'element',
  renderElement: ({ attributes, children }) => {
    return <div {...attributes}>{children}</div>;
  },
};

export { PPlugin };
