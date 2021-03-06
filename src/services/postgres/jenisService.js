const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToArticleModel } = require('../../utils');

class JenisService {
  constructor() {
    this.pool = new Pool();
  }

  async getArticleByJenis(jenisId) {
    const query = {
      text:
        'SELECT\n' +
        '        a.id, a.judul, a.deskripsi, a.gambar_url, a.created_at, aj.jenis_post as jenis, a.harga, a.updated_at, a.tenggat\n' +
        'FROM\n' +
        '        articles as a\n' +
        'INNER JOIN\n' +
        '        article_jenis AS aj on aj.id = a.jenis_id\n' +
        'WHERE\n' +
        '        a.jenis_id = $1\n' +
        'ORDER BY\n' +
        '        a.created_at DESC',
      values: [jenisId],
    };

    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('article tidak ditemukan');
    }
    return result.rows.map(mapDBToArticleModel);
  }
}

module.exports = JenisService;
