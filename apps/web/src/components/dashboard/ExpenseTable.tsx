import { useExpenseStore } from "../../stores/expenseStore";

function formatDateWithDay(dateString: string): string {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const dayName = date.toLocaleDateString("tr-TR", { weekday: "long" });

  return `${formattedDate} - ${dayName}`;
}

function ExpenseTable() {
  const expenses = useExpenseStore((state) => state.expenses);

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
                <td className="py-2 pl-1 text-sm text-stone-600">
                  {formatDateWithDay(expense.date)}
                </td>

                <td className="py-2 text-sm text-stone-900">
                  {expense.description}
                </td>

                <td className="py-2">
                  <span className="rounded-xl bg-stone-200 px-5 py-1 text-xs text-stone-700">
                    {expense.category}
                  </span>
                </td>

                <td className="py-2 pr-2 text-right font-mono text-stone-900">
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
