const ClientError = require('../exceptions/ClientError');
const InvariantError = require('../exceptions/InvariantError');
const AuthorizationError = require('../exceptions/AuthorizationError');
const { fs } = require('../config');
const mapDBToArticleModel = ({
  id,
  judul,
  gambar_url,
  created_at,
  jenis,
  harga,
  updated_at,
}) => ({
  id,
  judul,
  gambarUrl: gambar_url,
  jenis,
  harga,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapDBToArticleDetailModel = ({
  id,
  judul,
  deskripsi,
  gambar_url,
  created_at,
  jenis,
  harga,
  updated_at,
  tenggat,
}) => ({
  id,
  judul,
  deskripsi,
  gambarUrl: gambar_url,
  jenis,
  harga,
  createdAt: created_at,
  updatedAt: updated_at,
  tenggat,
});

const errorHandler = (error, h) => {
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
  return response;
};

const validateAdmin = async (token) => {
  const parsedToken = token.split(' ')[1];
  try {
    var userData = await fs.auth().verifyIdToken(parsedToken);
  } catch (error) {
    throw new AuthorizationError(error.message);
  }
  if (userData.uid !== 'bBWpeRswZyPn5j0SKEiQ28Pz84W2') {
    throw new AuthorizationError('anda tidak punya akses untuk fungsi admin');
  }
};

const validateUser = async (uid, token) => {
  const parsedToken = token.split(' ')[1];
  try {
    var userData = await fs.auth().verifyIdToken(parsedToken);
  } catch (error) {
    throw new AuthorizationError(error.message);
  }
  if (uid !== userData.uid) {
    throw new AuthorizationError('user tidak valid');
  }
};
module.exports = {
  mapDBToArticleModel,
  mapDBToArticleDetailModel,
  errorHandler,
  validateUser,
  validateAdmin,
};
