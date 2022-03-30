const autobindr = require('autobindr');
const ClientError = require('../../exceptions/ClientError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class ArticlesHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    autobindr(this);
  }

  async addArticleHandler(request, h) {
    try {
      if (request.headers.authorization !== 'tes') {
        throw new AuthorizationError('kredensial salah');
      }
      this.validator.validateArticlePayload(request.payload);
      const result = await this.service.addArticle(request.payload);
      return h.response({ data: { id: result } }).code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getArticlesHandler(request, h) {
    try {
      const result = await this.service.getAllArticles();
      return h.response({ data: result });
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getArticleByIdHandler(request, h) {
    try {
      const { articleId } = request.params;
      const result = await this.service.getArticleById(articleId);

      return h.response({ data: result }).code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async putArticleByIdHandler(request, h) {
    try {
      if (request.headers.authorization !== 'tes') {
        throw new AuthorizationError('kredensial salah');
      }
      this.validator.validateArticlePayload(request.payload);

      const { articleId } = request.params;
      const id = await this.service.editArticleById(articleId, request.payload);

      return h.response({ id }).code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteArticleByIdHandler(request, h) {
    try {
      if (request.headers.authorization !== 'tes') {
        throw new AuthorizationError('kredensial salah');
      }
      const { articleId } = request.params;
      await this.service.deleteArticleById(articleId);

      return h.response().code(204);
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = ArticlesHandler;
