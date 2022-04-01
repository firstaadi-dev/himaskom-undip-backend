const JenisHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'jenis',
  version: '1.0.0',
  register: async (server, { service }) => {
    const jenisHandler = new JenisHandler(service);
    server.route(routes(jenisHandler));
  },
};
