import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Expense } from "../types/expense";

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set) => ({
      expenses: [],

      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, expense],
        })),
    }),
    {
      name: "expense-store",
    },
  ),
);
