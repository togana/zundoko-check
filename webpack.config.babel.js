import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const DEBUG = !process.argv.includes('-p');
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
    rules: [
      { test: /\.jsx?$/, enforce: 'pre', exclude: /node_modules/, loader: 'eslint-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          ...(DEBUG ? ['react-hot-loader'] : []),
          'babel-loader',
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
      new ManifestPlugin(),
      new ChunkManifestPlugin({
        filename: 'chunk-manifest.json',
        manifestVariable: 'webpackManifest',
      }),
      new CleanWebpackPlugin([outputPath]),
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
