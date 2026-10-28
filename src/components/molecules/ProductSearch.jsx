import TextField from "@mui/material/TextField";

function ProductSearch({ value, onChange, label = "Cari produk" }) {
  return (
    <TextField
      fullWidth
      label={label}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Contoh: MacBook, Samsung, laptop"
      type="search"
      value={value}
      slotProps={{
        htmlInput: {
          "aria-label": label,
        },
      }}
    />
  );
}

export default ProductSearch;
