import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

import { useExpenseStore } from "../../stores/expenseStore";
import type { Expense } from "../../types/expense";

interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense?: Expense;
}

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Other",
];

const getInitialDate = () => new Date().toISOString().split("T")[0];

function ExpenseFormModal({ isOpen, onClose, expense }: ExpenseFormModalProps) {
  const [date, setDate] = useState(expense?.date ?? getInitialDate());
  const [description, setDescription] = useState(expense?.description ?? "");
  const [category, setCategory] = useState(expense?.category ?? "");
  const [amount, setAmount] = useState(expense?.amount.toString() ?? "");

  const [errors, setErrors] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  const isEditing = Boolean(expense);
  const addExpense = useExpenseStore((state) => state.addExpense);
  const updateExpense = useExpenseStore((state) => state.updateExpense);

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setDate(getInitialDate());
    setDescription("");
    setCategory("");
    setAmount("");

    setErrors({
      date: "",
      description: "",
      category: "",
      amount: "",
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      date: "",
      description: "",
      category: "",
      amount: "",
    };

    if (!date) {
      newErrors.date = "Date is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!category) {
      newErrors.category = "Please select a category.";
    }

    if (!amount || Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      return;
    }

    const expenseData = {
      id: expense?.id ?? crypto.randomUUID(),
      date,
      description: description.trim(),
      category,
      amount: Number(amount),
    };

    if (expense) {
      updateExpense(expenseData);
    } else {
      addExpense(expenseData);
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
      <div className="w-full max-w-md rounded-xl border border-stone-200 bg-stone-100 p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl text-shadow-stone-300 text-shadow-lg text-stone-900">
              {isEditing ? "Edit Expense" : "Add Expense"}
            </h2>

            <p className="italic mt-1 text-sm font-extralight text-stone-500">
              {isEditing
                ? "Update your expense details."
                : "Add a new expense to your records."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="cursor-pointer rounded-full p-2 text-stone-400 hover:bg-stone-200 hover:text-stone-800 hover:scale-105 transition-transform duration-500"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="expense-date"
              className="text-sm font-extralight text-stone-700"
            >
              Date
            </label>

            <input
              id="expense-date"
              name="date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none transition focus:border-stone-500"
            />

            {errors.date && (
              <span className="text-xs text-red-500">{errors.date}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="expense-description"
              className="text-sm font-extralight text-stone-700"
            >
              Description
            </label>

            <input
              id="expense-description"
              name="description"
              type="text"
              placeholder="e.g. Grocery shopping"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
            />

            {errors.description && (
              <span className="text-xs text-red-500">{errors.description}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="expense-category"
                className="text-sm font-extralight text-stone-700"
              >
                Category
              </label>

              <div className="relative">
                <select
                  id="expense-category"
                  name="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-stone-300 bg-white px-4 py-2.5 pr-10 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                >
                  <option value="" disabled>
                    Select a category
                  </option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
                />
              </div>

              {errors.category && (
                <span className="text-xs text-red-500">{errors.category}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="expense-amount"
                className="text-sm font-extralight text-stone-700"
              >
                Amount
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-stone-500">
                  ₺
                </span>

                <input
                  id="expense-amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-9 pr-4 font-mono text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
                />
              </div>

              {errors.amount && (
                <span className="text-xs text-red-500">{errors.amount}</span>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer rounded-full px-6 py-2.5 text-sm font-extralight text-stone-600 bg-linear-to-r from-stone-100 to-stone-300 hover:bg-stone-200 hover:scale-105 transition-transform duration-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-full bg-linear-to-r from-blue-100 to-blue-700 px-7 py-2.5 text-sm font-extralight text-white hover:bg-stone-800 hover:scale-105 transition-transform duration-500"
            >
              {isEditing ? "Update Expense" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseFormModal;
