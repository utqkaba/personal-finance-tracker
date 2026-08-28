import { useState } from "react";

import InvestmentFormModal from "../components/investment/InvestmentFormModal";
import InvestmentGrid from "../components/investment/InvestmentGrid";
import { useInvestmentStore } from "../stores/investmentStore";

function InvestmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const investments = useInvestmentStore((state) => state.investments);

  return (
    <div className="flex min-h-screen min-w-0 flex-col gap-4">
      <section className="flex items-center justify-between rounded-xl bg-stone-100 p-6 shadow-lg">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-full bg-linear-to-r from-blue-100 to-blue-700 px-7 py-2 font-extralight text-white transition-transform duration-500 hover:scale-105"
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

      <section className="rounded-xl bg-stone-100 p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium text-stone-900">Your Portfolio</h2>

          <span className="italic rounded-xl bg-stone-200 px-5 py-1 text-xs text-stone-600">
            {investments.length} Investments
          </span>
        </div>

        <InvestmentGrid />
      </section>

      <InvestmentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default InvestmentPage;
