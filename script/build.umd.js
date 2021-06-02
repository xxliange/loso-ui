const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const { name } = require("../package.json");

function resolve(moduleName) {
    return require.resolve(moduleName);
}

const config = {
    mode: "production",
    entry: {
        [name]: ["./components/index.js"]
    },
    output: {
        library: name,
        libraryTarget: "umd",
        umdNamedDefine: true,
        path: path.join(process.cwd(), "dist"),
        filename: "[name].min.js"
    },
    externals: {
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    },
    resolve: {
        enforceExtension: false,
        extensions: [".js", ".jsx", ".json", ".less", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            require.resolve('@babel/preset-react'),
                            [
                                require.resolve('@babel/preset-env'),
                                {
                                    modules: false
                                }
                            ]
                        ]
                    }
                }

            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            require.resolve('@babel/preset-react'),
                            [
                                require.resolve('@babel/preset-env'),
                                {
                                    modules: false
                                }
                            ]
                        ]
                    }
                }

            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: resolve('css-loader'),
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: resolve('postcss-loader'),
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer']
                            },
                            sourceMap: true
                        }
                    }
                ]
            }, {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: resolve('css-loader'),
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: resolve('postcss-loader'),
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer']
                            },
                            sourceMap: true
                        }
                    }, {
                        loader: resolve('sass-loader'),
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        drop_debugger: true,
                        drop_console: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require("cssnano"),
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                }
            })
        ],
        noEmitOnErrors: true
    },
    plugins: [
        new ProgressBarPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].min.css"
        })

    ]
};

module.exports = config;