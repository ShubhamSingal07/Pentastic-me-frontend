const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.config');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
  output: {
    path: BUILD_DIR,
    filename: 'bundle.[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
});
