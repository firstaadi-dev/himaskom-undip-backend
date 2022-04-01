const autobindr = require('autobindr');
const ClientError = require('../../exceptions/ClientError');

class JenisHandler {
  constructor(service) {
    this.service = service;
    autobindr(this);
  }

  async getArticleByJenisHandler(request, h) {
    try {
      const { jenis } = request.params;
      const jenisList = {
        umum: 0,
        event_hm: 1,
        event_am: 2,
        event_ukm: 3,
        sistore: 4,
        beasiswa: 5,
        prestasi: 6,
        akademik: 7,
        karir_loker: 8,
        karir_magang: 9,
        lomba_akademik: 10,
        lomba_nonakademik: 11,
      };
      const jenisId = jenisList[jenis];
      const result = await this.service.getArticleByJenis(jenisId);
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
    }
  }
}

module.exports = JenisHandler;
