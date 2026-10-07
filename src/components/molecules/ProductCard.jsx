import "./ProductCard.css";

const ProductCard = (props) => {
  return (
    <div className="product-card">
      <img src={props.gambar ?? "not-available.jpeg"} alt={props.title ?? "product"} />
      <h4 className="title">{props.title}</h4>
      <h5 className="category">{props.category}</h5>
      <p className="description">{props.description}</p>
      {props.price && <p className="price">Rp {props.price.toLocaleString("id-ID")}</p>}
    </div>
  );
};

export default ProductCard;