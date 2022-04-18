const routes = (handler) => [
  {
    method: 'GET',
    path: '/search-articles',
    handler: handler.searchByArticleTitleHandler,
  },
];

module.exports = routes;
