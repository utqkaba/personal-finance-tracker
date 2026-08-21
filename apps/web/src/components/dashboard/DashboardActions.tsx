import { useState } from "react";

import AddExpenseModal from "../expense/ExpenseFormModal";

import { useExpenseStore } from "../../stores/expenseStore";
import { useSubscriptionStore } from "../../stores/subscriptionStore";

import {
  getCurrentMonthExpenses,
  getExpensesWithoutSubscriptions,
  getTotalExpenses,
} from "../../utils/expenseUtils";
import { getMonthlySubscriptionCost } from "../../utils/subscriptionUtils";

function DashboardActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const expenses = useExpenseStore((state) => state.expenses);
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);

  const currentMonthExpenses = getCurrentMonthExpenses(expenses);

  const totalExpenses = getTotalExpenses(currentMonthExpenses);

  const monthlySubscriptionCost = getMonthlySubscriptionCost(subscriptions);

  const totalThisMonth = totalExpenses + monthlySubscriptionCost;

  const expensesWithoutSubscriptions =
    getExpensesWithoutSubscriptions(currentMonthExpenses);

  const totalWithoutSubscriptions = getTotalExpenses(
    expensesWithoutSubscriptions,
  );

  return (
    <>
      <section className="flex items-center justify-between rounded-xl bg-stone-100 p-6 shadow-lg">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-2xl bg-linear-to-r from-blue-100 to-blue-700 px-7 py-2 font-extralight text-white transition-transform duration-500 hover:scale-105"
        >
          + Add Expense
        </button>

        <div className="flex gap-12 px-5">
          <div>
            <p className="text-sm text-stone-500">This Month</p>
            <p className="text-xl font-mono text-stone-900">
              {totalThisMonth.toLocaleString("tr-TR")}₺
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
