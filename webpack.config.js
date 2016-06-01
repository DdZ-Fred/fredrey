const webpack = require('webpack');

module.exports = {
  entry: './index.js',

  output: {
    path: 'public',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel?presets[]=es2015,presets[]=react',
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.useable\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.useable\.css$/,
        loader: 'style/useable!css',
      },
    ],
  },
  /**
   * [APPLIES OPTIMIZATIONS]
   * - Dedupe:           Prevents inclusion of duplicate code
   * - OccurrenceOrder   Webpack gives Ids to modules and code chunks.
   *                     The often used pieces will the get the smallest Ids.
   * - UglifyJs          Minimize the scripts
   */
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ] : [],
};
