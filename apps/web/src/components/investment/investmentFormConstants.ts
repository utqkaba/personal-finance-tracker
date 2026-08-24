export const INITIAL_ERRORS = {
  name: "",
  amount: "",
  purchaseDate: "",
  purchasePrice: "",
  interestRate: "",
  maturityDate: "",
};

export type InvestmentFormErrors = typeof INITIAL_ERRORS;

export const INVESTMENT_TYPE_OPTIONS = [
  {
    value: "market" as const,
    label: "Market Investment",
    icon: "TrendingUp",
  },
  {
    value: "term-deposit" as const,
    label: "Term Deposit",
    icon: "Percent",
  },
];
