const autobindr = require('autobindr');
const ClientError = require('../../exceptions/ClientError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

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

  async getSavedArticleHandler(request, h) {
    try {
      const { uid } = request.params;
      const result = await this.service.getSavedArticles(uid);
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

  async deleteSavedArticleHandler(request, h) {
    try {
      if (request.headers.authorization !== 'tes') {
        throw new AuthorizationError('kredensial salah');
      }
      const { uid, articleId } = request.params;
      await this.service.deleteSavedArticle(uid, articleId);
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

module.exports = SavedHandler;
