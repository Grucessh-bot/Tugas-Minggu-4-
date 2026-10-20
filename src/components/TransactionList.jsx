import Icon from "./Icon";
import TransactionItem from "./TransactionItem";

function TransactionList({ transactions, onDelete, limit }) {
  const visibleTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <section className="panel transactions-panel" id="transactions" aria-labelledby="transactions-title">
      <div className="panel-heading transaction-heading">
        <div>
          <p className="eyebrow">CATATAN TERBARU</p>
          <h2 id="transactions-title">Transaksi</h2>
        </div>
        <span className="transaction-count">
          {limit && transactions.length > limit ? `${limit} terbaru dari ${transactions.length}` : `${transactions.length} transaksi`}
        </span>
      </div>
      {visibleTransactions.length > 0 ? (
        <div className="transaction-table-wrap">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>TRANSAKSI</th>
                <th>KATEGORI</th>
                <th>TANGGAL</th>
                <th className="amount-heading">JUMLAH</th>
                <th><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody>
              {visibleTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  onDelete={onDelete}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon"><Icon name="receipt" size={23} /></span>
          <strong>Belum ada transaksi</strong>
          <p>Yuk, catat pemasukan atau pengeluaran pertamamu.</p>
        </div>
      )}
    </section>
  );
}

export default TransactionList;
