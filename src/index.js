require('dotenv').config();

const Hapi = require('@hapi/hapi');

// Articles
const articles = require('./api/articles');
const ArticlesService = require('./services/postgres/articlesService');
const ArticlesValidator = require('./validator/articles');

const init = async () => {
  const articlesService = new ArticlesService();
  const server = Hapi.server({
    port: 8080,
    host: 'localhost',
  });

  await server.register([
    {
      plugin: articles,
      options: {
        service: articlesService,
        validator: ArticlesValidator,
      },
    },
  ]);
  await server.start();
  console.log(server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
