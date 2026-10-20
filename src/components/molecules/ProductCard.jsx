import { Link } from "react-router-dom";
import { formatPrice, getCategoryByValue } from "../../data/catalog";
import styles from "./ProductCard.module.css";

const fallbackImage = "/product-placeholder.svg";

function ProductCard({ product }) {
  const category = getCategoryByValue(product.kategori);

  function handleImageError(event) {
    if (event.currentTarget.dataset.fallbackApplied !== "true") {
      event.currentTarget.dataset.fallbackApplied = "true";
      event.currentTarget.src = fallbackImage;
    } else {
      event.currentTarget.hidden = true;
    }
  }

  return (
    <article className={styles.card}>
      <Link
        aria-label={`Lihat detail ${product.nama_product}`}
        className={styles.imageLink}
        to={`/produk/${product.id}`}
      >
        <div className={styles.imageFrame}>
          <img
            alt={product.nama_product}
            className={styles.image}
            loading="lazy"
            onError={handleImageError}
            src={product.gambar_product || fallbackImage}
          />
          <span className={styles.imageArrow} aria-hidden="true">↗</span>
        </div>
      </Link>
      <div className={styles.copy}>
        <div className={styles.meta}>
          <span>{category?.label ?? "Produk"}</span>
          <span className={styles.productId}>#{String(product.id).padStart(2, "0")}</span>
        </div>
        <h3 className={styles.title}>
          <Link to={`/produk/${product.id}`}>{product.nama_product}</Link>
        </h3>
        <p className={styles.description}>{product.deskripsi}</p>
        <div className={styles.cardFooter}>
          <strong>{formatPrice(product.harga)}</strong>
          <Link className={styles.detailLink} to={`/produk/${product.id}`}>
            Detail <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
