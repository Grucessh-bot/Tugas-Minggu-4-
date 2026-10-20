import { Link, NavLink } from "react-router-dom";
import navigation from "../../data/catalog";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} to="/" aria-label="Pajry Tech, beranda">
          <span className={styles.brandMark}>P</span>
          <span>PAJRY<span className={styles.brandAccent}>TECH</span></span>
        </Link>
        <nav className={styles.nav} aria-label="Kategori produk">
          <NavLink className={({ isActive }) => `${styles.navLink}${isActive ? ` ${styles.active}` : ""}`} end to="/">
            Semua produk
          </NavLink>
          {navigation.categories.map((category) => (
            <NavLink
              className={({ isActive }) => `${styles.navLink}${isActive ? ` ${styles.active}` : ""}`}
              key={category.slug}
              to={`/kategori/${category.slug}`}
            >
              {category.navLabel}
            </NavLink>
          ))}
        </nav>
        <Link className={styles.contactLink} to="/#produk-pilihan">
          Produk pilihan <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
