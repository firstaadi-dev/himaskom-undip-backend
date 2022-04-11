const autobindr = require('autobindr');
const ClientError = require('../../exceptions/ClientError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const { errorHandler } = require('../../utils');

class SavedHandler {
  constructor(service) {
    this.service = service;
    autobindr(this);
  }

  async saveArticleHandler(request, h) {
    try {
      if (request.headers.authorization !== 'tes') {
        throw new AuthorizationError('kredensial salah');
      }
      const { uid } = request.params;
      const { articleId } = request.payload;
      const result = await this.service.saveArticle(uid, articleId);
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
      if (request.headers.authorization !== 'tes') {
        throw new AuthorizationError('kredensial salah');
      }
      const { uid, articleId } = request.params;
      await this.service.deleteSavedArticle(uid, articleId);
      return h.response().code(204);
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = SavedHandler;
