import type { InvestmentFormErrors } from "./investmentForm";

interface TermDepositFieldsProps {
  interestRate: string;
  onInterestRateChange: (value: string) => void;
  maturityDate: string;
  onMaturityDateChange: (value: string) => void;
  errors: InvestmentFormErrors;
}

function TermDepositFields({
  interestRate,
  onInterestRateChange,
  maturityDate,
  onMaturityDateChange,
  errors,
}: TermDepositFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="interest-rate"
          className="pl-2 text-sm font-extralight text-stone-700"
        >
          Interest Rate
        </label>

        <div className="relative">
          <input
            id="interest-rate"
            type="number"
            min="0"
            step="0.01"
            value={interestRate}
            onChange={(event) => onInterestRateChange(event.target.value)}
            placeholder="39"
            className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-4 pr-9 font-mono text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
          />

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-500">
            %
          </span>
        </div>

        {errors.interestRate && (
          <span className="text-xs text-red-500">{errors.interestRate}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="maturity-date"
          className="pl-2 text-sm font-extralight text-stone-700"
        >
          Maturity Date
        </label>

        <input
          id="maturity-date"
          type="date"
          value={maturityDate}
          onChange={(event) => onMaturityDateChange(event.target.value)}
          className="rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-500"
        />

        {errors.maturityDate && (
          <span className="text-xs text-red-500">{errors.maturityDate}</span>
        )}
      </div>
    </div>
  );
}

export default TermDepositFields;
