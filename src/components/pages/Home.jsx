import Header from "../organisms/Header";
import ProductsSection from "../organisms/ProductSection";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <ProductsSection />
      </main>
    </>
  );
};

export default Home;