import Icon from "./Icon";
import {
  CATEGORY_COLORS,
  formatCurrency,
  formatMonth,
  monthKey,
  shortCurrencyFormatter,
} from "../data/finance";

function SummaryCard({ title, amount, detail, icon, variant }) {
  return (
    <article className={`summary-card ${variant}`}>
      <div className="summary-top">
        <span className="summary-icon"><Icon name={icon} size={19} /></span>
        <span className="summary-detail">{detail}</span>
      </div>
      <p className="summary-title">{title}</p>
      <p className="summary-amount">{typeof amount === "number" ? formatCurrency(amount) : amount}</p>
    </article>
  );
}

function MonthlyOverview({ transactions, selectedMonth }) {
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 5 + index, 1);
    const key = monthKey(date);
    const entries = transactions.filter((transaction) => transaction.date.startsWith(key));
    return {
      date,
      income: entries.reduce((total, item) => total + (item.type === "income" ? item.amount : 0), 0),
      expense: entries.reduce((total, item) => total + (item.type === "expense" ? item.amount : 0), 0),
    };
  });
  const maxAmount = Math.max(...months.flatMap(({ income, expense }) => [income, expense]), 1);

  return (
    <section className="panel overview-panel" id="insights" aria-labelledby="overview-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">GAMBARAN UMUM</p>
          <h2 id="overview-title">Arus keuangan</h2>
        </div>
        <span className="chart-legend">
          <span className="legend-dot income-dot" />Masuk
          <span className="legend-dot expense-dot" />Keluar
        </span>
      </div>

      <div className="chart" role="img" aria-label="Grafik perbandingan pemasukan dan pengeluaran selama enam bulan">
        <div className="chart-y-labels" aria-hidden="true">
          <span>{shortCurrencyFormatter.format(maxAmount)}</span>
          <span>{shortCurrencyFormatter.format(maxAmount / 2)}</span>
          <span>Rp0</span>
        </div>
        <div className="chart-content">
          <div className="chart-gridlines" aria-hidden="true"><span /><span /><span /></div>
          <div className="chart-bars">
            {months.map(({ date, income, expense }) => (
              <div className="chart-month" key={monthKey(date)}>
                <div className="bar-pair">
                  <span
                    className="bar income-bar"
                    style={{ height: `${Math.max((income / maxAmount) * 100, income > 0 ? 4 : 0)}%` }}
                    title={`Pemasukan ${formatCurrency(income)}`}
                  />
                  <span
                    className="bar expense-bar"
                    style={{ height: `${Math.max((expense / maxAmount) * 100, expense > 0 ? 4 : 0)}%` }}
                    title={`Pengeluaran ${formatCurrency(expense)}`}
                  />
                </div>
                <span className="chart-month-label">{formatMonth(date, { month: "short" })}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryBreakdown({ selectedMonth, transactions }) {
  const categories = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((totals, transaction) => {
      totals[transaction.category] = (totals[transaction.category] ?? 0) + transaction.amount;
      return totals;
    }, {});
  const rankedCategories = Object.entries(categories)
    .sort((first, second) => second[1] - first[1])
    .slice(0, 4);
  const total = rankedCategories.reduce((sum, [, amount]) => sum + amount, 0);

  return (
    <section className="panel category-panel" aria-labelledby="category-title">
      <div className="panel-heading">
        <div><p className="eyebrow">KE MANA UANGNYA?</p><h2 id="category-title">Pengeluaran</h2></div>
        <span className="period-tag">{formatMonth(selectedMonth, { month: "short" })}</span>
      </div>
      {rankedCategories.length > 0 ? (
        <div className="category-list">
          {rankedCategories.map(([category, amount]) => {
            const color = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Lainnya;
            return (
              <div className="category-row" key={category}>
                <div className="category-copy">
                  <span className="category-name">
                    <span className="category-dot" style={{ backgroundColor: color }} />{category}
                  </span>
                  <span className="category-amount">{formatCurrency(amount)}</span>
                </div>
                <div className="category-track">
                  <span style={{ width: `${total ? (amount / total) * 100 : 0}%`, backgroundColor: color }} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="category-empty">Belum ada pengeluaran yang tercatat bulan ini.</p>
      )}
    </section>
  );
}

function Summary({
  balance,
  isCurrentMonth,
  monthTransactions,
  onMonthChange,
  savingRate,
  selectedMonth,
  summary,
  transactions,
}) {
  return (
    <>
      <section className="balance-card" aria-label="Ringkasan saldo">
        <div className="balance-copy">
          <span className="balance-label"><span className="balance-indicator" />TOTAL SALDO</span>
          <p className="balance-amount">{formatCurrency(balance)}</p>
          <span className="balance-caption">Sisa keuangan {formatMonth(selectedMonth)}</span>
        </div>
        <div className="balance-decoration" aria-hidden="true"><span /><span /><span /></div>
        <div className="balance-month-control">
          <button type="button" aria-label="Bulan sebelumnya" onClick={() => onMonthChange(-1)}>
            <Icon name="left" size={17} />
          </button>
          <span>{formatMonth(selectedMonth)}</span>
          <button
            type="button"
            aria-label="Bulan berikutnya"
            disabled={isCurrentMonth}
            onClick={() => onMonthChange(1)}
          >
            <Icon name="right" size={17} />
          </button>
        </div>
      </section>

      <section className="summary-grid" aria-label={`Ringkasan ${formatMonth(selectedMonth)}`}>
        <SummaryCard detail="Bulan terpilih" icon="arrowDown" title="Pemasukan" amount={summary.income} variant="income-summary" />
        <SummaryCard detail="Bulan terpilih" icon="arrowUp" title="Pengeluaran" amount={summary.expense} variant="expense-summary" />
        <SummaryCard detail="Dari pemasukan" icon="spark" title="Tingkat tabungan" amount={`${savingRate}%`} variant="saving-summary" />
      </section>

      <div className="dashboard-grid">
        <MonthlyOverview selectedMonth={selectedMonth} transactions={transactions} />
        <CategoryBreakdown selectedMonth={selectedMonth} transactions={monthTransactions} />
      </div>
    </>
  );
}

export default Summary;
