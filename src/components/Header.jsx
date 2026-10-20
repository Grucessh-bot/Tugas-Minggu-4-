import Icon from "./Icon";
import { NavLink, Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <Link className="brand" to="/" aria-label="Dompetku, ke ringkasan">
        <span className="brand-mark"><Icon name="wallet" size={21} /></span>
        <span>dompet<span className="brand-accent">ku</span></span>
      </Link>

      <p className="sidebar-label">MENU UTAMA</p>
      <nav className="sidebar-nav" aria-label="Navigasi utama">
        <NavLink aria-label="Ringkasan" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} end to="/">
          <Icon name="grid" /><span className="nav-label">Ringkasan</span>
        </NavLink>
        <NavLink aria-label="Transaksi" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/transaksi">
          <Icon name="list" /><span className="nav-label">Transaksi</span>
        </NavLink>
        <NavLink aria-label="Laporan" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/laporan">
          <Icon name="chart" /><span className="nav-label">Laporan</span>
        </NavLink>
      </nav>

      <div className="sidebar-tip">
        <span className="tip-icon"><Icon name="spark" size={18} /></span>
        <strong>Langkah kecil, hasil besar.</strong>
        <p>Catat setiap transaksi untuk mengenal kebiasaan finansialmu.</p>
        <Link to="/transaksi">Mulai mencatat <span aria-hidden="true">→</span></Link>
      </div>

      <div className="sidebar-profile">
        <span className="avatar">FN</span>
        <span className="profile-copy"><strong>Fajri</strong><span>Keuangan pribadi</span></span>
        <span className="profile-menu" aria-hidden="true">···</span>
      </div>
    </aside>
  );
}

function Header() {
  return <Sidebar />;
}

export function DashboardHeader({ onAddTransaction }) {
  return (
    <header className="page-header">
      <div className="page-greeting">
        <p className="eyebrow">RUANG FINANSIALMU</p>
        <h1>Kelola uang, <span>lebih tenang.</span></h1>
        <p>Hai, Fajri! Yuk, lihat kondisi keuanganmu.</p>
      </div>
      <button className="add-button" onClick={onAddTransaction} type="button">
        <Icon name="plus" size={19} />
        <span>Tambah transaksi</span>
      </button>
    </header>
  );
}

export default Header;
