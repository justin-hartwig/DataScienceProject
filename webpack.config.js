const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/main.css',  // Outputs compiled CSS to the css directory
    }),
  ],
  mode: 'development'  // Set the mode to 'development' or 'production'
};
