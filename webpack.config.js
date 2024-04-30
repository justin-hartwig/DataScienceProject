const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './js/main.js',  // Only JavaScript file as entry
  output: {
    filename: 'bundle.js',  // Outputs as bundle.js
    path: path.resolve(__dirname, 'dist'),
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
          MiniCssExtractPlugin.loader,  // Extracts CSS into separate files
          'css-loader',  // Translates CSS into CommonJS
          'sass-loader'  // Compiles Sass to CSS
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',  // Images will be output to dist/images
              publicPath: 'images/'   // Public URL path, adjust as necessary based on your server setup
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/main.css',  // Outputs compiled CSS to the css directory
    }),
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/leaflet/dist/images', to: 'images' } // Adjust 'to' according to where you want to keep your images
      ],
    }),
  ],
  mode: 'development'  // Set the mode to 'development' or 'production'
};
