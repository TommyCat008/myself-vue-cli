const path = require('path');

// 用作自动生成index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 清除dist文件夹中已存在的文件
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 拷贝插件
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack');

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
        // 顺序排好
        main: './src/output.js',
  	},
  	output: { // 输出，只可指定一个输出配置
    	filename: '[name].[chunkhash].js', // 在配置文件中使用`process.env.NODE_ENV`
        // 输出文件所在的目录
    	path: path.resolve(__dirname, 'dist'),
  	},
   	plugins: [ // 插件属性，是插件的实例数组
    	new HtmlWebpackPlugin({
            // 引入HTML的模板
    		template: './index.html',
            // 写入 HTML 文件的文件名，默认 `index.html`
      		filename: 'index.html',
            // 按顺序添加
            // chunks: ['freedoX', 'main'],
            // chunksSortMode: 'manual'
    	}),
    	new CleanWebpackPlugin(['dist']), // 第一个参数是要清理的目录的字符串数组
    	// 启用 HMR
    	// new webpack.HotModuleReplacementPlugin(),
    	// // 打印日志信息时 webpack 默认使用模块的数字 ID 指代模块，不便于 debug，这个插件可以将其替换为模块的真实路径
    	// new webpack.NamedModulesPlugin(),
        new webpack.optimize.UglifyJsPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        // 复制static的代码到dist的路径下
        new CopyWebpackPlugin([{
                from: path.resolve(__dirname, './static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
        
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        })
  	],
   	module: { // 如何处理项目中不同类型的模块
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
  	},
};
