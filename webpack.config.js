const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    devtool: 'inline-source-map',
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './demo/index.html',
            filename: 'index.html'
        })
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        compress: true,
        open: true
    },
    module: {
        rules: [{
                test: /\.(c|le|sc)ss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'sass-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            require.resolve('@babel/preset-react'), [require.resolve('@babel/preset-env'), { modules: false }]
                        ],
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
    }
};