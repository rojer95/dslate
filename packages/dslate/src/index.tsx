import DSlate from './components/DSlate';
import AntdStyleEditor from './components/AntdStyleEditor';
import Toolbar from './components/Toolbar';
import IconFont from './components/IconFont';
import Popover from './components/Popover';
import Editable from './components/Editable';
import Progress from './components/Progress';
import Counter from './components/Counter';

export { DSlate, Editable, Progress, Counter, Toolbar, IconFont, Popover };

export { default as DefaultPlugin } from './plugins';
export { default as defaultConfig } from './defaultConfig';

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

export default AntdStyleEditor;
