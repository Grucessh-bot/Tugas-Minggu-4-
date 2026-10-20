const categories = [
  {
    slug: "smartphone",
    value: "handphone",
    label: "Smartphone",
    navLabel: "Smartphone",
    description: "Temukan ponsel untuk tetap terhubung dan berkarya.",
  },
  {
    slug: "laptop",
    value: "laptop",
    label: "Laptop",
    navLabel: "Laptop",
    description: "Performa andal untuk kerja, belajar, dan hiburan.",
  },
  {
    slug: "komputer",
    value: "komputer",
    label: "Komputer",
    navLabel: "Komputer",
    description: "Racik setup desktop yang pas untuk kebutuhanmu.",
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryByValue(value) {
  return categories.find((category) => category.value === value);
}

export function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

const catalog = { categories };
export default catalog;
