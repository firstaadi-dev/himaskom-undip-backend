const Joi = require('joi');

const ArticlePayloadSchema = Joi.object({
  judul: Joi.string().required(),
  deskripsi: Joi.string().required(),
  gambarUrl: Joi.array().items(Joi.string().uri()).required(),
  jenisId: Joi.number().min(0).max(12),
  harga: Joi.number(),
});

module.exports = {
  ArticlePayloadSchema,
};
