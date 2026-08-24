import { TrendingUp, Percent } from "lucide-react";

type InvestmentFormType = "market" | "term-deposit";

const OPTIONS = [
  { value: "market" as const, label: "Market Investment", Icon: TrendingUp },
  { value: "term-deposit" as const, label: "Term Deposit", Icon: Percent },
];

interface InvestmentTypeSelectorProps {
  value: InvestmentFormType;
  onChange: (type: InvestmentFormType) => void;
}

function InvestmentTypeSelector({
  value,
  onChange,
}: InvestmentTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-extralight text-stone-700">
        Investment Type
      </label>

      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map(({ value: optionValue, label, Icon }) => (
          <button
            key={optionValue}
            type="button"
            onClick={() => onChange(optionValue)}
            className={`flex flex-col items-center gap-2 cursor-pointer rounded-xl border px-4 py-3 transition-all duration-300 ${
              value === optionValue
                ? "border-blue-600 bg-linear-to-br from-blue-50 to-blue-100 text-blue-700"
                : "border-stone-300 bg-white text-stone-500 hover:border-stone-400"
            }`}
          >
            <Icon size={20} strokeWidth={1.6} />
            <span className="text-sm font-extralight">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default InvestmentTypeSelector;
