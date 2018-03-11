const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 拷贝插件
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
	entry: {
        main: '@/main.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
            // 引入HTML的模板
            template: './index.html',
            // 写入 HTML 文件的文件名，默认 `index.html`
            filename: 'index.html',
            chunks: ['main'],
        }),
        // 复制static的代码到dist的路径下
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './static'),
            to: 'static',
            ignore: ['.*']
        }
        ]),
	],
	module: {
		rules: [
            //转化ES6语法
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    // 应用于模块的 loader 使用列表
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // 增加加载图片的规则
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader?limit=1024&name=img/[hash:8].[name].[ext]'
                ]
            },
            {
                // 字体
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader?limit=10000&name=fonts/[hash:8].[name].[ext]',
                exclude: /node_modules/
            }
		]
	}
};
