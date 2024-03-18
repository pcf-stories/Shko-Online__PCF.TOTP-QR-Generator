import type { StorybookConfig } from '@storybook/html-webpack5';

import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  staticDirs: ['./public'],
  webpackFinal: async (config) => {
    config.devtool = false;
    if (config.resolve) {
      config.resolve.plugins = config.resolve.plugins || [];
      config.resolve.plugins.push(new TsconfigPathsPlugin());
      config.resolve.fallback = config.resolve.fallback || {};
      config.resolve.fallback['stream'] = false;
      config.resolve.fallback['fs'] = false;
      config.resolve.fallback['crypto'] = require.resolve('crypto-browserify');
    }

    if (config.plugins) {
      config.plugins.push(
        new webpack.SourceMapDevToolPlugin({
          append: '\n//# sourceMappingURL=[url]',
          fileContext: './',
          filename: '[file].map',
        }),
      );
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer/', 'Buffer'],
        }),
      );
    }
    return config;
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
