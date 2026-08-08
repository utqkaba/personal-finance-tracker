import { useState } from "react";

import AddExpenseModal from "../expense/AddExpenseModal";

function DashboardActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="flex items-center justify-between rounded-xl shadow-lg p-6 bg-stone-100">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-lg px-7 py-2 font-extralight text-white bg-linear-to-r from-blue-100 to-blue-700 hover:scale-105 transition-transform duration-500"
        >
          + Add Expense
        </button>

        <div className="flex gap-12 px-5">
          <div>
            <p className="text-sm text-stone-500">This Month</p>
            <p className="text-xl font-mono text-stone-900">18,420₺</p>
          </div>

          <div>
            <p className="text-sm text-stone-500">Excl. Subscriptions</p>
            <p className="text-xl font-mono text-stone-900">16,780₺</p>
          </div>
        </div>
      </section>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default DashboardActions;
