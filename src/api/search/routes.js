const routes = (handler) => [
  {
    method: 'GET',
    path: '/search-article',
    handler: handler.searchByArticleTitleHandler,
  },
];

module.exports = routes;
