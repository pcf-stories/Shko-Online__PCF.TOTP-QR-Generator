const webpack = require('webpack');
const revision = require('child_process').execSync('git rev-parse HEAD').toString().trim();

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  devtool: false,
  mode: "production",
  resolve: {
    fallback: {
      fs: false,
      stream: false,
      crypto: require.resolve("crypto-browserify")
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      append: `\n//# sourceMappingURL=https://sourcemaps.xrm.al/PCF/TOTPQRGenerator/${revision}/[url]`,
      filename: '../../[name].map',
      fileContext: './'
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer/', 'Buffer']
    }),
  ]
};
