const fs = require('fs');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'server.js'),

  output: {
    path: './',
    filename: 'server.bundle.js',
  },

  // Compile for usage in a NodeJS-like environment
  target: 'node',

  // Dependencies that shouldn't be resolved by webpack but should
  // become dependencies of the resulting bundle.
  // - readdirSync:    Retuns a array of filenames
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce((ext, mod) => {
    ext[mod] = 'commonjs ' + mod;
    return ext;
  }, {}),

  // Allows to include polyfills or mocks for various node stuff
  node: {
    // real filename relative to the context option
    __filename: true,
    // real dirname relative to the context option
    __dirname: true,
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            'react',
          ],
        },
      },
    ],
  },

};
