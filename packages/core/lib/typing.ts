import type React from "react";
import type { CSSProperties } from "react";
import type {
  BaseElement,
  BaseText,
  Descendant,
  Editor,
  NodeEntry,
} from "slate";
import type {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";

export interface UploadRequestOption {
  onProgress?: (event: { percent?: number }) => void;
  onError?: (event: Error, body?: any) => void;
  onSuccess?: (body: { url: string }) => void;
  file: File;
}

export interface DSlateEditor extends ReactEditor {
  defaultElement?: string;
  [index: string]: any;
}

export type DSlateCustomElement = BaseElement & {
  type: string;
  [index: string]: any;
};

export type DSlateCustomText = BaseText & {
  text: string;
  [index: string]: any;
};

export type NormalizeNode = (entry: NodeEntry) => void;

export type DSlatePlugin = {
  uuid?: React.Key;
  type: string;
  nodeType: "element" | "text" | "tool";
  isVoid?: ((element: DSlateCustomElement) => boolean) | boolean;
  isInline?: ((element: DSlateCustomElement) => boolean) | boolean;
  toolbar?: React.ReactNode;
  renderElement?: (
    props: RenderElementPropsWithStyle,
    editor: Editor
  ) => JSX.Element;
  renderLeaf?: (props: RenderLeafPropsWithStyle, editor: Editor) => JSX.Element;
  renderStyle?:
    | ((
        node: Descendant,
        editor: Editor,
        props?: Record<string, any>
      ) => CSSProperties)
    | CSSProperties;
  normalizeNode?: (
    entry: NodeEntry,
    editor: Editor,
    next: NormalizeNode
  ) => void;
  withPlugin?: (editor: Editor) => Editor;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, editor: Editor) => void;
  isDefaultElement?: boolean;
  locale?: Locale[];
  props?: Record<string, any>;
  serialize?: (element: any, pluginProps: any, children: any[]) => string;
};

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

export interface ProgressProps {
  strokeWidth?: number;
  showInfo?: boolean;
}

export interface ShowCountProps {
  formatter: (args: { count: string }) => string;
}

export type UploadFunc = (options: UploadRequestOption) => void;
declare module "slate" {
  interface CustomTypes {
    Editor: DSlateEditor;
    Element: DSlateCustomElement;
    Text: DSlateCustomText;
  }
}
