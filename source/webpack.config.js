const path = require("path");
const webpack = require("webpack");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => ({
    entry: ["./assets/js/index.js", "./index.html"],
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
        filename: "bundle.js",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ErrorOverlayPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/table.css",
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "./index.html",
        }),
    ],
    devtool: "cheap-module-source-map",
    devServer: {
        // contentBase: "./dist",
        hot: true,
        host: "0.0.0.0",
        port: 8080,
        historyApiFallback: true,
    },
    module: {
        rules: [
            // {
            //   enforce: 'pre',
            //   test: /\.(js|jsx)$/,
            //   exclude: /node_modules/,
            //   loader: 'eslint-loader',
            //   options: {
            //     emitWarning: true,
            //   },
            // },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".html", ".css"],
    },
    // node: {
    //   fs: 'empty',
    // },
});
