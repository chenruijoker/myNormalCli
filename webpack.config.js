const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJs = require("uglifyjs-webpack-plugin");

module.exports = {
    // devtool: 'inline-source-map',
    entry: {
        app: "./src/index.js",
    },
    output: {
        filename: "[name].js",
        publicPath: "./",
        path: path.resolve(__dirname, "build"),
    },
    optimization: {
        // 优化项
        minimizer: [
            new UglifyJs({
                cache: true, //是否缓存
                parallel: true, //是否并发操作
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./demo/index.html",
            filename: "index.html",
        }),
    ],
    devServer: {
        contentBase: "./build",
        hot: true,
        compress: true,
        inline: true,
        progress: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.html?$/,
                use: "html-withimg-loader",
            },
            {
                //支持css、less、scss
                test: /\.(c|le|sc)ss$/,
                use: [
                    "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader, // 支持分离css，顺序不能随意变动
                        options: {
                            publicPath: "../", // 防止css 图片报错
                            esModule: false,
                        },
                    },
                    "css-loader",
                    "postcss-loader",
                    "less-loader",
                    "sass-loader",
                ],
            },
            {
                // 加载图片
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10 * 1024, // 图片小于10KB值的时候变为base64直接附着在js中(这里的单位为B)
                            outputPath: "static/", //打包后的图片放在 build/static/下边
                            name: "[name][hash:8].[ext]",
                            esModule: false,
                        },
                    },
                ],
            },
            {
                // 支持ES6以及reactJSX语法
                test: /\.jsx?$/,
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: false,
                        presets: [
                            require.resolve("@babel/preset-react"),
                            [
                                require.resolve("@babel/preset-env"),
                                { modules: false },
                            ],
                        ],
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
    },
};
