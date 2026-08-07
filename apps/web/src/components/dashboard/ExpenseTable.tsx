const expenses = [
  {
    id: 1,
    date: "07 Aug 2026",
    description: "Market Shopping",
    category: "Food",
    amount: 850,
  },
  {
    id: 2,
    date: "06 Aug 2026",
    description: "Spotify Premium",
    category: "Subscription",
    amount: 80,
  },
  {
    id: 3,
    date: "05 Aug 2026",
    description: "Gas Station",
    category: "Transport",
    amount: 1250,
  },
  {
    id: 4,
    date: "04 Aug 2026",
    description: "Electricity Bill",
    category: "Bills",
    amount: 940,
  },
];

function ExpenseTable() {
  return (
    <section className="rounded-xl shadow-lg p-6 bg-stone-100">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-lg font-medium text-stone-900">Recent Expenses</h2>

        <span className="italic rounded-xl bg-stone-200 px-5 py-1 text-xs text-stone-600">
          {expenses.length} Expenses
        </span>
      </div>

      <div className="overflow-x-auto px-3">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-stone-900 text-left">
              <th className="pb-3 text-xs font-medium uppercase tracking-wider text-stone-500">
                Date
              </th>

              <th className="pb-3 text-xs font-medium uppercase tracking-wider text-stone-500">
                Description
              </th>

              <th className="pb-3 text-xs font-medium uppercase tracking-wider text-stone-500">
                Category
              </th>

              <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-stone-500">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-b border-stone-200 transition-colors hover:bg-stone-100"
              >
                <td className="py-4 text-sm text-stone-600 pl-1">
                  {expense.date}
                </td>

                <td className="py-4 text-sm text-stone-900">
                  {expense.description}
                </td>

                <td className="py-4">
                  <span className="rounded-xl bg-stone-200 px-5 py-1 text-xs text-stone-700">
                    {expense.category}
                  </span>
                </td>

                <td className="py-4 text-right font-mono text-stone-900 pr-2">
                  ₺{expense.amount.toLocaleString("tr-TR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExpenseTable;
