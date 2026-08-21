import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Expense } from "../types/expense";

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  removeAllExpenses: (ids: string[]) => void;
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set) => ({
      expenses: [],

      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, expense],
        })),

      updateExpense: (expense) =>
        set((state) => ({
          expenses: state.expenses.map((item) =>
            item.id === expense.id ? expense : item,
          ),
        })),

      removeExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((item) => item.id !== id),
        })),

      removeAllExpenses: (ids) =>
        set((state) => ({
          expenses: state.expenses.filter((item) => !ids.includes(item.id)),
        })),
    }),
    {
      name: "expense-store",
    },
  ),
);
