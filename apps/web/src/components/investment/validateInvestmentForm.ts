import {
  INITIAL_ERRORS,
  type InvestmentFormErrors,
} from "./investmentFormConstants";

interface ValidateParams {
  investmentType: "market" | "term-deposit";
  name: string;
  amount: string;
  purchaseDate: string;
  purchasePrice: string;
  interestRate?: string;
  maturityDate?: string;
}

export function validateInvestmentForm(
  params: ValidateParams,
): InvestmentFormErrors {
  const errors = { ...INITIAL_ERRORS };

  if (!params.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!params.amount || Number(params.amount) <= 0) {
    errors.amount = "Amount is required.";
  }

  if (params.investmentType === "market") {
    if (!params.purchaseDate) {
      errors.purchaseDate = "Purchase date is required.";
    }

    if (!params.purchasePrice || Number(params.purchasePrice) <= 0) {
      errors.purchasePrice = "Purchase price is required.";
    }
  }

  if (params.investmentType === "term-deposit") {
    if (!params.interestRate || Number(params.interestRate) <= 0) {
      errors.interestRate = "Interest rate is required.";
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
