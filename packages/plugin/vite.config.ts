import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      skipDiagnostics: false,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.tsx"),
      name: "DSlatePlugin",
      fileName: "lib",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "react",
        "react-dom",
        "@dslate/core",
        "@dslate/component",
        "slate",
        "slate-react",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@dslate/core": "DSlateCore",
          "@dslate/component": "DSlateComponent",
          slate: "Slate",
          "slate-react": "SlateReact",
        },
      },
    },
  },
});
