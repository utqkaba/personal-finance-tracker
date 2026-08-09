import type { Expense } from "../types/expense";

export function getCurrentMonthExpenses(expenses: Expense[]) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getFullYear() === currentYear &&
      expenseDate.getMonth() === currentMonth
    );
  });
}

export function getTotalExpenses(expenses: Expense[]) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function getExpensesWithoutSubscriptions(expenses: Expense[]) {
  return expenses.filter((expense) => expense.category !== "Subscription");
}
