const ArticlesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'articles',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const articlesHandler = new ArticlesHandler(service, validator);
    server.route(routes(articlesHandler));
  },
};
