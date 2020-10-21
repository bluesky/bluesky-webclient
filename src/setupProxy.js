const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/qs',
    createProxyMiddleware({
      target: 'http://localhost:60610',
      changeOrigin: true,
      pathRewrite: {
        "^/qs": "",
      },
    })
  );
  app.use(
    '/info',
    createProxyMiddleware({
      target: 'http://localhost:6943',
      changeOrigin: true,
      pathRewrite: {
        "^/info": "",
      },
    })
  );
};
