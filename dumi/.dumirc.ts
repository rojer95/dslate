import { defineConfig } from "dumi";

export default defineConfig({
  chainWebpack(memo) {
    memo.plugins.delete("copy");
  },
  base: "/dslate/",
  publicPath: "/dslate/",
  themeConfig: {
    name: "DSlate",
    socialLinks: {
      github: "https://github.com/rojer95/dslate",
    },
  },
});
