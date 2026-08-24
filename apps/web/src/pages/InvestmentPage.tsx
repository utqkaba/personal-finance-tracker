import { useState } from "react";

import InvestmentFormModal from "../components/investment/InvestmentFormModal";

function InvestmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="flex items-center justify-between rounded-xl bg-stone-100 p-6 shadow-lg">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-2xl bg-linear-to-r from-blue-100 to-blue-700 px-7 py-2 font-extralight text-white transition-transform duration-500 hover:scale-105"
        >
          + Add Investment
        </button>

        <div>
          <h1 className="text-xl font-medium text-stone-900">Investments</h1>

          <p className="text-sm font-extralight italic text-stone-500">
            Track your investments and their current value.
          </p>
        </div>
      </section>
      <InvestmentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default InvestmentPage;
