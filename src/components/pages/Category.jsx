import { Link, useParams } from "react-router-dom";
import ProductCard from "../molecules/ProductCard";
import products from "../../data/Product";
import { getCategoryBySlug } from "../../data/catalog";
import NotFound from "./NotFound";
import styles from "./Category.module.css";

function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return <NotFound message="Kategori produk ini tidak tersedia." />;
  }

  const categoryProducts = products.filter((product) => product.kategori === category.value);

  return (
    <section className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link to="/">Beranda</Link><span aria-hidden="true">/</span><span>{category.label}</span>
      </div>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>KOLEKSI PAJRY TECH</p>
          <h1>{category.label}</h1>
          <p className={styles.description}>{category.description}</p>
        </div>
        <span className={styles.resultCount}>{categoryProducts.length} produk</span>
      </header>
      {categoryProducts.length > 0 ? (
        <div className={styles.productGrid}>
          {categoryProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>Belum ada produk</h2>
          <p>Produk pada kategori ini akan segera hadir.</p>
        </div>
      )}
    </section>
  );
}

export default CategoryPage;
