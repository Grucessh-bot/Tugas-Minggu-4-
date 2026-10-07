import Icon from "./Icon";

function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#dashboard" aria-label="Dompetku, ke ringkasan">
        <span className="brand-mark"><Icon name="wallet" size={21} /></span>
        <span>dompet<span className="brand-accent">ku</span></span>
      </a>

      <p className="sidebar-label">MENU UTAMA</p>
      <nav className="sidebar-nav" aria-label="Navigasi utama">
        <a className="nav-link active" href="#dashboard"><Icon name="grid" />Ringkasan</a>
        <a className="nav-link" href="#transactions"><Icon name="list" />Transaksi</a>
        <a className="nav-link" href="#insights"><Icon name="chart" />Laporan</a>
      </nav>

      <div className="sidebar-tip">
        <span className="tip-icon"><Icon name="spark" size={18} /></span>
        <strong>Langkah kecil, hasil besar.</strong>
        <p>Catat setiap transaksi untuk mengenal kebiasaan finansialmu.</p>
        <a href="#transactions">Mulai mencatat <span aria-hidden="true">→</span></a>
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
