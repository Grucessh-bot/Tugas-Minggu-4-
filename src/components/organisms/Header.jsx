import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { Link, NavLink, useLocation } from "react-router-dom";
import navigation from "../../data/catalog";
import styles from "./Header.module.css";

function Header() {
  const { pathname } = useLocation();

  return (
    <AppBar className={styles.header} component="header" position="sticky" elevation={0}>
      <Toolbar className={styles.inner} disableGutters>
        <Link className={styles.brand} to="/" aria-label="Pajry Tech, beranda">
          <span className={styles.brandMark}>P</span>
          <span>PAJRY<span className={styles.brandAccent}>TECH</span></span>
        </Link>
        <nav className={styles.nav} aria-label="Kategori produk">
          <Button
            className={`${styles.navLink}${pathname === "/" ? ` ${styles.active}` : ""}`}
            component={NavLink}
            end
            to="/"
            color="inherit"
            sx={{ minHeight: 76, borderRadius: 0 }}
          >
            Semua produk
          </Button>
          {navigation.categories.map((category) => {
            const isActive = pathname === `/kategori/${category.slug}`;
            return (
              <Button
                className={`${styles.navLink}${isActive ? ` ${styles.active}` : ""}`}
                component={NavLink}
                key={category.slug}
                to={`/kategori/${category.slug}`}
                color="inherit"
                sx={{ minHeight: 76, borderRadius: 0 }}
              >
                {category.navLabel}
              </Button>
            );
          })}
        </nav>
        <Button
          className={styles.contactLink}
          component={Link}
          to="/#produk-pilihan"
          variant="outlined"
          color="secondary"
          endIcon={<span aria-hidden="true">↗</span>}
        >
          Produk pilihan
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
