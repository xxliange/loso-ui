const path = require("path");
const fs = require("fs");
const { resolve, getProjectPath } = require("./script/utils/projectHelpers");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const babelConfig = require("./script/getBabelCommConfig")(false);
const pkg = require(getProjectPath("package.json"));

module.exports = {
    mode: 'development',
    cache: {
        type: "filesystem",
    },
    devtool: false,
    entry: {
        "loso-ui": './website'
    },
    output: {
        path: path.resolve(fs.realpathSync(process.cwd()), "dist"),
        filename: '[name].js',
        publicPath: "./",
        library: "loso-ui",
        libraryExport: "default",
        libraryTarget: "umd"
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'node_modules')],
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.json',
            '.css',
            '.scss'
        ],
        alias: {
            [pkg.name]: process.cwd(),
            "@components": path.resolve(fs.realpathSync(process.cwd()), "components")
        }
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
                test: /\.tsx?$/,
                use: [
                    {
                        loader: resolve('babel-loader'),
                        options: babelConfig,
                    }, {
                        loader: resolve('ts-loader'),
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }, {
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
                test: /\.less$/,
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
                        loader: resolve('less-loader'),
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: true
        }),
    ],
    stats: "errors-only"
};