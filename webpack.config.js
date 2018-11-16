const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const apiMocker = require('webpack-api-mocker');
console.log(__dirname);
module.exports = {
    //入口文件配置
    entry:{
        index:"./src/index.js",
        main:"./src/main.js"
    },
    context:__dirname, //基础目录，绝对路径,默认使用当前目录，建议配置以区别于当前执行路径
    //出口文件配置
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:'[name].js'
    },
    //模块处理方式
    module:{
        rules:[
            //js向下兼容
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader" ,
                options: {
                    presets: ['@babel/preset-env',"@babel/preset-react"],
                    plugins: [
                        '@babel/plugin-transform-runtime',
                        "@babel/plugin-syntax-dynamic-import",
                        ["@babel/plugin-proposal-decorators", { "legacy": true }]
                    ]
                    //@babel/plugin-syntax-dynamic-import插件可以实现动态加载功能，可用于代码分割.
                    //@babel/plugin-proposal-decorators 装饰器模式
                }
            },
            //处理css文件
            {
                test:/\.css/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader',options:{
                        modules:false,
                        exclude: /node_modules/
                    }}
                  
                ]
            },
            //处理图片以及字体文件
            {
                test:/\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/, 
                use:[{ 
                    loader: "url-loader",
                    options:{
                        limit:300,
                    }
                }]
            },
        ]
    },
    //本地服务器
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        historyApiFallback: true,
        open:true,
        before(app){
            apiMocker(app,path.resolve("./src/mock/mock.js"),{

            })
        }
  /*    proxy:{
            "/":"http://10.66.1.78:8084/",
            changeOrigin: true
        } */
    },
    //插件功能(主要用于代码的编译的优化)
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            filename:"index.html",
            chunks:["index"]
        }),
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            filename:"main.html",
            chunks:['main']
        }),
        new CleanWebpackPlugin("./dist")
    ],
    //*代码分割功能*
    optimization:{
        splitChunks:{
            chunks:'all',
            minSize: 30,
            // name:'common',
            automaticNameDelimiter:".",
            cacheGroups:{
                vendors:{
                    test: /[\\/]node_modules[\\/]/,
                    reuseExistingChunk: true,
                    priority: 10,
                    enforce: true
                },
                self:{
                    test: /[\\/]component[\\/]/,
                    reuseExistingChunk: true,
                    priority: 100,
                    enforce: true
                },
                jquery:{
                    test: /jquery/,
                    reuseExistingChunk: true,
                    priority: 100,
                    enforce: true
                }  
            }
        }
        // runtimeChunk:true
    },



    // mode:"development",
    mode:"production",   //用于生产环境
    devtool:"source-map"
}