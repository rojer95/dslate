import type { CSSProperties } from 'react';
import type { BaseEditor, Descendant, Editor, NodeEntry } from 'slate';
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
  match?: (n: Descendant) => boolean;
  renderElement?: (props: RenderElementPropsWithStyle) => JSX.Element;
  renderLeaf?: (props: RenderLeafPropsWithStyle) => JSX.Element;
  renderStyle?: ((text: Descendant) => CSSProperties) | CSSProperties;
  normalizeNode?: (editor: Editor, entry: NodeEntry) => void;
  inject?: (editor: Editor) => Editor;
  isDefaultElement?: boolean;
  locale?: Record<string, any>;
};

export interface DSlateEditor {
  [index: string]: any;
  defaultElement?: string;
}

export type Locale = {
  locale: string;
  [index: string]: any;
};

export interface RenderElementPropsWithStyle extends RenderElementProps {
  style?: CSSProperties;
}

export interface RenderLeafPropsWithStyle extends RenderLeafProps {
  style?: CSSProperties;
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & DSlateEditor;
    Element: DSlateCustomElement;
    Text: DSlateCustomText;
  }
}
