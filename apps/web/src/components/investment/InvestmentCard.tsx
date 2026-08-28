import { useState } from "react";
import {
  Trash2,
  TrendingUp,
  TrendingDown,
  Landmark,
  RefreshCw,
  History,
} from "lucide-react";

import DeleteInvestmentModal from "./DeleteInvestmentModal";
import UpdateValueModal from "./UpdateValueModal";
import ValueHistoryModal from "./ValueHistoryModal";

import { useInvestmentStore } from "../../stores/investmentStore";
import type { Investment } from "../../types/investment";
import {
  isTermDeposit,
  getInvestedAmount,
  getCurrentValue,
  getProfitLoss,
  getProfitLossPercent,
} from "../../utils/investmentCalculations";

interface InvestmentCardProps {
  investment: Investment;
}

function InvestmentCard({ investment }: InvestmentCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const removeInvestment = useInvestmentStore(
    (state) => state.removeInvestment,
  );

  const {
    name,
    amount,
    purchaseDate,
    purchasePrice,
    maturityDate,
    interestRate,
  } = investment;

  const termDeposit = isTermDeposit(investment);
  const investedAmount = getInvestedAmount(investment);
  const currentValue = getCurrentValue(investment);
  const profitLoss = getProfitLoss(investment);
  const profitLossPercent = getProfitLossPercent(investment);
  const isProfit = profitLoss >= 0;

  const handleDelete = () => {
    removeInvestment(investment.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <article className="flex flex-col gap-6 rounded-2xl border border-stone-200 bg-white p-5 transition-shadow duration-300 hover:shadow-md md:flex-row md:items-center">
        {/* Identity */}
        <div className="flex items-center gap-3 md:w-52 md:shrink-0">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              termDeposit
                ? "bg-indigo-50 text-indigo-600"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            {termDeposit ? (
              <Landmark size={16} strokeWidth={1.8} />
            ) : (
              <TrendingUp size={16} strokeWidth={1.8} />
            )}
          </span>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-stone-900">
              {name}
            </h3>

            <p className="text-xs font-extralight text-stone-400">
              {termDeposit ? "Term Deposit" : "Market"}
            </p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-stone-300 md:block" />

        {/* Stats */}
        <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-extralight text-stone-400">
              Current Value
            </p>

            <p className="mt-1 font-mono text-sm text-stone-900">
              ₺
              {currentValue.toLocaleString("tr-TR", {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div>
            <p className="text-xs font-extralight text-stone-400">Invested</p>

            <p className="mt-1 font-mono text-sm text-stone-700">
              ₺
              {investedAmount.toLocaleString("tr-TR", {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div>
            <p className="text-xs font-extralight text-stone-400">
              Profit / Loss
            </p>

            <p
              className={`mt-1 flex items-center gap-1 font-mono text-sm ${
                isProfit ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {isProfit ? (
                <TrendingUp size={13} strokeWidth={2} />
              ) : (
                <TrendingDown size={13} strokeWidth={2} />
              )}
              {isProfit ? "+" : ""}
              {profitLossPercent.toFixed(2)}%
            </p>
          </div>

          {/* <div>
            <p className="text-xs font-extralight text-stone-400">Updates</p>

            <p className="mt-1 font-mono text-sm text-stone-700">
              {investment.valueHistory.length}
            </p>
          </div> */}

          <div>
            <p className="text-xs font-extralight text-stone-400">
              {termDeposit ? "Maturity Date" : "Quantity"}
            </p>

            <p className="mt-1 font-mono text-sm text-stone-700">
              {termDeposit ? maturityDate : amount}
            </p>
          </div>

          {termDeposit ? (
            <div>
              <p className="text-xs font-extralight text-stone-400">
                Interest Rate
              </p>

              <p className="mt-1 font-mono text-sm text-stone-700">
                {interestRate}%
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-extralight text-stone-400">
                Purchase Price
              </p>

              <p className="mt-1 font-mono text-sm text-stone-700">
                {purchasePrice}
              </p>
            </div>
          )}
        </div>

        <div className="hidden h-10 w-px bg-stone-300 md:block" />

        {/* Actions */}
        <div className="flex items-center gap-1 md:shrink-0">
          <button
            type="button"
            onClick={() => setIsUpdateModalOpen(true)}
            aria-label={`Update value for ${name}`}
            className="cursor-pointer rounded-full p-2 text-stone-400 transition-transform duration-500 hover:scale-105 hover:bg-stone-100 hover:text-blue-600"
          >
            <RefreshCw size={16} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={() => setIsHistoryModalOpen(true)}
            aria-label={`View history for ${name}`}
            className="cursor-pointer rounded-full p-2 text-stone-400 transition-transform duration-500 hover:scale-105 hover:bg-stone-100 hover:text-stone-700"
          >
            <History size={16} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            aria-label={`Delete ${name}`}
            className="cursor-pointer rounded-full p-2 text-stone-400 transition-transform duration-500 hover:scale-105 hover:bg-stone-100 hover:text-red-500"
          >
            <Trash2 size={16} strokeWidth={1.8} />
          </button>
        </div>
      </article>

      <DeleteInvestmentModal
        isOpen={isDeleteModalOpen}
        investmentName={name}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      <UpdateValueModal
        isOpen={isUpdateModalOpen}
        investment={investment}
        onClose={() => setIsUpdateModalOpen(false)}
      />

      <ValueHistoryModal
        isOpen={isHistoryModalOpen}
        investment={investment}
        onClose={() => setIsHistoryModalOpen(false)}
      />
    </>
  );
}

export default InvestmentCard;
