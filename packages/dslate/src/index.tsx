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

import DefaultPlugins from './defaultPlugin';

import { UnderlinePlugin } from './plugins/underline';
import { ParagraphPlugin } from './plugins/paragraph';
import { BoldPlugin } from './plugins/bold';
import { ThroughPlugin } from './plugins/through';
import { ItalicPlugin } from './plugins/italic';
import { ColorPlugin } from './plugins/color';
import { ClearPlugin } from './plugins/clear';
import { DividerPlugin } from './plugins/divider';
import { RedoPlugin, UndoPlugin } from './plugins/history';
import { BackgroundColorPlugin } from './plugins/background-color';
import { FontSizePlugin } from './plugins/font-size';

export {
  DSlateContext,
  ConfigProvider,
  ConfigConsumer,
  useConfig,
  Toolbar,
  ToolbarModal,
  ToolbarButton,
  ToolbarSelect,
  DefaultPlugins,
  UndoPlugin,
  RedoPlugin,
  ClearPlugin,
  DividerPlugin,
  ParagraphPlugin,
  FontSizePlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  ThroughPlugin,
  ColorPlugin,
  BackgroundColorPlugin,
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
