const {path, resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: resolve(__dirname, 'src'),

	entry: [
		'react-hot-loader/patch',
		// activate HMR for React

		'webpack-dev-server/client?http://localhost:8080',
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint

		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates

		'./index.js'
		// the entry point of our app
	],
	output: {
		filename: 'bundle.js',
		// the output bundle

		path: resolve(__dirname, 'dist'),

		publicPath: '/'
		// necessary for HMR to know where to load the hot update chunks
	},

	devtool: 'inline-source-map',

	devServer: {
		hot: true,
		// enable HMR on the server

		contentBase: resolve(__dirname, 'dist'),
		// match the output path

		publicPath: '/'
		// match the output `publicPath`
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ['babel-loader',],
				exclude: /node_modules/
			},

			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
			},

			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader!sass-loader',
				}),
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: '',
			template: 'public/index.html',
		}),

		/*new CopyWebpackPlugin([
			{from: 'mock'}
		]),*/

		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates

		new ExtractTextPlugin({
			filename: 'css/[name].[hash].css',
			disable: false
		}),
	],
};


