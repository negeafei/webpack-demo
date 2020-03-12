const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  // entry指定启动打包时的入口文件，由此文件开始，逐步解析，并递归式地构建所有文件之间的依赖图
  entry: './src/index.js',
  // output指定webpack编译完成后如何向硬盘输出编译后的文件。比如在哪里输出、如何命名等
  output: {
    // 输出的文件名
    filename: 'bundle.js',
    // 输出的路径
    path: path.resolve(__dirname, 'dist'),
  },
  // module：import、require引入的文件，以及一些通过url、src链接进来的图片等，在webpack中都视为模块
  // webpack自身只理解JavaScript，而对于非JavaScript文件，需要借助loader将其转换为webpack能够处理的有效模块，再进行打包处理
  module: {
    // 处理模块时，尝试匹配以下规则数组，若符合规则（test），则对该模块应用loader进行转换
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader'],
      }
    ]
  },
  // 设置模块如何被解析
  // 例如：以下设置别名alias，当你在任意位置的文件中 import '@assets/xxx' 时，webpack都能知道其绝对路径是'/assets/xxx'，
  // 而不需要在不同文件中通过不同的相对路径去import，如，a.js中需要 import './assets/xxx' ，而b.js中可能需要 import '../../assets/xxx' 
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'assets')
    }
  },
  // 插件的功能强大，能让你以各种方式自定义webpack的构建过程。
  plugins: [
    // HtmlWebpackPlugin可在webpack构建完成后，自动在output目录中创建一个html（可指定基于某个模板），并自动注入编译好的静态js、css等资源文件
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    // ProvidePlugin可在编译js的过程中，自动注入jquery并命名为$和jQuery，而不需要在每个js文件中通过 import $ from 'jquery' 来引入
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  
  // 此选项为webpack-dev-server所有，安装webpack-dev-server后生效
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  }
}