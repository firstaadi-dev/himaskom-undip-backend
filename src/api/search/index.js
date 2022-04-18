const SearchHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'search',
  version: '1.0.0',
  register: async (server, { service }) => {
    const searchHandler = new SearchHandler(service);
    server.route(routes(searchHandler));
  },
};
