import { History, X } from "lucide-react";

import { getValueHistoryWithDelta } from "../../utils/investmentCalculations";
import type { Investment } from "../../types/investment";

interface ValueHistoryModalProps {
  isOpen: boolean;
  investment: Investment | null;
  onClose: () => void;
}

function ValueHistoryModal({
  isOpen,
  investment,
  onClose,
}: ValueHistoryModalProps) {
  if (!isOpen || !investment) {
    return null;
  }

  const entries = getValueHistoryWithDelta(investment);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
      <div className="w-full max-w-md rounded-xl border border-stone-200 bg-stone-100 p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-50 p-2 text-blue-600">
              <History size={18} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-lg font-medium text-stone-900">
                Value History
              </h2>

              <p className="text-xs font-extralight italic text-stone-500">
                {investment.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="cursor-pointer rounded-full p-2 text-stone-400 transition-transform duration-300 hover:scale-105 hover:bg-stone-200 hover:text-stone-800"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        {entries.length === 0 ? (
          <p className="py-8 text-center text-sm font-extralight italic text-stone-500">
            No value updates recorded yet.
          </p>
        ) : (
          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {entries.map((entry, index) => {
              const isProfit = entry.delta >= 0;

              return (
                <div
                  key={`${entry.date}-${index}`}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3"
                >
                  <span className="text-xs font-extralight text-stone-500">
                    {entry.date}
                  </span>

                  <div className="text-right">
                    <p className="font-mono text-sm text-stone-900">
                      ₺
                      {entry.value.toLocaleString("tr-TR", {
                        maximumFractionDigits: 2,
                      })}
                    </p>

                    <p
                      className={`text-xs font-extralight ${
                        isProfit ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {isProfit ? "+" : ""}
                      {entry.deltaPercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ValueHistoryModal;
