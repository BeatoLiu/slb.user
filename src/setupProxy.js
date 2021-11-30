const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy.createProxyMiddleware('/api', {    // 'qwl'  需要转发的请求
        // target: 'http://localhost:9007/',
        // target: 'http://192.168.0.10:9007/',
        target: 'http://192.168.0.161:9007/', // 王
        // target: 'http://tttest.2qzs.com',
        // target: 'http://tk.2qzs.com',
        // target: 'http://192.168.0.112:9002/mg',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        },
    }));
}