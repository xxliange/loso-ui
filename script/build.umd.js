const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const { name } = require("../package.json");
const { resolve, getProjectPath } = require('./utils/projectHelpers');
const pkg = require(getProjectPath("package.json"));

const config = {
    mode: "production",
    devtool: 'source-map',
    stats: "normal",
    entry: {
        "loso-ui": ["./components"],
        "loso-ui.min": ["./components"]
    },
    output: {
        library: name,
        libraryTarget: "umd",
        umdNamedDefine: true,
        path: path.join(process.cwd(), "dist"),
        filename: "[name].js"
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
            })
        ]
    },
    cache: {
        type: "filesystem",
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'node_modules')],
        extensions: [
            '.web.tsx',
            '.web.ts',
            '.web.jsx',
            '.web.js',
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.json',
        ],
        alias: {
            [pkg.name]: process.cwd(),
        }
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
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        sourceMap: true,
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
                        sourceMap: true,
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
                        options: {
                            babelrc: false,
                            sourceMap: true,
                            presets: [
                                require.resolve('@babel/preset-react'),
                                [
                                    require.resolve('@babel/preset-env'),
                                    {
                                        modules: false
                                    }
                                ]
                            ]
                        },
                    }, {
                        loader: resolve('ts-loader'),
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
            })
        ],
        noEmitOnErrors: true
    },
    plugins: [
        new ProgressBarPlugin(),

    ]
};

module.exports = config;