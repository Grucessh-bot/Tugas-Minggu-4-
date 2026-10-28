import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../molecules/ProductCard";
import ProductSearch from "../molecules/ProductSearch";
import products from "../../data/Product";
import { getCategoryBySlug } from "../../data/catalog";
import NotFound from "./NotFound";
import styles from "./Category.module.css";

function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  const [search, setSearch] = useState("");

  if (!category) {
    return <NotFound message="Kategori produk ini tidak tersedia." />;
  }

  const categoryProducts = products.filter((product) => product.kategori === category.value);
  const query = search.trim().toLocaleLowerCase("id-ID");
  const visibleProducts = categoryProducts.filter((product) => (
    `${product.nama_product} ${product.deskripsi}`.toLocaleLowerCase("id-ID").includes(query)
  ));

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
        <span className={styles.resultCount}>
          {query ? `${visibleProducts.length} hasil` : `${categoryProducts.length} produk`}
        </span>
      </header>
      <div className={styles.search}>
        <ProductSearch label={`Cari ${category.label.toLocaleLowerCase("id-ID")}`} onChange={setSearch} value={search} />
      </div>
      {visibleProducts.length > 0 ? (
        <div className={styles.productGrid}>
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>{query ? "Produk tidak ditemukan" : "Belum ada produk"}</h2>
          <p>
            {query
              ? "Coba kata kunci lain untuk mencari dalam kategori ini."
              : "Produk pada kategori ini akan segera hadir."}
          </p>
        </div>
      )}
    </section>
  );
}

export default CategoryPage;
