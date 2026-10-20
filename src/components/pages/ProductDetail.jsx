import { Link, useParams } from "react-router-dom";
import products from "../../data/Product";
import { formatPrice, getCategoryByValue } from "../../data/catalog";
import NotFound from "./NotFound";
import styles from "./ProductPages.module.css";

const fallbackImage = `${import.meta.env.BASE_URL}product-placeholder.svg`;

function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((item) => String(item.id) === productId);

  if (!product) {
    return <NotFound message="Produk yang kamu cari tidak ditemukan." />;
  }

  const category = getCategoryByValue(product.kategori);

  return (
    <section className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link to="/">Beranda</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/kategori/${category.slug}`}>{category.label}</Link>
        <span aria-hidden="true">/</span>
        <span>{product.nama_product}</span>
      </div>
      <div className={styles.detail}>
        <div className={styles.imageFrame}>
          <img
            alt={product.nama_product}
            onError={(event) => {
              if (event.currentTarget.dataset.fallbackApplied !== "true") {
                event.currentTarget.dataset.fallbackApplied = "true";
                event.currentTarget.src = fallbackImage;
              } else {
                event.currentTarget.hidden = true;
              }
            }}
            src={product.gambar_product || fallbackImage}
          />
          <span className={styles.imageCaption}>PILIHAN PAJRY TECH</span>
        </div>
        <div className={styles.info}>
          <p className={styles.eyebrow}>{category.label} <span>·</span> KODE {String(product.id).padStart(3, "0")}</p>
          <h1>{product.nama_product}</h1>
          <p className={styles.description}>{product.deskripsi}</p>
          <p className={styles.price}>{formatPrice(product.harga)}</p>
          <div className={styles.rule} />
          <p className={styles.stock}><span aria-hidden="true" />Pilihan dari katalog Pajry Tech</p>
          <Link className={styles.contact} to={`/kategori/${category.slug}`}>
            Lihat produk serupa <span aria-hidden="true">→</span>
          </Link>
          <p className={styles.note}>Jelajahi produk lain dalam kategori yang sama.</p>
          <Link className={styles.backLink} to={`/kategori/${category.slug}`}>← Kembali ke {category.label}</Link>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
