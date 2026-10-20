# Pajry Tech

Katalog produk teknologi berbasis React yang menampilkan smartphone, laptop, dan komputer. Aplikasi ini dibuat sebagai proyek multi-halaman dengan React Router, parameter URL dinamis, CSS Modules, dan styled-components.

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Periksa build produksi dengan:

```bash
npm run build
npm run preview
```

## Halaman

- `/` — Beranda katalog, navigasi kategori, dan produk pilihan.
- `/kategori/:categorySlug` — Daftar produk pada kategori smartphone, laptop, atau komputer.
- `/produk/:productId` — Detail produk berdasarkan ID pada URL.
- Rute dan kategori yang tidak dikenal menampilkan halaman 404 dengan tautan kembali ke beranda.

## Fitur

- Navigasi kategori menggunakan React Router tanpa reload penuh.
- Validasi kategori dan ID produk dari URL sebelum menampilkan halaman.
- Kartu produk dengan tautan ke halaman detail.
- Layout responsif untuk desktop, tablet, dan ponsel.
- Gambar produk memakai placeholder lokal jika gambar utama tidak dapat dimuat.

## Teknologi

- React dan Vite
- React Router
- CSS Modules untuk layout, komponen, dan halaman
- styled-components untuk hero beranda

## Struktur penting

- `src/App.jsx` — konfigurasi route dan layout aplikasi.
- `src/data/Product.jsx` — data katalog.
- `src/data/catalog.js` — pemetaan kategori dan format harga.
- `src/components/organisms/Header.jsx` — navigasi kategori.
- `src/components/pages/` — halaman beranda, kategori, detail, dan 404.
- `src/components/molecules/StoreHero.jsx` — hero beranda dengan styled-components.
