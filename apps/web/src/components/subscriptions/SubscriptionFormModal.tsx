import { useState } from "react";
import { X } from "lucide-react";

import { useSubscriptionStore } from "../../stores/subscriptionStore";
import type { Subscription } from "../../types/subscription";

interface SubscriptionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription?: Subscription;
}

const getInitialDate = () => new Date().toISOString().split("T")[0];

function SubscriptionFormModal({
  isOpen,
  onClose,
  subscription,
}: SubscriptionFormModalProps) {
  const [name, setName] = useState(subscription?.name ?? "");
  const [amount, setAmount] = useState(subscription?.amount.toString() ?? "");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    subscription?.billingCycle ?? "monthly",
  );
  const [nextBillingDate, setNextBillingDate] = useState(
    subscription?.nextBillingDate ?? getInitialDate(),
  );
  const [errors, setErrors] = useState({
    name: "",
    amount: "",
    billingCycle: "",
    nextBillingDate: "",
  });

  const addSubscription = useSubscriptionStore(
    (state) => state.addSubscription,
  );

  const updateSubscription = useSubscriptionStore(
    (state) => state.updateSubscription,
  );

  const isEditMode = Boolean(subscription);

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setName("");
    setAmount("");
    setBillingCycle("monthly");
    setNextBillingDate(getInitialDate());

    setErrors({
      name: "",
      amount: "",
      billingCycle: "",
      nextBillingDate: "",
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      name: "",
      amount: "",
      billingCycle: "",
      nextBillingDate: "",
    };

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!amount || Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!billingCycle) {
      newErrors.billingCycle = "Please select a billing cycle.";
    }

    if (!nextBillingDate) {
      newErrors.nextBillingDate = "Next billing date is required.";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      return;
    }

    const subscriptionData = {
      id: subscription?.id ?? crypto.randomUUID(),
      name: name.trim(),
      amount: Number(amount),
      billingCycle,
      nextBillingDate,
    };

    if (subscription) {
      updateSubscription(subscriptionData);
    } else {
      addSubscription(subscriptionData);
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
      <div className="w-full max-w-md rounded-xl border border-stone-200 bg-stone-100 p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl text-shadow-stone-300 text-shadow-lg text-stone-900">
              {isEditMode ? "Edit Subscription" : "Add Subscription"}
            </h2>

            <p className="mt-1 text-sm font-extralight italic text-stone-500">
              {isEditMode
                ? "Update your subscription details."
                : "Add a new recurring expense."}
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
              htmlFor="subscription-name"
              className="text-sm font-extralight text-stone-700"
            >
              Name
            </label>

            <input
              id="subscription-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Spotify"
              className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
            />

            {errors.name && (
              <span className="text-xs text-red-500">{errors.name}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="subscription-amount"
                className="text-sm font-extralight text-stone-700"
              >
                Amount
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-stone-500">
                  ₺
                </span>

                <input
                  id="subscription-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-9 pr-4 font-mono text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
                />
              </div>

              {errors.amount && (
                <span className="text-xs text-red-500">{errors.amount}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="subscription-cycle"
                className="text-sm font-extralight text-stone-700"
              >
                Billing Cycle
              </label>

              <select
                id="subscription-cycle"
                value={billingCycle}
                onChange={(event) =>
                  setBillingCycle(event.target.value as "monthly" | "yearly")
                }
                className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-500"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>

              {errors.billingCycle && (
                <span className="text-xs text-red-500">
                  {errors.billingCycle}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="subscription-date"
              className="text-sm font-extralight text-stone-700"
            >
              Next Billing Date
            </label>

            <input
              id="subscription-date"
              type="date"
              value={nextBillingDate}
              onChange={(event) => setNextBillingDate(event.target.value)}
              className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-500"
            />

            {errors.nextBillingDate && (
              <span className="text-xs text-red-500">
                {errors.nextBillingDate}
              </span>
            )}
          </div>

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
              {isEditMode ? "Save Changes" : "Add Subscription"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubscriptionFormModal;
