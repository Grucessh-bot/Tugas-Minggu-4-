import { useEffect, useMemo, useState } from "react";
import Header, { DashboardHeader } from "./components/Header";
import Summary from "./components/Summary";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import {
  isValidTransaction,
  monthKey,
  readStoredData,
  STORAGE_KEY,
} from "./data/finance";
import "./App.css";

function App() {
  const [initialData] = useState(readStoredData);
  const [transactions, setTransactions] = useState(initialData.transactions);
  const [selectedMonth, setSelectedMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [storageMessage, setStorageMessage] = useState(initialData.message);

  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key !== STORAGE_KEY) return;
      if (event.newValue === null) {
        setTransactions([]);
        return;
      }

      try {
        const parsedTransactions = JSON.parse(event.newValue);
        if (!Array.isArray(parsedTransactions) || !parsedTransactions.every(isValidTransaction)) {
          throw new Error("Format data transaksi tidak sesuai.");
        }
        setTransactions(parsedTransactions);
        setStorageMessage("");
      } catch (error) {
        console.error("Tidak dapat menyinkronkan data transaksi:", error);
        setStorageMessage("Data dari tab lain tidak dapat dibaca. Perubahan lokal tetap tersedia.");
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const monthTransactions = useMemo(
    () => transactions
      .filter((transaction) => transaction.date.startsWith(monthKey(selectedMonth)))
      .sort((first, second) => second.date.localeCompare(first.date)),
    [selectedMonth, transactions],
  );
  const summary = useMemo(() => monthTransactions.reduce(
    (totals, transaction) => {
      totals[transaction.type] += transaction.amount;
      return totals;
    },
    { income: 0, expense: 0 },
  ), [monthTransactions]);
  const balance = summary.income - summary.expense;
  const savingRate = summary.income ? Math.round((balance / summary.income) * 100) : 0;
  const isCurrentMonth = monthKey(selectedMonth) === monthKey(new Date());

  function persistTransactions(nextTransactions) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTransactions));
      setStorageMessage("");
    } catch (error) {
      console.error("Tidak dapat menyimpan data transaksi:", error);
      setStorageMessage("Perubahan belum tersimpan di perangkat ini. Coba periksa pengaturan penyimpanan browser.");
    }
  }

  function addTransaction(transaction) {
    const nextTransactions = [transaction, ...transactions];
    setTransactions(nextTransactions);
    persistTransactions(nextTransactions);
    setIsDialogOpen(false);
  }

  function deleteTransaction(id) {
    const nextTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(nextTransactions);
    persistTransactions(nextTransactions);
  }

  function changeMonth(offset) {
    setSelectedMonth((month) => new Date(month.getFullYear(), month.getMonth() + offset, 1));
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="main-content" id="dashboard">
        <DashboardHeader onAddTransaction={() => setIsDialogOpen(true)} />
        <Summary
          balance={balance}
          isCurrentMonth={isCurrentMonth}
          monthTransactions={monthTransactions}
          onMonthChange={changeMonth}
          savingRate={savingRate}
          selectedMonth={selectedMonth}
          summary={summary}
          transactions={transactions}
        />

        {storageMessage && <p className="storage-message" role="status">{storageMessage}</p>}

        <TransactionList onDelete={deleteTransaction} transactions={monthTransactions} />
        <footer className="page-footer">
          <span>Catatan keuangan yang baik dimulai dari kebiasaan sederhana.</span>
          <span>Data tersimpan di perangkatmu <span aria-hidden="true">·</span> Dompetku</span>
        </footer>
      </main>

      {isDialogOpen && (
        <TransactionForm
          onClose={() => setIsDialogOpen(false)}
          onSave={addTransaction}
        />
      )}
    </div>
  );
}

export default App;
