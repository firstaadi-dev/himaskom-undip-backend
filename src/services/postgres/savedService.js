const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToArticleModel } = require('../../utils');

class SavedService {
  constructor() {
    this.pool = new Pool();
  }

  async saveArticle(uid, articleId) {
    const uniqueQuery = {
      text: 'SELECT * FROM saved_article_user WHERE user_uid = $1 AND article_id = $2',
      values: [uid, articleId],
    };

    const unique = await this.pool.query(uniqueQuery);
    if (unique.rows.length) {
      throw new InvariantError('duplikasi data terdeteksi');
    }

    const query = {
      text: 'INSERT INTO saved_article_user VALUES($1,$2) RETURNING article_id',
      values: [uid, articleId],
    };

    const result = await this.pool.query(query);

    return result.rows[0].article_id;
  }

  async getSavedArticles(uid) {
    const query = {
      text:
        'SELECT \n' +
        '        a.id, a.judul, a.gambar_url, a.created_at, aj.jenis_post as jenis, a.harga, a.updated_at\n' +
        'FROM \n' +
        '        saved_article_user \n' +
        'INNER JOIN \n' +
        '        articles a on a.id = saved_article_user.article_id \n' +
        'INNER JOIN \n' +
        '        article_jenis aj on aj.id = a.jenis_id\n' +
        'WHERE \n' +
        '        saved_article_user.user_uid = $1;',
      values: [uid],
    };

    const result = await this.pool.query(query);

    return result.rows.map(mapDBToArticleModel);
  }

  async deleteSavedArticle(uid, articleId) {
    const query = {
      text: 'DELETE FROM saved_article_user WHERE user_uid = $1 AND article_id = $2 RETURNING article_id',
      values: [uid, articleId],
    };

    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('saved article tidak ditemukan');
    }
  }
}

module.exports = SavedService;
