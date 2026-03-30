const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    library: "my-library",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/main.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/leaflet/dist/images', to: 'images' },
        { from: 'assets/images', to: 'images' },
        { from: 'assets/fonts', to: 'fonts'},
        { from: 'html', to: '' },
        { from: 'data', to: 'data', noErrorOnMissing: true }
      ],
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new NodePolyfillPlugin(),
  ],
  resolve: {
    fallback: {
      "fs": false,
      "os": false,
      "path": false,
      "dns": false,
      "net": false,
      "tls": false
    }
  },
  mode: 'production'
};