const routes = (handler) => [
  {
    method: 'POST',
    path: '/articles/saved/{uid}',
    handler: handler.saveArticleHandler,
  },
  {
    method: 'GET',
    path: '/articles/saved/{uid}',
    handler: handler.getSavedArticleHandler,
  },
  {
    method: 'DELETE',
    path: '/articles/saved/{uid}/{articleId}',
    handler: handler.deleteSavedArticleHandler,
  },
];

module.exports = routes;
