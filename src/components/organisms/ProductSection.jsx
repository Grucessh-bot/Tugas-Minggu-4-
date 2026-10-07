import ProductCard from '../molecules/ProductCard';
import allProducts from '../../data/Product';
import './ProductSection.css';

const ProductsSection = () => {
  const handphones = allProducts.filter((product) => product.kategori === 'handphone');
  const laptops = allProducts.filter((product) => product.kategori === 'laptop');
  const komputers = allProducts.filter((product) => product.kategori === 'komputer');

  return (
    <section id="products">
      <h2 className="title-section">-- SMARTPHONE --</h2>
      <div className="product-container">
        {handphones.map((product) => (
          <ProductCard
            key={product.id}
            gambar={product.gambar_product}
            title={product.nama_product}
            description={product.deskripsi}
            category={product.kategori}
            price={product.harga}
          />
        ))}
      </div>

      <h2 className="title-section" style={{ marginTop: '40px' }}>-- LAPTOP --</h2>
      <div className="product-container">
        {laptops.map((product) => (
          <ProductCard
            key={product.id}
            gambar={product.gambar_product}
            title={product.nama_product}
            description={product.deskripsi}
            category={product.kategori}
            price={product.harga}
          />
        ))}
      </div>

      <h2 className="title-section" style={{ marginTop: '40px' }}>-- COMPUTERS --</h2>
      <div className="product-container">
        {komputers.map((product) => (
          <ProductCard
            key={product.id}
            gambar={product.gambar_product}
            title={product.nama_product}
            description={product.deskripsi}
            category={product.kategori}
            price={product.harga}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;