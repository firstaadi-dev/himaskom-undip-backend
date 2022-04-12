const autobindr = require('autobindr');
const { errorHandler } = require('../../utils');

class SavedHandler {
  constructor(service) {
    this.service = service;
    autobindr(this);
  }

  async saveArticleHandler(request, h) {
    try {
      const { uid } = request.params;
      const { articleId } = request.payload;
      const result = await this.service.saveArticle(
        uid,
        request.headers.authorization,
        articleId,
      );
      return h.response({ data: { id: result } }).code(200);
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async getSavedArticleHandler(request, h) {
    try {
      const { uid } = request.params;
      const result = await this.service.getSavedArticles(uid);
      return h.response({ data: result });
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async deleteSavedArticleHandler(request, h) {
    try {
      const { uid, articleId } = request.params;
      await this.service.deleteSavedArticle(
        uid,
        request.headers.authorization,
        articleId,
      );
      return h.response().code(204);
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = SavedHandler;
