import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import DeleteSubscriptionModal from "./DeleteSubscriptionModal";
import SubscriptionFormModal from "./SubscriptionFormModal";

import { useSubscriptionStore } from "../../stores/subscriptionStore";
import type { Subscription } from "../../types/subscription";

interface SubscriptionCardProps {
  subscription: Subscription;
}

function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const removeSubscription = useSubscriptionStore(
    (state) => state.removeSubscription,
  );

  const { name, amount, billingCycle, nextBillingDate } = subscription;

  const handleDelete = () => {
    removeSubscription(subscription.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <article className="rounded-xl border border-stone-200 bg-linear-to-br from-stone-100 via-stone-100 to-stone-300 p-5 shadow-md transition-shadow duration-300 hover:shadow-xl">
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
              onClick={() => setIsEditModalOpen(true)}
              aria-label={`Edit ${name}`}
              className="cursor-pointer rounded-full p-2 text-blue-500 transition-transform duration-500 hover:scale-105 hover:bg-stone-200 hover:text-blue-700"
            >
              <Pencil size={16} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
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
            <p className="text-xs font-extralight text-stone-500">
              Next billing
            </p>

            <p className="italic mt-1 text-sm text-stone-700">
              {nextBillingDate}
            </p>
          </div>
        </div>
      </article>

      <SubscriptionFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        subscription={subscription}
      />

      <DeleteSubscriptionModal
        isOpen={isDeleteModalOpen}
        subscriptionName={name}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default SubscriptionCard;
