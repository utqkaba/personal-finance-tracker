import { useSubscriptionStore } from "../stores/subscriptionStore";

function SubscriptionPage() {
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);

  return (
    <div className="flex min-h-screen min-w-0 flex-col gap-6">
      <section className="flex items-center justify-between rounded-xl bg-stone-100 p-6 shadow-lg">
        <div>
          <h1 className="text-xl font-medium text-stone-900">Subscriptions</h1>

          <p className="mt-1 text-sm font-extralight text-stone-500">
            Manage your recurring expenses.
          </p>
        </div>

        <button
          type="button"
          className="cursor-pointer rounded-lg bg-linear-to-r from-blue-100 to-blue-700 px-7 py-2 font-extralight text-white transition-transform duration-500 hover:scale-105"
        >
          + Add Subscription
        </button>
      </section>

      <section className="rounded-xl bg-stone-100 p-6 shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-medium text-stone-900">
            Your Subscriptions
          </h2>

          <span className="rounded-xl bg-stone-200 px-5 py-1 text-xs text-stone-600">
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
          <div className="overflow-x-auto px-3">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-stone-900 text-left">
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-stone-500">
                    Name
                  </th>

                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-stone-500">
                    Amount
                  </th>

                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-stone-500">
                    Billing Cycle
                  </th>

                  <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-stone-500">
                    Next Billing
                  </th>
                </tr>
              </thead>

              <tbody>
                {subscriptions.map((subscription) => (
                  <tr
                    key={subscription.id}
                    className="border-b border-stone-200 transition-colors hover:bg-stone-100"
                  >
                    <td className="py-4 text-sm text-stone-900">
                      {subscription.name}
                    </td>

                    <td className="py-4 font-mono text-sm text-stone-900">
                      ₺{subscription.amount}
                    </td>

                    <td className="py-4 text-sm capitalize text-stone-600">
                      {subscription.billingCycle}
                    </td>

                    <td className="py-4 text-right text-sm text-stone-600">
                      {subscription.nextBillingDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default SubscriptionPage;
