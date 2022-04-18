const autobindr = require('autobindr');
const { errorHandler } = require('../../utils');

class SearchHandler {
  constructor(service) {
    this.service = service;
    autobindr(this);
  }

  async searchByArticleTitleHandler(request, h) {
    try {
      const { query } = request.query;
      const result = await this.service.searchArticleByTitle(query);
      return h.response({ data: result }).code(200);
    } catch (error) {
      console.log(error);
      return errorHandler(error, h);
    }
  }
}

module.exports = SearchHandler;
