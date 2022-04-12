const autobindr = require('autobindr');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const { errorHandler } = require('../../utils');
const { fs } = require('../../config');

class ArticlesHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    autobindr(this);
  }

  async addArticleHandler(request, h) {
    try {
      this.validator.validateArticlePayload(request.payload);
      const result = await this.service.addArticle(
        request.headers.authorization,
        request.payload,
      );
      return h.response({ data: { id: result } }).code(200);
    } catch (error) {
      console.log(error);
      return errorHandler(error, h);
    }
  }

  async getArticlesHandler(request, h) {
    try {
      const result = await this.service.getAllArticles();
      return h.response({ data: result });
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async getArticleByIdHandler(request, h) {
    try {
      const { articleId } = request.params;
      const result = await this.service.getArticleById(articleId);

      return h.response({ data: result }).code(200);
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async putArticleByIdHandler(request, h) {
    try {
      this.validator.validateArticlePayload(request.payload);

      const { articleId } = request.params;
      const id = await this.service.editArticleById(
        articleId,
        request.headers.authorization,
        request.payload,
      );

      return h.response({ id }).code(200);
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async deleteArticleByIdHandler(request, h) {
    try {
      const { articleId } = request.params;
      await this.service.deleteArticleById(
        request.headers.authorization,
        articleId,
      );

      return h.response().code(204);
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = ArticlesHandler;
