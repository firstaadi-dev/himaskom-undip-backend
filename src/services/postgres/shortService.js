const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');

class ShortService {
  constructor() {
    this.pool = new Pool();
  }

  async getShortById(articleId) {
    const query = {
      text:
        'SELECT\n' +
        '       a.id, a.judul, aj.jenis_post AS jenis\n' +
        'FROM\n' +
        '     articles AS a\n' +
        'INNER JOIN\n' +
        '         article_jenis aj on aj.id = a.jenis_id\n' +
        'WHERE\n' +
        '    a.id = $1\n',
      values: [articleId],
    };

    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('article tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = ShortService;
