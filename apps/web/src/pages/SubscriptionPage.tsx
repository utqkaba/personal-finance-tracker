import { useState } from "react";

import AddSubscriptionModal from "../components/subscriptions/SubscriptionFormModal";
import { useSubscriptionStore } from "../stores/subscriptionStore";
import SubscriptionList from "../components/subscriptions/SubscriptionList";
import { getMonthlySubscriptionCost } from "../utils/subscriptionUtils";

function SubscriptionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subscriptions = useSubscriptionStore((state) => state.subscriptions);
  const monthlyCost = getMonthlySubscriptionCost(subscriptions);

  return (
    <div className="flex min-h-screen min-w-0 flex-col gap-4">
      <section className="flex items-center justify-between rounded-xl bg-stone-100 p-6 shadow-lg">
        {/* <div>
          <h1 className="text-xl font-medium text-stone-900">Subscriptions</h1>

          <p className="mt-1 text-sm font-extralight text-stone-500">
            Manage your recurring expenses.
          </p>
        </div> */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-2xl bg-linear-to-r from-blue-100 to-blue-700 px-7 py-2 font-extralight text-white transition-transform duration-500 hover:scale-105"
        >
          + Add Subscription
        </button>

        <div className="text-center px-5">
          <p className="text-sm text-stone-500">Monthly Subscription Cost</p>

          <p className="text-xl font-mono text-stone-900">
            {monthlyCost.toLocaleString("tr-TR")}₺
          </p>
        </div>
      </section>

      <section className="rounded-xl bg-stone-100 p-6 shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-medium text-stone-900">
            Your Subscriptions
          </h2>

          <span className="italic rounded-xl bg-stone-200 px-5 py-1 text-xs text-stone-600">
            {subscriptions.length} Subscriptions
          </span>
        </div>

        {subscriptions.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-stone-300">
            <p className="text-sm font-extralight text-stone-500">
              No subscriptions yet.
            </p>
          </div>
        ) : (
          <SubscriptionList subscriptions={subscriptions} />
        )}
      </section>

      <AddSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default SubscriptionPage;
