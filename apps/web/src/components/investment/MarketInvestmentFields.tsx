import type { InvestmentFormErrors } from "./investmentForm";

interface MarketInvestmentFieldProps {
  purchasePrice: string;
  onPurchasePriceChange: (value: string) => void;
  purchaseDate: string;
  onPurchaseDateChange: (value: string) => void;
  errors: InvestmentFormErrors;
}

function MarketInvestmentFields({
  purchasePrice,
  onPurchasePriceChange,
  purchaseDate,
  onPurchaseDateChange,
  errors,
}: MarketInvestmentFieldProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="purchase-price"
          className="pl-2 text-sm font-extralight text-stone-700"
        >
          Purchase Price
        </label>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-stone-500">
            ₺
          </span>

          <input
            id="purchase-price"
            type="number"
            min="0"
            step="0.01"
            value={purchasePrice}
            onChange={(event) => onPurchasePriceChange(event.target.value)}
            placeholder="0.00"
            className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-9 pr-4 font-mono text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
          />
        </div>

        {errors.purchasePrice && (
          <span className="text-sm text-red-500">{errors.purchasePrice}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="purchase-date"
          className="pl-2 text-sm font-extralight text-stone-700"
        >
          Purchase Date
        </label>

        <input
          id="purchase-date"
          type="date"
          value={purchaseDate}
          onChange={(event) => onPurchaseDateChange(event.target.value)}
          className="rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-500"
        />

        {errors.purchaseDate && (
          <span className="text-xs text-red-500">{errors.purchaseDate}</span>
        )}
      </div>
    </div>
  );
}

export default MarketInvestmentFields;
