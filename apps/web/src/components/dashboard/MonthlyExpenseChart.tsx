import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyExpenses}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              cursor={false}
              formatter={(value) =>
                `${Number(value).toLocaleString("tr-TR")} ₺`
              }
            />

            <Bar
              dataKey="total"
              fill="#F6E5CB"
              barSize={24}
              radius={[5, 5, 0, 0]}
              activeBar={{ fill: "#C4B7A2" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default MonthlyExpenseChart;
