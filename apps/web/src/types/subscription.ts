export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: "monthly" | "yearly";
  nextBillingDate: string;
}
