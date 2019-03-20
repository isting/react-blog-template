const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: '127.0.0.1:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
