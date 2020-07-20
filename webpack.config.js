const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")



module.exports={
    entry:'./src/index.js',
    // 出口
    output:{
        path:path.join(__dirname,'dist'),
        filename:"[name].[hash:5].bundle.js", // main.sdlkjfsld.boundle.js
    },
    devServer:{
        contentBase: path.join(__dirname, "public"),
        // port:6666,
        proxy: {
            "/api": {
              target: "https://mall.api.epet.com",
              changeOrigin: true,
              pathRewrite: {"^/api" : "/"}
            },
            "/local":{
                target: "http://localhost:6767",
                changeOrigin: true,
                pathRewrite: {"^/local" : "/"}
              },
        }
    },
    //重命名路径
    resolve:{
        alias:{
            '@':path.join(__dirname,'src'),
            '@com':path.join(__dirname,'src/components'),
        }
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/, //编译jsx
                exclude:path.join(__dirname, "node_modules"),
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-react'],
                        plugins:[
                            ['@babel/plugin-proposal-decorators',{legacy:true}],
                            ['@babel/plugin-proposal-class-properties',{loose:true}],
                            ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
                        ]
                    }
                }]
            },
            //样式加载,加载顺序时从后面到前面的
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            // sass加载
            {
                test:/\.scss$/,
                exclude:path.join(__dirname, "node_modules"),
                use:['style-loader','css-loader','sass-loader']
            }
        ]
    },
    // 插件
    plugins:[
        new CleanWebpackPlugin(),
        // 生成一个HTML文件
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'public/template.html'),
            title:'首页', //在模板title标签中写入<%= htmlWebpackPlugin.options.title %>  
        })
    ]
}