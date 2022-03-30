const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const moment = require('moment');
const {
  mapDBToArticleModel,
  mapDBToArticleDetailModel,
} = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class ArticlesService {
  constructor() {
    this.pool = new Pool();
  }

  async addArticle({ judul, deskripsi, gambarUrl, jenisId, harga }) {
    const id = 'article-' + nanoid(8);
    const createdAt = new moment().format('YYYY-MM-DD hh:mm:ss');

    const query = {
      text: 'INSERT INTO articles VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
      values: [
        id,
        judul,
        deskripsi,
        gambarUrl,
        createdAt,
        harga,
        jenisId,
        createdAt,
      ],
    };

    const result = await this.pool.query(query);

    return result.rows[0].id;
  }

  async getAllArticles() {
    const query = {
      text:
        'SELECT\n' +
        '    a.id, a.judul, a.gambar_url, a.created_at, aj.jenis_post as jenis, a.harga, a.updated_at\n' +
        'FROM\n' +
        '    articles as a\n' +
        '            INNER JOIN article_jenis AS aj on aj.id = a.jenis_id',
    };
    const result = await this.pool.query(query);
    return result.rows.map(mapDBToArticleModel);
  }

  async getArticleById(articleId) {
    const query = {
      text:
        'SELECT\n' +
        '    a.id, a.judul, a.deskripsi, a.gambar_url, a.created_at, aj.jenis_post as jenis, a.harga, a.updated_at\n' +
        'FROM\n' +
        '    articles as a\n' +
        '            INNER JOIN article_jenis AS aj on aj.id = a.jenis_id WHERE a.id = $1',
      values: [articleId],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('article tidak ditemukan');
    }
    return result.rows.map(mapDBToArticleDetailModel)[0];
  }

  async editArticleById(
    articleId,
    { judul, deskripsi, gambarUrl, jenisId, harga },
  ) {
    const updatedAt = new moment().format('YYYY-MM-DD hh:mm:ss');
    const query = {
      text: 'UPDATE articles SET judul = $1, deskripsi = $2, gambar_url = $3, jenis_id = $4, harga = $5, updated_at = $6 WHERE id = $7 RETURNING id',
      values: [
        judul,
        deskripsi,
        gambarUrl,
        jenisId,
        harga,
        updatedAt,
        articleId,
      ],
    };

    const result = await this.pool.query(query);
    console.log(result);
    if (!result.rows.length) {
      throw new NotFoundError('article tidak ditemukan');
    }
    return result.rows[0].id;
  }
  async deleteArticleById(articleId) {
    const query = {
      text: 'DELETE FROM articles WHERE id = $1 RETURNING id',
      values: [articleId],
    };

    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('article tidak ditemukan');
    }
  }
}

module.exports = ArticlesService;
