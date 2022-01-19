import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'DSlate',
  outputPath: 'docs-dist',
  publicPath: '/dslate/',
  history: {
    type: 'hash',
  },
  mode: 'site',
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/rojer95/dslate',
    },
  ],
  // more config: https://d.umijs.org/config
});
