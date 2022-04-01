const routes = (handler) => [
  {
    method: 'GET',
    path: '/articles/jenis/{jenis}',
    handler: handler.getArticleByJenisHandler,
  },
];

module.exports = routes;
