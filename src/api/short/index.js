const ShortHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'short',
  version: '1.0.0',
  register: async (server, { service }) => {
    const shortHandler = new ShortHandler(service);
    server.route(routes(shortHandler));
  },
};
