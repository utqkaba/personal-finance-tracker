import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useExpenseStore } from "../../stores/expenseStore";
import { getCategoryExpenses } from "../../utils/expenseUtils";

function CategoryPieChart() {
  const expenses = useExpenseStore((state) => state.expenses);

  const categoryExpenses = getCategoryExpenses(expenses);

  const chartData = Object.entries(categoryExpenses).map(
    ([category, amount]) => ({
      category,
      amount,
    }),
  );

  return (
    <section className="rounded-xl bg-stone-100 p-6 shadow-lg">
      <h2 className="mb-4 text-lg font-medium text-stone-900">
        Spending by Category
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {chartData.map((entry) => (
                <Cell key={entry.category} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default CategoryPieChart;
