import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**', '!src/**/*.md', "!src/**/__tests__"],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
      autoExtension: false,
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginReact()],
});
