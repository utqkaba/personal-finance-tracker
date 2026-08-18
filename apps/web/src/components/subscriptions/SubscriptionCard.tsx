import { Pencil, Trash2 } from "lucide-react";

import type { Subscription } from "../../types/subscription";

interface SubscriptionCardProps {
  subscription: Subscription;
}

function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const { name, amount, billingCycle, nextBillingDate } = subscription;

  return (
    <article className="rounded-xl border border-stone-200 bg-linear-to-br from-stone-100 via-stone-50 to-stone-300 p-5 shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg text-stone-900">{name}</h3>

          <p className="mt-1 text-xs font-extralight text-stone-500">
            Recurring subscription
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={`Edit ${name}`}
            className="cursor-pointer rounded-full p-2 text-blue-500 transition-transform duration-500 hover:scale-105 hover:bg-stone-200 hover:text-blue-700"
          >
            <Pencil size={16} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            aria-label={`Delete ${name}`}
            className="cursor-pointer rounded-full p-2 text-red-500 transition-transform duration-500 hover:scale-105 hover:bg-stone-200 hover:text-red-700"
          >
            <Trash2 size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="font-mono text-xl text-stone-900">
            ₺{amount.toLocaleString("tr-TR")}
          </p>

          <p className="mt-1 text-xs font-extralight text-stone-500">
            per {billingCycle === "monthly" ? "month" : "year"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs font-extralight text-stone-500">Next billing</p>

          <p className="italic mt-1 text-sm text-stone-700">
            {nextBillingDate}
          </p>
        </div>
      </div>
    </article>
  );
}

export default SubscriptionCard;
