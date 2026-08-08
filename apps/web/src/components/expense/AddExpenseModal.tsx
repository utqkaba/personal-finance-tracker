import { ChevronDown, X } from "lucide-react";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
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

function AddExpenseModal({ isOpen, onClose }: AddExpenseModalProps) {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Expense creation will be implemented later.
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
      <div className="w-full max-w-md rounded-xl border border-stone-200 bg-stone-100 p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl text-shadow-stone-300 text-shadow-lg text-stone-900">
              Add Expense
            </h2>

            <p className="italic mt-1 text-sm font-extralight text-stone-500">
              Add a new expense to your records.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
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
              defaultValue={new Date().toISOString().split("T")[0]}
              className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none transition focus:border-stone-500"
            />
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
              className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
            />
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
                  defaultValue=""
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
                  className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-9 pr-4 font-mono text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl px-6 py-2.5 text-sm font-extralight text-stone-600 bg-linear-to-r from-stone-100 to-stone-300 hover:bg-stone-200 hover:scale-105 transition-transform duration-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-linear-to-r from-blue-100 to-blue-700 px-7 py-2.5 text-sm font-extralight text-white hover:bg-stone-800 hover:scale-105 transition-transform duration-500"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;
