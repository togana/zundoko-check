// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md#pass
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const outputPath = path.join(__dirname, 'dist');

module.exports = {
  devtool: false,
  entry: {
    bundle: './src/index.jsx',
  },
  output: {
    path: outputPath,
    filename: DEBUG ? '[name].js' : '[name].[chunkhash].js',
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint' },
    ],
    loaders: [
      { include: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          ...(DEBUG ? ['react-hot'] : []),
          'babel',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './src/index.template.ejs',
      inject: 'body',
    }),
    ...(DEBUG ? [] : [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        comments: false,
      }),
      new ManifestPlugin(),
      new ChunkManifestPlugin({
        filename: 'chunk-manifest.json',
        manifestVariable: 'webpackManifest',
      }),
      new CleanWebpackPlugin([outputPath]),
    ]),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  eslint: {
    configFile: './.eslintrc.json',
  },
};
