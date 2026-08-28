export const INITIAL_ERRORS = {
  name: "",
  amount: "",
  purchasePrice: "",
  purchaseDate: "",
  interestRate: "",
  maturityDate: "",
};

export type InvestmentFormErrors = typeof INITIAL_ERRORS;

interface ValidateParams {
  investmentType: "market" | "term-deposit";
  name: string;
  amount: string;
  purchasePrice: string;
  purchaseDate: string;
  interestRate: string;
  maturityDate: string;
}

export function validateInvestmentForm(
  params: ValidateParams,
): InvestmentFormErrors {
  const errors = { ...INITIAL_ERRORS };

  if (!params.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!params.amount || Number(params.amount) <= 0) {
    errors.amount = "Amount must be greater than 0.";
  }

  if (params.investmentType === "market") {
    if (!params.purchasePrice || Number(params.purchasePrice) <= 0) {
      errors.purchasePrice = "Purchase price must be greater than 0.";
    }
    if (!params.purchaseDate) {
      errors.purchaseDate = "Purchase date is required.";
    }
  }

  if (params.investmentType === "term-deposit") {
    if (!params.interestRate || Number(params.interestRate) <= 0) {
      errors.interestRate = "Interest rate must be greater than 0.";
    }
    if (!params.maturityDate) {
      errors.maturityDate = "Maturity date is required.";
    }
  }

  return errors;
}

export function hasErrors(errors: InvestmentFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}
