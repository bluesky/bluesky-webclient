const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/qs',
    createProxyMiddleware({
      target: process.env.REACT_APP_HTTP_SERVER || 'http://localhost:60610',
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
  app.use(
    '/preview',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: {
        "^/preview": "",
      },
    })
  );
};
