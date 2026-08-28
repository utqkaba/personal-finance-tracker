import { useState } from "react";
import { X } from "lucide-react";

import { useInvestmentStore } from "../../stores/investmentStore";
import { isTermDeposit } from "../../utils/investmentCalculations";
import type { Investment } from "../../types/investment";

interface UpdateValueModalProps {
  isOpen: boolean;
  investment: Investment | null;
  onClose: () => void;
}

const getInitialDate = () => new Date().toISOString().split("T")[0];

function UpdateValueModal({
  isOpen,
  investment,
  onClose,
}: UpdateValueModalProps) {
  const [date, setDate] = useState(getInitialDate());
  const [value, setValue] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({
    date: "",
    value: "",
    interestRate: "",
    amount: "",
  });

  const addInvestmentValue = useInvestmentStore(
    (state) => state.addInvestmentValue,
  );
  const updateInvestment = useInvestmentStore(
    (state) => state.updateInvestment,
  );

  if (!isOpen || !investment) {
    return null;
  }

  const termDeposit = isTermDeposit(investment);

  const resetForm = () => {
    setDate(getInitialDate());
    setValue("");
    setInterestRate("");
    setAmount("");
    setErrors({ date: "", value: "", interestRate: "", amount: "" });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = { date: "", value: "", interestRate: "", amount: "" };

    if (!date) {
      newErrors.date = "Date is required.";
    }

    if (!value || Number(value) <= 0) {
      newErrors.value = "Value must be greater than 0.";
    }

    if (termDeposit) {
      if (!interestRate || Number(interestRate) <= 0) {
        newErrors.interestRate = "Interest rate must be greater than 0.";
      }
    } else {
      if (!amount || Number(amount) <= 0) {
        newErrors.amount = "Amount must be greater than 0.";
      }
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    addInvestmentValue(investment.id, { date, value: Number(value) });

    updateInvestment({
      ...investment,
      ...(termDeposit
        ? { interestRate: Number(interestRate) }
        : { amount: Number(amount) }),
    });

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
      <div className="w-full max-w-sm rounded-xl border border-stone-200 bg-stone-100 p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl text-shadow-stone-300 text-shadow-lg text-stone-900">
              Update Value
            </h2>

            <p className="mt-1 text-sm font-extralight italic text-stone-500">
              Record a new value for {investment.name}.
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
          <div className="flex flex-col gap-2">
            <label
              htmlFor="value-date"
              className="pl-2 text-sm font-extralight text-stone-700"
            >
              Date
            </label>

            <input
              id="value-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-500"
            />

            {errors.date && (
              <span className="text-xs text-red-500">{errors.date}</span>
            )}
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="flex flex-col col-span-3 gap-2">
              <label
                htmlFor="value-amount"
                className="pl-2 text-sm font-extralight text-stone-700"
              >
                Current Value
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-stone-500">
                  ₺
                </span>

                <input
                  id="value-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-9 pr-4 font-mono text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
                />
              </div>

              {errors.value && (
                <span className="text-xs text-red-500">{errors.value}</span>
              )}
            </div>

            {termDeposit ? (
              <div className="flex flex-col col-span-2 gap-2">
                <label
                  htmlFor="update-interest-rate"
                  className="pl-2 text-sm font-extralight text-stone-700"
                >
                  Interest Rate
                </label>

                <div className="relative">
                  <input
                    id="update-interest-rate"
                    type="number"
                    min="0"
                    step="0.01"
                    value={interestRate}
                    onChange={(event) => setInterestRate(event.target.value)}
                    placeholder="39"
                    className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-4 pr-9 font-mono text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-500">
                    %
                  </span>
                </div>

                {errors.interestRate && (
                  <span className="text-xs text-red-500">
                    {errors.interestRate}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex flex-col col-span-2 gap-2">
                <label
                  htmlFor="update-amount"
                  className="pl-2 text-sm font-extralight text-stone-700"
                >
                  Quantity
                </label>

                <input
                  id="update-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0"
                  className="w-full rounded-full border border-stone-300 bg-white px-4 py-2.5 font-mono text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
                />

                {errors.amount && (
                  <span className="text-xs text-red-500">{errors.amount}</span>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer rounded-full bg-linear-to-r from-stone-100 to-stone-300 px-6 py-2.5 text-sm font-extralight text-stone-600 transition-transform duration-500 hover:scale-105"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-full bg-linear-to-r from-blue-100 to-blue-700 px-7 py-2.5 text-sm font-extralight text-white transition-transform duration-500 hover:scale-105"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateValueModal;
