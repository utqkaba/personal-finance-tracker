import { useExpenseStore } from "../../stores/expenseStore";
import { getMonthlyExpenses } from "../../utils/expenseUtils";

function MonthlyExpenseChart() {
  const expenses = useExpenseStore((state) => state.expenses);

  const monthlyExpenses = getMonthlyExpenses(expenses);

  return (
    <section className="rounded-xl bg-stone-100 p-6 shadow-lg">
      <h2 className="mb-4 text-lg font-medium text-stone-900">
        Monthly Expenses
      </h2>

      <div className="h-80 rounded-xl border border-dashed border-stone-300">
        {/* Bar chart */}
      </div>
    </section>
  );
}

export default MonthlyExpenseChart;
