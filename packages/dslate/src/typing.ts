import { CSSProperties } from 'react';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type DSlateCustomElement = {
  type: string;
  children: (DSlateCustomText | DSlateCustomElement)[];
  [index: string]: any;
};

export type DSlateCustomText = {
  text: string;
  [index: string]: any;
};

export type DSlatePlugin = {
  type: string;
  nodeType: 'element' | 'text' | 'tool';
  isVoid?: ((element: DSlateCustomElement) => boolean) | boolean;
  isInline?: ((element: DSlateCustomElement) => boolean) | boolean;
  toolbar?: React.ReactNode;
  renderElement?: (props: any) => JSX.Element;
  renderStyle?: ((text: DSlateCustomText) => CSSProperties) | CSSProperties;
};

export type DSlateContextPropsType = {
  plugins: DSlatePlugin[];
};

export interface DSlateEditor {
  text: string[];
  element: string[];
  tool: string[];
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & DSlateEditor;
    Element: DSlateCustomElement;
    Text: DSlateCustomText;
  }
}

export type DSlatePluginContext = {
  data: Record<string, any>;
  update: (name: string, data: any) => void;
};

export type DSlateSomePluginContext = {
  data: any;
  update: (data: any) => void;
};
