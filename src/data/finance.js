export const STORAGE_KEY = "dompetku-transactions-v1";

export const INCOME_CATEGORIES = ["Gaji", "Freelance", "Investasi", "Bonus", "Lainnya"];
export const EXPENSE_CATEGORIES = [
  "Makanan",
  "Transportasi",
  "Tagihan",
  "Belanja",
  "Hiburan",
  "Kesehatan",
  "Pendidikan",
  "Lainnya",
];

export const CATEGORY_COLORS = {
  Gaji: "#557a46",
  Freelance: "#9aa83f",
  Investasi: "#72a78d",
  Bonus: "#bf9b54",
  Makanan: "#eea773",
  Transportasi: "#83a7c2",
  Tagihan: "#9f91bd",
  Belanja: "#cf8b9b",
  Hiburan: "#8db5a2",
  Kesehatan: "#d19e78",
  Pendidikan: "#8492bd",
  Lainnya: "#abb1a8",
};

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const shortCurrencyFormatter = new Intl.NumberFormat("id-ID", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function formatMonth(date, options = { month: "long", year: "numeric" }) {
  return new Intl.DateTimeFormat("id-ID", options).format(date);
}

export function formatCurrency(amount) {
  return currencyFormatter.format(amount).replace(/\u00a0/g, " ");
}

function createSampleTransactions() {
  const today = new Date();
  const thisMonth = monthKey(today);
  const previousMonth = monthKey(new Date(today.getFullYear(), today.getMonth() - 1, 1));
  const day = (number) =>
    `${thisMonth}-${String(Math.min(number, today.getDate())).padStart(2, "0")}`;

  return [
    { id: "sample-1", title: "Gaji bulanan", category: "Gaji", type: "income", amount: 7200000, date: day(1) },
    { id: "sample-2", title: "Proyek desain", category: "Freelance", type: "income", amount: 1250000, date: day(3) },
    { id: "sample-3", title: "Belanja bulanan", category: "Belanja", type: "expense", amount: 685000, date: day(4) },
    { id: "sample-4", title: "Makan siang", category: "Makanan", type: "expense", amount: 58000, date: day(5) },
    { id: "sample-5", title: "Tagihan internet", category: "Tagihan", type: "expense", amount: 325000, date: `${previousMonth}-26` },
  ];
}

export function isValidTransaction(item) {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.category === "string" &&
    (item.type === "income" || item.type === "expense") &&
    Number.isFinite(item.amount) &&
    item.amount > 0 &&
    typeof item.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(item.date)
  );
}

export function readStoredData() {
  try {
    const savedTransactions = window.localStorage.getItem(STORAGE_KEY);
    if (savedTransactions === null) {
      return { transactions: createSampleTransactions(), message: "" };
    }

    const parsedTransactions = JSON.parse(savedTransactions);
    if (!Array.isArray(parsedTransactions) || !parsedTransactions.every(isValidTransaction)) {
      throw new Error("Format data transaksi tidak sesuai.");
    }
    return { transactions: parsedTransactions, message: "" };
  } catch (error) {
    console.error("Tidak dapat membaca data transaksi tersimpan:", error);
    return {
      transactions: createSampleTransactions(),
      message: "Data tersimpan tidak dapat dibaca. Transaksi baru tetap bisa dicatat.",
    };
  }
}
