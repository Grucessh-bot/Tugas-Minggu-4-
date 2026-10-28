import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { formatPrice, getCategoryByValue } from "../../data/catalog";
import styles from "./ProductCard.module.css";

const fallbackImage = `${import.meta.env.BASE_URL}product-placeholder.svg`;

function ProductCard({ product }) {
  const category = getCategoryByValue(product.kategori);
  const detailPath = `/produk/${product.id}`;

  function handleImageError(event) {
    if (event.currentTarget.dataset.fallbackApplied !== "true") {
      event.currentTarget.dataset.fallbackApplied = "true";
      event.currentTarget.src = fallbackImage;
    } else {
      event.currentTarget.hidden = true;
    }
  }

  return (
    <Card className={styles.card}>
      <CardActionArea
        aria-label={`Lihat detail ${product.nama_product}`}
        className={styles.imageLink}
        component={Link}
        to={detailPath}
      >
        <div className={styles.imageFrame}>
          <CardMedia
            alt={product.nama_product}
            className={styles.image}
            component="img"
            image={product.gambar_product || fallbackImage}
            loading="lazy"
            onError={handleImageError}
          />
          <span className={styles.imageArrow} aria-hidden="true">↗</span>
        </div>
      </CardActionArea>
      <CardContent
        className={styles.copy}
        sx={{ p: "17px", "&:last-child": { pb: "15px" } }}
      >
        <div className={styles.meta}>
          <span>{category?.label ?? "Produk"}</span>
          <span className={styles.productId}>#{String(product.id).padStart(2, "0")}</span>
        </div>
        <Typography className={styles.title} component="h3" variant="h6">
          <Link to={detailPath}>{product.nama_product}</Link>
        </Typography>
        <Typography className={styles.description} component="p" variant="body2">
          {product.deskripsi}
        </Typography>
        <div className={styles.cardFooter}>
          <Typography className={styles.price} component="strong" variant="subtitle1">
            {formatPrice(product.harga)}
          </Typography>
          <Button
            className={styles.detailLink}
            component={Link}
            to={detailPath}
            size="small"
            variant="text"
          >
            Detail <span aria-hidden="true">→</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
