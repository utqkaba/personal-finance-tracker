export interface Investment {
  id: string;
  name: string;
  amount: number;
  purchaseDate: string;
  purchasePrice: number;
  interestRate?: number;
  maturityDate?: string;
  valueHistory: InvestmentValue[];
}

export interface InvestmentValue {
  date: string;
  value: number;
}
