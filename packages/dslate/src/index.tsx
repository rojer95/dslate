import DSlate from './components/DSlate';

import DSlateContext, { ConfigProvider, ConfigConsumer, useConfig } from './ConfigContext';

import Toolbar, { ToolbarModal, ToolbarButton, ToolbarSelect } from './components/Toolbar';

import type { DSlateProps } from './components/DSlate/';

import type {
  ToolbarModalProps,
  ToolbarButtonProps,
  ToolbarSelectProps,
} from './components/Toolbar';

import type { DSlateCustomElement, DSlateCustomText, DSlateEditor, DSlatePlugin } from './typing';

export {
  DSlateContext,
  ConfigProvider,
  ConfigConsumer,
  useConfig,
  Toolbar,
  ToolbarModal,
  ToolbarButton,
  ToolbarSelect,
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
