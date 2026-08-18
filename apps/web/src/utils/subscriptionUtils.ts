import type { Subscription } from "../types/subscription";

export function getMonthlySubscriptionCost(
  subscriptions: Subscription[],
): number {
  return subscriptions.reduce((total, subscription) => {
    if (subscription.billingCycle === "monthly") {
      return total + subscription.amount;
    }

    return total + subscription.amount / 12;
  }, 0);
}
