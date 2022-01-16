import DSlate from './components/DSlate';

import Toolbar from './components/Toolbar';
import IconFont from './components/IconFont';
import Popover from './components/Popover';
import defaultConfig from './defaultConfig';

export { defaultConfig, Toolbar, IconFont, Popover };

export { default as DefaultPlugin } from './plugins';

import type { DSlateProps } from './components/DSlate/';
import type {
  ToolbarModalProps,
  ToolbarButtonProps,
  ToolbarSelectProps,
} from './components/Toolbar';

export type { DSlateProps, ToolbarModalProps, ToolbarButtonProps, ToolbarSelectProps };

export * from './typing';

export * from './contexts/ConfigContext';
export * from './contexts/PluginContext';
export * from './utils';

export default DSlate;
