// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///Volumes/work/dslate/node_modules/.pnpm/vite@4.1.1_@types+node@14.18.36/node_modules/vite/dist/node/index.js";
import react from "file:///Volumes/work/dslate/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@4.1.1/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///Volumes/work/dslate/node_modules/.pnpm/vite-plugin-dts@1.7.2_rxcq75izlfzwungwa2l36cezd4/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Volumes/work/dslate/packages/core";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      skipDiagnostics: false
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/index.tsx"),
      name: "DSlateCore",
      fileName: "lib"
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["react", "react-dom", "slate", "slate-react"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          slate: "Slate",
          "slate-react": "SlateReact"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVm9sdW1lcy93b3JrL2RzbGF0ZS9wYWNrYWdlcy9jb3JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVm9sdW1lcy93b3JrL2RzbGF0ZS9wYWNrYWdlcy9jb3JlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Wb2x1bWVzL3dvcmsvZHNsYXRlL3BhY2thZ2VzL2NvcmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGR0cyh7XG4gICAgICBza2lwRGlhZ25vc3RpY3M6IGZhbHNlLFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcImxpYi9pbmRleC50c3hcIiksXG4gICAgICBuYW1lOiBcIkRTbGF0ZUNvcmVcIixcbiAgICAgIGZpbGVOYW1lOiBcImxpYlwiLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gXHU3ODZFXHU0RkREXHU1OTE2XHU5MEU4XHU1MzE2XHU1OTA0XHU3NDA2XHU5MEEzXHU0RTlCXHU0RjYwXHU0RTBEXHU2MEYzXHU2MjUzXHU1MzA1XHU4RkRCXHU1RTkzXHU3Njg0XHU0RjlEXHU4RDU2XG4gICAgICBleHRlcm5hbDogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIiwgXCJzbGF0ZVwiLCBcInNsYXRlLXJlYWN0XCJdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIFx1NTcyOCBVTUQgXHU2Nzg0XHU1RUZBXHU2QTIxXHU1RjBGXHU0RTBCXHU0RTNBXHU4RkQ5XHU0RTlCXHU1OTE2XHU5MEU4XHU1MzE2XHU3Njg0XHU0RjlEXHU4RDU2XHU2M0QwXHU0RjlCXHU0RTAwXHU0RTJBXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICByZWFjdDogXCJSZWFjdFwiLFxuICAgICAgICAgIFwicmVhY3QtZG9tXCI6IFwiUmVhY3RET01cIixcbiAgICAgICAgICBzbGF0ZTogXCJTbGF0ZVwiLFxuICAgICAgICAgIFwic2xhdGUtcmVhY3RcIjogXCJTbGF0ZVJlYWN0XCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1IsU0FBUyxlQUFlO0FBQ2hULFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0YsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxlQUFlO0FBQUEsTUFDekMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBLE1BRWIsVUFBVSxDQUFDLFNBQVMsYUFBYSxTQUFTLGFBQWE7QUFBQSxNQUN2RCxRQUFRO0FBQUE7QUFBQSxRQUVOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLE9BQU87QUFBQSxVQUNQLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
