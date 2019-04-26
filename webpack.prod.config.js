process.noDeprecation = true;
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname),
  entry: [
    'babel-polyfill',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      warnings: false,
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'server/views/index.ejs'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.EnvironmentPlugin({
      PASC_DEBUG_MODE: false,
      PASC_PORT: 8088,
      PASC_ELASTICSEARCH_URL: null,
      PASC_ENABLE_ANALYTICS: false
    })
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    },
    extensions: ['.js', '.jsx', '.webpack.js', '.web.js', '.json']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [
          ['es2015', {modules: false}],
          'react',
          'flow'
        ],
        plugins: [
          'transform-react-remove-prop-types'
        ]
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
      {
        test: /\.(scss|sass)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 4
            },
            pngquant: {
              quality: '75-90',
              speed: 3
            }
          }
        }]
        // exclude: /node_modules/,
      }]
  }
};
