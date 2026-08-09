import { create } from "zustand";

import type { Expense } from "../types/expense";

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],

  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, expense],
    })),
}));
