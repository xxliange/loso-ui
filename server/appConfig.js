module.exports = {
    deployUrl: "127.0.0.0:8080",
    proxyUrlMap: {
        "/api": "localtion:3000",
        "/api2": "localtion:4000",
    },
    port: 9000,
    host: 'localhost',
};