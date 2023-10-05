/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue2";
import Markdown from "vite-plugin-vue-markdown";
import { createSvgPlugin } from "vite-plugin-vue2-svg";

module.exports = defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown(),
    createSvgPlugin(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "receipt-capacitor",
      fileName: (format) => `receipt-capacitor.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo): string => {
          if (assetInfo.name === "style.css") return "receipt-capacitor.css";
          return assetInfo.name!;
        },
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
    emptyOutDir: false,
  },
  resolve: {
    dedupe: ["vue"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
