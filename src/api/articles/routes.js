const routes = (handler) => [
  {
    method: 'POST',
    path: '/articles',
    handler: handler.addArticleHandler,
  },
  {
    method: 'GET',
    path: '/articles',
    handler: handler.getArticlesHandler,
  },
  {
    method: 'GET',
    path: '/articles/{articleId}',
    handler: handler.getArticleByIdHandler,
  },
  {
    method: 'PUT',
    path: '/articles/{articleId}',
    handler: handler.putArticleByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/articles/{articleId}',
    handler: handler.deleteArticleByIdHandler,
  },
];

module.exports = routes;
