import { useState } from "react";
import Icon from "./Icon";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  localDateString,
} from "../data/finance";

function TransactionForm({ onClose, onSave }) {
  const [type, setType] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [date, setDate] = useState(localDateString());
  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function handleTypeChange(event) {
    const nextType = event.target.value;
    setType(nextType);
    setCategory(nextType === "income" ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const numericAmount = Number(amount);
    if (!title.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0 || !date) return;

    onSave({
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title: title.trim(),
      amount: numericAmount,
      type,
      category,
      date,
    });
  }

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="transaction-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className="dialog-heading">
          <div><p className="eyebrow">TRANSAKSI BARU</p><h2 id="dialog-title">Catat keuangan</h2></div>
          <button className="dialog-close" onClick={onClose} type="button" aria-label="Tutup formulir"><Icon name="close" /></button>
        </div>
        <form className="transaction-form" onSubmit={handleSubmit}>
          <fieldset className="type-switch">
            <legend className="sr-only">Jenis transaksi</legend>
            <label className={type === "expense" ? "selected expense-choice" : ""}>
              <input checked={type === "expense"} name="type" onChange={handleTypeChange} type="radio" value="expense" />
              Pengeluaran
            </label>
            <label className={type === "income" ? "selected income-choice" : ""}>
              <input checked={type === "income"} name="type" onChange={handleTypeChange} type="radio" value="income" />
              Pemasukan
            </label>
          </fieldset>
          <label className="form-field">
            <span>Nama transaksi</span>
            <input autoFocus maxLength={60} onChange={(event) => setTitle(event.target.value)} placeholder="Contoh: Belanja mingguan" required value={title} />
          </label>
          <label className="form-field">
            <span>Jumlah (rupiah)</span>
            <div className="amount-input">
              <span>Rp</span>
              <input min="1" onChange={(event) => setAmount(event.target.value)} placeholder="0" required step="any" type="number" value={amount} />
            </div>
          </label>
          <div className="form-row">
            <label className="form-field">
              <span>Kategori</span>
              <select onChange={(event) => setCategory(event.target.value)} value={category}>
                {categories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="form-field">
              <span>Tanggal</span>
              <input onChange={(event) => setDate(event.target.value)} required type="date" value={date} />
            </label>
          </div>
          <div className="dialog-actions">
            <button className="cancel-button" onClick={onClose} type="button">Batal</button>
            <button className="submit-button" type="submit"><Icon name="plus" size={18} />Simpan transaksi</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TransactionForm;
