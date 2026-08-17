import { useExpenseStore } from "../../stores/expenseStore";
import { getCategoryExpenses } from "../../utils/expenseUtils";

function CategoryPieChart() {
  const expenses = useExpenseStore((state) => state.expenses);

  const categoryExpenses = getCategoryExpenses(expenses);

  return (
    <section className="rounded-xl bg-stone-100 p-6 shadow-lg">
      <h2 className="mb-4 text-lg font-medium text-stone-900">
        Spending by Category
      </h2>

      <div className="h-80 rounded-xl border border-dashed border-stone-300">
        {/* Pie chart */}
      </div>
    </section>
  );
}

export default CategoryPieChart;
