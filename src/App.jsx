import { Route, Routes } from "react-router-dom";
import Header from "./components/organisms/Header";
import CategoryPage from "./components/pages/Category";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import ProductDetail from "./components/pages/ProductDetail";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kategori/:categorySlug" element={<CategoryPage />} />
          <Route path="/produk/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className={styles.footer}>
        <span className={styles.footerBrand}>PAJRY<span>TECH</span></span>
        <span>Teknologi pilihan, untuk kebutuhan sehari-hari.</span>
        <span>© 2026 Pajry Tech</span>
      </footer>
    </div>
  );
}

export default App;
