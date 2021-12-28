import type { CSSProperties } from 'react';
import type { BaseEditor, Editor, NodeEntry } from 'slate';
import type { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import type { HistoryEditor } from 'slate-history';

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
  renderElement?: (props: RenderElementProps) => JSX.Element;
  renderLeaf?: (props: RenderLeafProps) => JSX.Element;
  renderStyle?: ((text: DSlateCustomText) => CSSProperties) | CSSProperties;
  normalizeNode?: (editor: Editor, entry: NodeEntry) => void;
  injectMethod?: (editor: Editor) => void;
  isDefaultElement?: boolean;
};

export interface DSlateEditor {
  [index: string]: any;
  defaultElement?: string;
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & DSlateEditor;
    Element: DSlateCustomElement;
    Text: DSlateCustomText;
  }
}
