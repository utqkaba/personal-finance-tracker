import { useState } from "react";
import { X } from "lucide-react";

import InvestmentTypeSelector from "./InvestmentTypeSelector";
import MarketInvestmentFields from "./MarketInvestmentFields";
import TermDepositFields from "./TermDepositFields";
import { INITIAL_ERRORS } from "./investmentFormConstants";
import { validateInvestmentForm, hasErrors } from "./validateInvestmentForm";

import { useInvestmentStore } from "../../stores/investmentStore";

interface InvestmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type InvestmentFormType = "market" | "term-deposit";

const getInitialDate = () => new Date().toISOString().split("T")[0];

function InvestmentFormModal({ isOpen, onClose }: InvestmentFormModalProps) {
  const [investmentType, setInvestmentType] =
    useState<InvestmentFormType>("market");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(getInitialDate());
  const [interestRate, setInterestRate] = useState("");
  const [maturityDate, setMaturityDate] = useState(getInitialDate());
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const addInvestment = useInvestmentStore((state) => state.addInvestment);

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setInvestmentType("market");
    setName("");
    setAmount("");
    setPurchasePrice("");
    setPurchaseDate(getInitialDate());
    setInterestRate("");
    setMaturityDate(getInitialDate());
    setErrors(INITIAL_ERRORS);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleTypeChange = (type: InvestmentFormType) => {
    setInvestmentType(type);
    setErrors(INITIAL_ERRORS);
  };

  const buildInvestmentPayload = () => ({
    id: crypto.randomUUID(),
    name: name.trim(),
    amount: Number(amount),
    purchaseDate,
    valueHistory: [
      {
        date: purchaseDate,
        value:
          investmentType === "market"
            ? Number(amount) * Number(purchasePrice)
            : Number(amount),
      },
    ],
    ...(investmentType === "market"
      ? { purchasePrice: Number(purchasePrice) }
      : { interestRate: Number(interestRate), maturityDate }),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = validateInvestmentForm({
      investmentType,
      name,
      amount,
      purchasePrice,
      purchaseDate,
      interestRate,
      maturityDate,
    });

    setErrors(newErrors);

    if (hasErrors(newErrors)) {
      return;
    }

    addInvestment(buildInvestmentPayload());
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
      <div className="w-full max-w-md rounded-lg border border-stone-200 bg-stone-100 p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl text-shadow-stone-300 text-shadow-lg text-stone-900">
              Add Investment
            </h2>

            <p className="mt-1 text-sm font-extralight italic text-stone-500">
              Add a new investment to your portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="cursor-pointer rounded-full p-2 text-stone-400 transition-transform duration-500 hover:scale-105 hover:bg-stone-200 hover:text-stone-800"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InvestmentTypeSelector
            value={investmentType}
            onChange={handleTypeChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="investment-name"
                className="text-sm font-extralight text-stone-700"
              >
                Name
              </label>

              <input
                id="investment-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={
                  investmentType === "market"
                    ? "e.g. THYAO"
                    : "e.g. Garanti Vadeli"
                }
                className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
              />

              {errors.name && (
                <span className="text-xs text-red-500">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="investment-amount"
                className="text-sm font-extralight text-stone-700"
              >
                {investmentType === "market" ? "Amount" : "Principal"}
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-stone-500">
                  {investmentType === "market" ? "" : "₺"}
                </span>

                <input
                  id="investment-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0.00"
                  className={`w-full rounded-xl border border-stone-300 bg-white py-2.5 pr-4 font-mono text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500 ${
                    investmentType === "term-deposit" ? "pl-9" : "pl-4"
                  }`}
                />
              </div>

              {errors.amount && (
                <span className="text-xs text-red-500">{errors.amount}</span>
              )}
            </div>
          </div>

          {investmentType === "market" ? (
            <MarketInvestmentFields
              purchasePrice={purchasePrice}
              onPurchasePriceChange={setPurchasePrice}
              purchaseDate={purchaseDate}
              onPurchaseDateChange={setPurchaseDate}
              errors={errors}
            />
          ) : (
            <TermDepositFields
              interestRate={interestRate}
              onInterestRateChange={setInterestRate}
              maturityDate={maturityDate}
              onMaturityDateChange={setMaturityDate}
              errors={errors}
            />
          )}

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer rounded-xl bg-linear-to-r from-stone-100 to-stone-300 px-6 py-2.5 text-sm font-extralight text-stone-600 transition-transform duration-500 hover:scale-105"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-linear-to-r from-blue-100 to-blue-700 px-7 py-2.5 text-sm font-extralight text-white transition-transform duration-500 hover:scale-105"
            >
              Add Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvestmentFormModal;
