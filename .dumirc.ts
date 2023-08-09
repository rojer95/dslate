import { defineConfig } from 'dumi';
import { join } from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/dslate/',
  publicPath: '/dslate/',
  themeConfig: {
    name: 'DSlate',
    socialLinks: {
      github: 'https://github.com/rojer95/dslate',
    },
  },
  mfsu: false,
  monorepoRedirect: {
    srcDir: ['packages'],
    peerDeps: true,
  },
  resolve: {
    docDirs: ['docs'],
  },
  alias: {
    '@dslate/core': join(__dirname, './packages/core/lib'),
    '@dslate/component': join(__dirname, './packages/component/lib'),
    '@dslate/plugin': join(__dirname, './packages/plugin/lib'),
    '@dslate/antd': join(__dirname, './packages/antd/lib'),
    '@dslate/semi': join(__dirname, './packages/semi/lib'),
  },
});
