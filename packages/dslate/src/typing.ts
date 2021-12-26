import type { CSSProperties } from 'react';
import type { BaseEditor, Descendant, Editor, NodeEntry } from 'slate';
import type { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import type { HistoryEditor } from 'slate-history';

export type DSlateProps = {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  toolbar?: string[];
};

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
  toolbar?: React.ReactElement;
  renderElement?: (props: RenderElementProps) => JSX.Element;
  renderLeaf?: (props: RenderLeafProps) => JSX.Element;
  renderStyle?: ((text: DSlateCustomText) => CSSProperties) | CSSProperties;
  normalizeNode?: (editor: Editor, entry: NodeEntry) => void;
  injectMethod?: (editor: Editor) => void;
};

export type DSlateContextPropsType = {
  plugins: DSlatePlugin[];
  [key: string]: any;
};

export interface DSlateEditor {
  styles: string[];
  [index: string]: any;
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & DSlateEditor;
    Element: DSlateCustomElement;
    Text: DSlateCustomText;
  }
}

export type DSlatePluginContext = {
  visible?: string;
  setVisible: (type?: string) => void;
  getPrefixCls: (key: string) => string;
};
