import { useState } from "react";

import AddExpenseModal from "../expense/AddExpenseModal";

import { useExpenseStore } from "../../stores/expenseStore";
import {
  getCurrentMonthExpenses,
  getExpensesWithoutSubscriptions,
  getTotalExpenses,
} from "../../utils/expenseUtils";

function DashboardActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const expenses = useExpenseStore((state) => state.expenses);

  const currentMonthExpenses = getCurrentMonthExpenses(expenses);
  const totalExpenses = getTotalExpenses(currentMonthExpenses);
  const expensesWithoutSubscriptions =
    getExpensesWithoutSubscriptions(currentMonthExpenses);
  const totalWithoutSubscriptions = getTotalExpenses(
    expensesWithoutSubscriptions,
  );

  return (
    <>
      <section className="flex items-center justify-between rounded-xl shadow-lg p-6 bg-stone-100">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-2xl px-7 py-2 font-extralight text-white bg-linear-to-r from-blue-100 to-blue-700 hover:scale-105 transition-transform duration-500"
        >
          + Add Expense
        </button>

        <div className="flex gap-12 px-5">
          <div>
            <p className="text-sm text-stone-500">This Month</p>
            <p className="text-xl font-mono text-stone-900">
              {totalExpenses.toLocaleString("tr-TR")}₺
            </p>
          </div>

          <div>
            <p className="text-sm text-stone-500">Excl. Subscriptions</p>
            <p className="text-xl font-mono text-stone-900">
              {totalWithoutSubscriptions.toLocaleString("tr-TR")}₺
            </p>
          </div>
        </div>
      </section>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default DashboardActions;
