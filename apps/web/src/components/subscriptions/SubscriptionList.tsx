import type { Subscription } from "../../types/subscription";
import SubscriptionCard from "./SubscriptionCard";

interface SubscriptionListProps {
  subscriptions: Subscription[];
}

function SubscriptionList({ subscriptions }: SubscriptionListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 gap-x-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {subscriptions.map((subscription) => (
        <SubscriptionCard key={subscription.id} subscription={subscription} />
      ))}
    </div>
  );
}

export default SubscriptionList;
