require('dotenv').config();

const Hapi = require('@hapi/hapi');

// Articles
const articles = require('./api/articles');
const ArticlesService = require('./services/postgres/articlesService');
const ArticlesValidator = require('./validator/articles');

// Short
// const short = require('./api/short');
// const ShortService = require('./services/postgres/shortService');

// Jenis
const jenis = require('./api/jenis');
const JenisService = require('./services/postgres/jenisService');

// Saved
const saved = require('./api/saved');
const SavedService = require('./services/postgres/savedService');

// Search
const search = require('./api/search');
const SearchService = require('./services/postgres/searchService');

const init = async () => {
  const articlesService = new ArticlesService();
  // const shortService = new ShortService();
  const jenisService = new JenisService();
  const savedService = new SavedService();
  const searchService = new SearchService();
  const server = Hapi.server({
    port: process.env.PORT || '8080',
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: articles,
      options: {
        service: articlesService,
        validator: ArticlesValidator,
      },
    },
    // {
    //   plugin: short,
    //   options: {
    //     service: shortService,
    //   },
    // },
    {
      plugin: jenis,
      options: {
        service: jenisService,
      },
    },
    {
      plugin: saved,
      options: {
        service: savedService,
      },
    },
    {
      plugin: search,
      options: {
        service: searchService,
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
