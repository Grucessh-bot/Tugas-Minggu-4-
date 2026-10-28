import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../molecules/ProductCard";
import ProductSearch from "../molecules/ProductSearch";
import StoreHero from "../molecules/StoreHero";
import products from "../../data/Product";
import catalog from "../../data/catalog";
import styles from "./Home.module.css";

function Home() {
  const [search, setSearch] = useState("");
  const query = search.trim().toLocaleLowerCase("id-ID");
  const matchingProducts = products.filter((product) => {
    const category = catalog.categories.find((item) => item.value === product.kategori);
    return [
      product.nama_product,
      product.deskripsi,
      category?.label ?? "",
    ].some((value) => value.toLocaleLowerCase("id-ID").includes(query));
  });
  const visibleProducts = query ? matchingProducts : products.slice(0, 8);

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
            <h2 id="featured-title" className={styles.sectionTitle}>
              {query ? "Hasil pencarian" : "Produk pilihan"}
            </h2>
          </div>
          {!query && (
            <Link className={styles.viewAll} to="/kategori/smartphone">
              Lihat kategori <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
        <div className={styles.search}>
          <ProductSearch onChange={setSearch} value={search} />
        </div>
        <div className={styles.productGrid}>
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        {query && visibleProducts.length === 0 && (
          <p className={styles.emptySearch} role="status">Tidak ada produk yang cocok dengan “{search.trim()}”.</p>
        )}
        {!query && <p className={styles.featuredCount}>Menampilkan 8 dari {products.length} produk</p>}
      </section>
    </div>
  );
}

export default Home;
