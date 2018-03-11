
const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
	devtool: 'cheap-module-source-map',
	output: {
        // 在配置文件中使用`process.env.NODE_ENV`
        filename: 'static/js/[name].js',
	},
	plugins: [
        new CleanWebpackPlugin(['dist']),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.UglifyJsPlugin(),
	]
});
