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
  sass: {
    // 默认值 Dart Sass，如果要改用 Node Sass，可安装 node-sass 依赖，然后使用该配置项
    implementation: require('node-sass'),
    // 传递给 Dart Sass 或 Node Sass 的配置项，可以是一个 Function
    sassOptions: {},
  },
  // more config: https://d.umijs.org/config
});
