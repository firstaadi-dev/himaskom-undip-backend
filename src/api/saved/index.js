const SavedHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'saved',
  version: '1.0.0',
  register: async (server, { service }) => {
    const savedHandler = new SavedHandler(service);
    server.route(routes(savedHandler));
  },
};
