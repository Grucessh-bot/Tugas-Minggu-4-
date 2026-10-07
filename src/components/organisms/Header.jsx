import ProductNavigation from "../molecules/ProductNavigation";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="inner-header">
        <h1 className="logo">
          251130206-Pajry Ananda Lingga<span>.</span>
        </h1>
        <ProductNavigation />
      </div>
    </header>
  );
};

export default Header;