import { Link } from "react-router-dom";
import ProductCard from "../molecules/ProductCard";
import StoreHero from "../molecules/StoreHero";
import products from "../../data/Product";
import catalog from "../../data/catalog";
import styles from "./Home.module.css";

function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className={styles.home}>
      <StoreHero />

      <section className={styles.categorySection} aria-labelledby="category-title">
        <div className={styles.sectionTopline}>
          <div>
            <p className={styles.eyebrow}>PILIH SESUAI KEBUTUHAN</p>
            <h2 id="category-title" className={styles.sectionTitle}>Jelajahi kategori</h2>
          </div>
          <span className={styles.categoryCount}>03 kategori</span>
        </div>
        <div className={styles.categoryGrid}>
          {catalog.categories.map((category, index) => (
            <Link
              className={`${styles.categoryCard} ${styles[`category${index + 1}`]}`}
              key={category.slug}
              to={`/kategori/${category.slug}`}
            >
              <span className={styles.categoryNumber}>0{index + 1}</span>
              <span>
                <strong>{category.label}</strong>
                <small>{category.description}</small>
              </span>
              <span className={styles.categoryArrow} aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.productSection} id="produk-pilihan" aria-labelledby="featured-title">
        <div className={styles.sectionTopline}>
          <div>
            <p className={styles.eyebrow}>PILIHAN PAJRY TECH</p>
            <h2 id="featured-title" className={styles.sectionTitle}>Produk pilihan</h2>
          </div>
          <Link className={styles.viewAll} to="/kategori/smartphone">Lihat kategori <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.productGrid}>
          {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}

export default Home;
