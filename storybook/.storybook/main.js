/*
   Copyright 2023 Betim Beja and Shko Online LLC

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const config = {
  "stories": ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async config => {
    config.devtool = false;
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback.stream = false;
    config.resolve.fallback.fs = false;
    config.resolve.fallback.crypto = require.resolve("crypto-browserify");
    config.module.rules.forEach(rule => {
      if ("a.tsx".match(rule.test)) {
        //console.log(rule.use);
        rule.use = [{
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            // Or 'ts' if you don't need tsx
            target: 'es2015'
          }
        }];
      }
    });
    config.plugins.push(new webpack.SourceMapDevToolPlugin({
      append: '\n//# sourceMappingURL=[url]',
      fileContext: './',
      filename: '[file].map'
    }));
    config.plugins.push(new webpack.ProvidePlugin({
      Buffer: ['buffer/', 'Buffer']
    }));
    return config;
  },
  features: {
    interactionsDebugger: true,
    storyStoreV7: true
  }
};
export default config;