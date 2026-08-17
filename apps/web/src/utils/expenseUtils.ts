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

export function getMonthlyExpenses(expenses: Expense[]) {
  const currentDate = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - (5 - index),
      1,
    );

    const year = date.getFullYear();
    const month = date.getMonth();

    const total = expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);

        return (
          expenseDate.getFullYear() === year && expenseDate.getMonth() === month
        );
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      month: date.toLocaleString("en-US", {
        month: "short",
      }),
      total,
    };
  });
}

export function getCategoryExpenses(expenses: Expense[]) {
  const currentMonthExpenses = getCurrentMonthExpenses(expenses);

  return currentMonthExpenses.reduce<Record<string, number>>(
    (categories, expense) => {
      categories[expense.category] =
        (categories[expense.category] ?? 0) + expense.amount;

      return categories;
    },
    {},
  );
}
