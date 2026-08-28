import type { Investment, InvestmentValue } from "../types/investment";

export function isTermDeposit(investment: Investment): boolean {
  return investment.interestRate !== undefined;
}

export function getInvestedAmount(investment: Investment): number {
  return isTermDeposit(investment)
    ? investment.amount
    : investment.amount * investment.purchasePrice;
}

export function getCurrentValue(investment: Investment): number {
  const lastEntry = investment.valueHistory[investment.valueHistory.length - 1];

  return lastEntry ? lastEntry.value : getInvestedAmount(investment);
}

export function getProfitLoss(investment: Investment): number {
  return getCurrentValue(investment) - getInvestedAmount(investment);
}

export function getProfitLossPercent(investment: Investment): number {
  const invested = getInvestedAmount(investment);

  if (invested === 0) {
    return 0;
  }

  return (getProfitLoss(investment) / invested) * 100;
}

export interface ValueHistoryEntryWithDelta extends InvestmentValue {
  delta: number;
  deltaPercent: number;
}

export function getValueHistoryWithDelta(
  investment: Investment,
): ValueHistoryEntryWithDelta[] {
  const baseline = getInvestedAmount(investment);

  return investment.valueHistory
    .map((entry, index) => {
      const previousValue =
        index === 0 ? baseline : investment.valueHistory[index - 1].value;

      const delta = entry.value - previousValue;
      const deltaPercent =
        previousValue === 0 ? 0 : (delta / previousValue) * 100;

      return { ...entry, delta, deltaPercent };
    })
    .reverse();
}
