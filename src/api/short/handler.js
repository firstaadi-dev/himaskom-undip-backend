const autobindr = require('autobindr');
const { errorHandler } = require('../../utils');

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
      return errorHandler(error, h);
    }
  }
}

module.exports = ShortHandler;
