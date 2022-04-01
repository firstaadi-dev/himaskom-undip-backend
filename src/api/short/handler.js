const autobindr = require('autobindr');
const ClientError = require('../../exceptions/ClientError');

class ShortHandler {
  constructor(service) {
    this.service = service;
    autobindr(this);
  }

  async getShortByIdHandler(request, h) {
    try {
      const { articleId } = request.params;
      const result = await this.service.getShortById(articleId);
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
}

module.exports = ShortHandler;
