import DSlate from './components/DSlate';

import DSlateContext, {
  ConfigProvider,
  ConfigConsumer,
  useConfig,
  useMessage,
} from './contexts/ConfigContext';

import Toolbar from './components/Toolbar';
import DefaultPlugin from './plugins';

import type { DSlateProps } from './components/DSlate/';
import type {
  ToolbarModalProps,
  ToolbarButtonProps,
  ToolbarSelectProps,
} from './components/Toolbar';

import type { DSlateCustomElement, DSlateCustomText, DSlateEditor, DSlatePlugin } from './typing';

import defaultConfig from './defaultConfig';

export {
  defaultConfig,
  DSlateContext,
  ConfigProvider,
  ConfigConsumer,
  useConfig,
  useMessage,
  Toolbar,
  DefaultPlugin,
};

export type {
  DSlateProps,
  DSlateCustomElement,
  DSlateCustomText,
  DSlateEditor,
  DSlatePlugin,
  ToolbarModalProps,
  ToolbarButtonProps,
  ToolbarSelectProps,
};

export default DSlate;
