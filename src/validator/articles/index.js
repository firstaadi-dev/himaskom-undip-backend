const { ArticlePayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ArticlesValidator = {
  validateArticlePayload: (payload) => {
    const validateResult = ArticlePayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = ArticlesValidator;
