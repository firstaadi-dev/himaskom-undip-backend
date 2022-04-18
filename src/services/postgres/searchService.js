const { Pool } = require('pg');
const { mapDBToArticleModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');
class SearchService {
  constructor() {
    this.pool = new Pool();
  }

  async searchArticleByTitle(searchQuery) {
    const keyword = '%' + searchQuery + '%';
    const query = {
      text:
        'SELECT\n' +
        '        a.id, a.judul, a.deskripsi, a.gambar_url, a.created_at, aj.jenis_post as jenis, a.harga, a.updated_at, a.tenggat\n' +
        'FROM\n' +
        '        articles as a\n' +
        'INNER JOIN\n' +
        '        article_jenis AS aj on aj.id = a.jenis_id\n' +
        'WHERE\n' +
        '        lower(a.judul)\n' +
        'LIKE\n' +
        '        lower($1)' +
        'ORDER BY\n' +
        '        a.created_at DESC\n',
      values: [keyword],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('article tidak ditemukan');
    }
    return result.rows.map(mapDBToArticleModel);
  }
}
module.exports = SearchService;
