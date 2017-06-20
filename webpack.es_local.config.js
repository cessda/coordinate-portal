var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/*
  Define URLs (Elasticsearch) in config.js and change the variable for
  the stringified input for DefinePlugin
*/
var globals = require('./config.js');

module.exports = {
	devtool : "eval",
	context : path.join(__dirname),
	entry : [ 'webpack-hot-middleware/client?reload=true', './src/index.jsx' ],
	output : {
		path : path.join(__dirname, 'dist'),
		filename : 'bundle.js',
		publicPath : '/static/',
	},
	plugins : [ 
		new webpack.HotModuleReplacementPlugin(),
	  new webpack.DefinePlugin({
    esURL: JSON.stringify(globals.local)
	})],
	resolve : {
		alias : {
			react : path.resolve('./node_modules/react')
		},
		extensions : [ ".js", ".jsx", ".webpack.js", ".web.js",".json" ]
	},
	resolveLoader : {
		root : path.join(__dirname, "node_modules")
	},
	module : {
		loaders : [
				{
					test : /\.jsx?$/,
					exclude : /(node_modules)/,
					loader : 'babel',
					query : {
						presets : [ require.resolve('babel-preset-es2015'),
								require.resolve('babel-preset-react') ]
					}
				}, {
					test : /\.css$/,
					loaders : [ "style", "css" ]
				},
        {
          test : /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel'
        },{
				    test: /\.(jpeg?|png|gif|svg)$/i,
				    loaders: [
				      'file?hash=sha512&digest=hex&name=[hash].[ext]',
				      'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				    ]
				  }
				]
	}
};
