import { Link } from "react-router-dom";
import styles from "./ProductPages.module.css";

function NotFound({ message = "Halaman yang kamu cari tidak tersedia." }) {
  return (
    <section className={styles.notFound}>
      <span className={styles.notFoundCode}>404</span>
      <h1>Halaman tidak ditemukan</h1>
      <p>{message}</p>
      <Link className={styles.homeLink} to="/">Kembali ke semua produk</Link>
    </section>
  );
}

export default NotFound;
