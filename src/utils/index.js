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
}) => ({
  id,
  judul,
  deskripsi,
  gambarUrl: gambar_url,
  jenis,
  harga,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = { mapDBToArticleModel, mapDBToArticleDetailModel };
