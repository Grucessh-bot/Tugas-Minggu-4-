import Icon from "./Icon";
import { Link } from "react-router-dom";
import { formatCurrency } from "../data/finance";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function TransactionItem({ transaction, onDelete }) {
  return (
    <tr>
      <td>
        <div className="transaction-name">
          <span className={`transaction-icon ${transaction.type}`}>
            <Icon name={transaction.type === "income" ? "arrowDown" : "arrowUp"} size={17} />
          </span>
          <span>
            <Link className="transaction-detail-link" to={`/transaksi/${encodeURIComponent(transaction.id)}`}>
              <strong>{transaction.title}</strong>
            </Link>
            <small>{transaction.type === "income" ? "Pemasukan" : "Pengeluaran"}</small>
          </span>
        </div>
      </td>
      <td><span className="category-pill">{transaction.category}</span></td>
      <td className="transaction-date">
        {dateFormatter.format(new Date(`${transaction.date}T12:00:00`))}
      </td>
      <td className={`transaction-amount ${transaction.type}`}>
        {transaction.type === "income" ? "+" : "−"} {formatCurrency(transaction.amount)}
      </td>
      <td className="action-cell">
        <button
          className="delete-transaction"
          onClick={() => onDelete(transaction.id)}
          type="button"
          aria-label={`Hapus transaksi ${transaction.title}`}
          title="Hapus transaksi"
        >
          <Icon name="close" size={16} />
        </button>
      </td>
    </tr>
  );
}

export default TransactionItem;
