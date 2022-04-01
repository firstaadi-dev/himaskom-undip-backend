const routes = (handler) => [
  {
    method: 'GET',
    path: '/articles/short/{articleId}',
    handler: handler.getShortByIdHandler,
  },
];

module.exports = routes;
