const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const JsDocPlugin = require('jsdoc-webpack-plugin')

module.exports = {
  mode: 'production',

  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 200000,
    },
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: 'commonjs' }]],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    regenerator: true,
                  },
                ],
                ['add-module-exports'],
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new JsDocPlugin({
      conf: 'jsdoc.conf.json',
      cwd: '.',
      preserveTmpFile: false,
      recursive: false,
    }),
  ],
}
