const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./../webpack.config");
const logger = require("./logger");
const appConfig = require("./appConfig");

const { port, host } = appConfig;

const compiler = Webpack(webpackConfig);

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    compress: true,
    stats: "minimal"
});

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(port, host, async err => {
    if (err) {
        return logger.error(err.message);
    };
    logger.appStarted(port, "localhost");
})
