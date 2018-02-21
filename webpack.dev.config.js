const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  context: path.join(__dirname),
  entry: [
    'babel-polyfill',
    'event-source-polyfill',
    'webpack-hot-middleware/client?reload=true',
    './src/index.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      PASC_DEBUG_MODE: false,
      PASC_PORT: 8088,
      PASC_ELASTICSEARCH_URL: null,
      PASC_ANALYTICS_ID: null
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
          'flow-react-proptypes'
        ]
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(scss|sass)$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'sass-loader' // compiles Sass to CSS
      }]
    }, {
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
      //exclude: /node_modules/
    }]
  }
};
