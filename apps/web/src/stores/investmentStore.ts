import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Investment, InvestmentValue } from "../types/investment";

interface InvestmentStore {
  investments: Investment[];
  addInvestment: (investment: Investment) => void;
  updateInvestment: (investment: Investment) => void;
  removeInvestment: (id: string) => void;
  addInvestmentValue: (
    investmentId: string,
    valueEntry: InvestmentValue,
  ) => void;
}

export const useInvestmentStore = create<InvestmentStore>()(
  persist(
    (set) => ({
      investments: [],

      addInvestment: (investment) =>
        set((state) => ({
          investments: [...state.investments, investment],
        })),

      updateInvestment: (investment) =>
        set((state) => ({
          investments: state.investments.map((item) =>
            item.id === investment.id ? investment : item,
          ),
        })),

      removeInvestment: (id) =>
        set((state) => ({
          investments: state.investments.filter((item) => item.id !== id),
        })),

      addInvestmentValue: (investmentId, valueEntry) =>
        set((state) => ({
          investments: state.investments.map((investment) =>
            investment.id === investmentId
              ? {
                  ...investment,
                  valueHistory: [...investment.valueHistory, valueEntry],
                }
              : investment,
          ),
        })),
    }),
    {
      name: "investment-store",
    },
  ),
);
