const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /\.useable\.css$/,
        loader: 'style!css',
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
        // loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
      },
      // {
      //   test: /\.css?$/,
      //   loaders: ['style', 'raw'],
      //   include: path.resolve(__dirname, '../'),
      // },
    ],
  },
};
