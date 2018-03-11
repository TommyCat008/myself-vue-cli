const path = require('path');
const express = require('express');
const app = express();
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

// serve pure static assets
var staticPath = path.posix.join('/', 'static')
app.use(staticPath, express.static('./static'))

module.exports = Merge(CommonConfig, {
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		hot: true,
		hotOnly: true,
	},
	output: {
        // 输出文件名
        filename: 'static/js/[name].js',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development') // 在编译的代码里设置了`process.env.NODE_ENV`变量
		}),
		new webpack.HotModuleReplacementPlugin(),

		new webpack.NamedModulesPlugin(),
	]
});
