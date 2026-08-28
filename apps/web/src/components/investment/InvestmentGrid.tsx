import InvestmentCard from "./InvestmentCard";

import { useInvestmentStore } from "../../stores/investmentStore";

function InvestmentGrid() {
  const investments = useInvestmentStore((state) => state.investments);

  if (investments.length === 0) {
    return (
      <p className="py-10 text-center text-sm font-extralight italic text-stone-500">
        No investments yet. Add your first one to get started.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {investments.map((investment) => (
        <InvestmentCard key={investment.id} investment={investment} />
      ))}
    </div>
  );
}

export default InvestmentGrid;
